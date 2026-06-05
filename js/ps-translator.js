// PowerShell → Python translator (whitelist-based).
//
// Goal: let students see live output for SAFE PowerShell patterns
// (variables, strings, conditionals, loops, simple arithmetic) by translating
// them into Python and running them in Pyodide. For anything outside the
// whitelist (Get-Service, DBATools, Invoke-Sqlcmd, etc.) we DETECT it and
// fall back to copy-to-run-locally with a friendly message.
//
// Public API:
//   PsTranslator.translate(psCode)
//     → { ok: true,  python: "...", warnings: [] }
//     → { ok: false, reason: "...", offendingLine: 12, offendingText: "Get-Service" }
//
// Style: keep this file dependency-free, runnable in any browser.

(function (global) {
    "use strict";

    // -------------------------------------------------------------
    // Whitelist of cmdlets/keywords we know how to translate
    // -------------------------------------------------------------
    const SAFE_CMDLETS = new Set([
        "Write-Host", "Write-Output", "Write-Error", "Write-Warning",
        "Out-String"
    ]);

    // Anything starting with a verb-noun pattern that ISN'T in SAFE_CMDLETS
    // is treated as "needs real PowerShell" and triggers a fallback.
    // We don't enumerate the dangerous ones — we just default-deny.
    const VERB_NOUN_RE = /\b([A-Z][a-z]+)-([A-Z][A-Za-z0-9]+)\b/g;

    // Tokens that are unique to PowerShell semantics we can't faithfully translate
    const UNTRANSLATABLE_PATTERNS = [
        { pattern: /\|\s*Where-Object/i,        reason: "uses '| Where-Object' pipeline (needs real PowerShell)" },
        { pattern: /\|\s*Select-Object/i,       reason: "uses '| Select-Object' pipeline (needs real PowerShell)" },
        { pattern: /\|\s*ForEach-Object/i,      reason: "uses '| ForEach-Object' pipeline (needs real PowerShell)" },
        { pattern: /\|\s*Sort-Object/i,         reason: "uses '| Sort-Object' pipeline (needs real PowerShell)" },
        { pattern: /\|\s*Group-Object/i,        reason: "uses '| Group-Object' pipeline (needs real PowerShell)" },
        { pattern: /\|\s*Format-Table/i,        reason: "uses '| Format-Table' pipeline (needs real PowerShell)" },
        { pattern: /\|\s*Format-List/i,         reason: "uses '| Format-List' pipeline (needs real PowerShell)" },
        { pattern: /\$_\.[A-Za-z]/,             reason: "uses '$_' (pipeline current object — needs real PowerShell)" },
        { pattern: /\bImport-Module\b/i,        reason: "uses Import-Module (needs real PowerShell modules)" },
        { pattern: /\bInvoke-Sqlcmd\b/i,        reason: "uses Invoke-Sqlcmd (needs SQL Server module)" },
        { pattern: /\bGet-Dba[A-Z]/,            reason: "uses dbatools cmdlet (needs real PowerShell + dbatools)" },
        { pattern: /\[System\.[A-Z]/,           reason: "uses .NET type accelerators (needs real PowerShell)" },
        { pattern: /\$PSVersionTable/i,         reason: "reads $PSVersionTable (needs real PowerShell)" },
        { pattern: /\bRead-Host\b/i,            reason: "uses Read-Host (interactive input not supported in browser preview)" },
        { pattern: /\bStart-Sleep\b/i,          reason: "uses Start-Sleep (skipped in preview — feature works locally)" },
        { pattern: /\bGet-Credential\b/i,       reason: "uses Get-Credential (needs real PowerShell)" },
        { pattern: /\bInvoke-Command\b/i,       reason: "uses Invoke-Command remoting (needs real PowerShell)" },
        { pattern: /\bNew-PSSession\b/i,        reason: "uses New-PSSession (needs real PowerShell)" }
    ];

    // -------------------------------------------------------------
    // Entry point
    // -------------------------------------------------------------
    function translate(psCode) {
        if (!psCode || !psCode.trim()) {
            return { ok: true, python: "", warnings: [] };
        }

        // Quick reject: any unsafe pattern → fallback
        for (const { pattern, reason } of UNTRANSLATABLE_PATTERNS) {
            const match = psCode.match(pattern);
            if (match) {
                return {
                    ok: false,
                    reason,
                    offendingText: match[0],
                    offendingLine: lineOfMatch(psCode, match.index)
                };
            }
        }

        // Quick reject: any unknown verb-noun cmdlet
        let m;
        VERB_NOUN_RE.lastIndex = 0;
        while ((m = VERB_NOUN_RE.exec(psCode)) !== null) {
            const cmdlet = m[0];
            // Skip strings inside comments or quotes (rough but useful)
            if (insideStringOrComment(psCode, m.index)) continue;
            if (!SAFE_CMDLETS.has(cmdlet)) {
                return {
                    ok: false,
                    reason: `uses cmdlet '${cmdlet}' which can't run in the browser`,
                    offendingText: cmdlet,
                    offendingLine: lineOfMatch(psCode, m.index)
                };
            }
        }

        // Pre-process to split inline blocks like
        //   if ($x -gt 5) { Write-Host "high" } else { Write-Host "low" }
        // into one-statement-per-line so the line-based translator can handle them.
        const normalized = normalizeBlocks(psCode);

        // Looks safe — translate line by line
        const lines = normalized.split(/\r?\n/);
        const pyLines = [];
        const warnings = [];
        let indent = 0;
        const indentStack = []; // tracks `}` closures

        for (let i = 0; i < lines.length; i++) {
            const raw = lines[i];
            const out = translateLine(raw, { indent, lineNo: i + 1, warnings });
            if (out.indentDelta) {
                if (out.indentDelta > 0) {
                    indentStack.push(out.indentDelta);
                    indent += out.indentDelta;
                } else if (out.indentDelta < 0) {
                    const prev = indentStack.pop() || 0;
                    indent = Math.max(0, indent - prev);
                }
            }
            if (out.lines) pyLines.push(...out.lines);
            if (out.openBlock) {
                indentStack.push(1);
                indent += 1;
            }
            if (out.closeBlock) {
                const prev = indentStack.pop() || 0;
                indent = Math.max(0, indent - prev);
            }
        }

        return { ok: true, python: pyLines.join("\n"), warnings };
    }

    // Take a multi-line PowerShell snippet and split inline `{ ... }` blocks into
    // their own lines so each statement is on its own line.
    function normalizeBlocks(src) {
        let out = "";
        let i = 0;
        let inS = null; // string delimiter or null
        while (i < src.length) {
            const ch = src[i];
            const prev = src[i - 1];
            if (inS) {
                out += ch;
                if (ch === inS && prev !== "`" && prev !== "\\") inS = null;
                i++;
                continue;
            }
            if (ch === '"' || ch === "'") {
                inS = ch; out += ch; i++; continue;
            }
            if (ch === "#") {
                while (i < src.length && src[i] !== "\n") { out += src[i]; i++; }
                continue;
            }
            if (ch === "{") {
                // Don't break `@{...}` (hashtable) or `$($...)` patterns
                if (prev === "@") { out += "{"; i++; continue; }
                out += "\n{\n"; i++; continue;
            }
            if (ch === "}") {
                // Heuristic: if the matching opener was a hashtable `@{`, leave inline.
                // Simple check: walk backward looking for unmatched `{` and see if it's @{
                // We'll just check if the preceding non-whitespace content ends with `@{...`
                // If `out` contains an unmatched `@{` since the last block-close, treat as hashtable
                if (lastUnmatchedIsHashtable(out)) {
                    out += "}"; i++; continue;
                }
                out += "\n}\n"; i++; continue;
            }
            out += ch; i++;
        }
        return out.split(/\r?\n/)
            .map(s => s.trim())
            .filter((s, idx, arr) => !(s === "" && arr[idx - 1] === ""))
            .join("\n");
    }

    // -------------------------------------------------------------
    // Line-by-line translator
    // -------------------------------------------------------------
    function translateLine(raw, ctx) {
        const indentStr = "    ".repeat(ctx.indent);

        // Strip trailing whitespace
        let line = raw.replace(/\s+$/, "");

        // Empty line
        if (line.trim() === "") {
            return { lines: [""] };
        }

        // Comments — pass through, convert # → #
        const commentMatch = line.match(/^(\s*)#(.*)$/);
        if (commentMatch) {
            return { lines: [indentStr + "#" + commentMatch[2]] };
        }

        const trimmed = line.trim();

        // Skip standalone open-brace lines (block opener already consumed by if/for/etc.)
        if (trimmed === "{") {
            return { lines: [] };
        }

        // Block close: `}` on its own line
        if (trimmed === "}") {
            return { closeBlock: true };
        }

        // if / elseif / else
        let m;
        m = trimmed.match(/^if\s*\(\s*(.+?)\s*\)\s*\{?\s*$/i);
        if (m) {
            const cond = translateExpression(m[1]);
            return {
                lines: [indentStr + `if ${cond}:`],
                openBlock: true
            };
        }
        m = trimmed.match(/^\}?\s*elseif\s*\(\s*(.+?)\s*\)\s*\{?\s*$/i);
        if (m) {
            const cond = translateExpression(m[1]);
            // Decrease indent by 1 to match the `if` level
            const baseIndent = "    ".repeat(Math.max(0, ctx.indent - 1));
            return {
                lines: [baseIndent + `elif ${cond}:`],
                indentDelta: 0  // reuses the existing block indent
            };
        }
        m = trimmed.match(/^\}?\s*else\s*\{?\s*$/i);
        if (m) {
            const baseIndent = "    ".repeat(Math.max(0, ctx.indent - 1));
            return {
                lines: [baseIndent + "else:"],
                indentDelta: 0
            };
        }

        // foreach ($x in $list) {
        m = trimmed.match(/^foreach\s*\(\s*\$([A-Za-z_][A-Za-z0-9_]*)\s+in\s+(.+?)\s*\)\s*\{?\s*$/i);
        if (m) {
            const varName = m[1];
            const iter = translateExpression(m[2]);
            return {
                lines: [indentStr + `for ${varName} in ${iter}:`],
                openBlock: true
            };
        }

        // for ($i = 0; $i -lt 10; $i++) { ... }   →   for i in range(0, 10):
        m = trimmed.match(/^for\s*\(\s*\$([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(\d+)\s*;\s*\$\1\s*-(?:lt|le)\s*(\d+)\s*;\s*\$\1\+\+\s*\)\s*\{?\s*$/i);
        if (m) {
            const v = m[1], from = m[2], to = m[3];
            const stop = trimmed.toLowerCase().includes("-le") ? `${parseInt(to) + 1}` : to;
            return {
                lines: [indentStr + `for ${v} in range(${from}, ${stop}):`],
                openBlock: true
            };
        }

        // while (cond) { ... }
        m = trimmed.match(/^while\s*\(\s*(.+?)\s*\)\s*\{?\s*$/i);
        if (m) {
            const cond = translateExpression(m[1]);
            return {
                lines: [indentStr + `while ${cond}:`],
                openBlock: true
            };
        }

        // Variable assignment: $var = expr
        m = trimmed.match(/^\$([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
        if (m) {
            const name = m[1];
            const value = translateExpression(m[2]);
            return { lines: [indentStr + `${name} = ${value}`] };
        }

        // Write-Host / Write-Output → print
        m = trimmed.match(/^Write-(?:Host|Output)\s+(.+)$/i);
        if (m) {
            const args = m[1];
            const py = translateExpression(args);
            return { lines: [indentStr + `print(${py})`] };
        }

        // Bare expression line (e.g. `$cpu` on its own — show it)
        m = trimmed.match(/^\$([A-Za-z_][A-Za-z0-9_]*)\s*$/);
        if (m) {
            return { lines: [indentStr + `print(${m[1]})`] };
        }

        // Anything else — try our best to translate as an expression statement
        // Most likely a function call or method call we don't recognise
        ctx.warnings.push({ line: ctx.lineNo, text: raw, note: "passed through unchanged — preview may differ from real PowerShell" });
        return { lines: [indentStr + `# (skipped) ${raw.trim()}`] };
    }

    // -------------------------------------------------------------
    // Expression translator
    // -------------------------------------------------------------
    function translateExpression(expr) {
        if (!expr) return '""';
        let e = String(expr).trim();

        // String literal handling — translate "$var" interpolation to f-strings
        // Process double-quoted strings: "...$var..." or "...$($expr)..."
        e = e.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, function (full, inner) {
            // Don't bother with f-string if no $ inside
            if (!/\$/.test(inner)) {
                return JSON.stringify(inner);
            }
            // Convert $var → {var}  and  $($expr) → {expr}
            const py = inner
                .replace(/\$\(([^)]+)\)/g, function (_, g) {
                    return "{" + translateExpression(g) + "}";
                })
                .replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, "{$1}")
                // escape any unmatched braces in the original text
                .replace(/\\"/g, '"');
            return 'f"' + py.replace(/"/g, '\\"') + '"';
        });

        // Single-quoted: literal — leave alone but convert PS literal to py literal
        e = e.replace(/'([^']*)'/g, function (_, inner) {
            return JSON.stringify(inner);
        });

        // Comparison operators
        e = e.replace(/\s-eq\s/gi,  " == ")
             .replace(/\s-ne\s/gi,  " != ")
             .replace(/\s-gt\s/gi,  " > ")
             .replace(/\s-ge\s/gi,  " >= ")
             .replace(/\s-lt\s/gi,  " < ")
             .replace(/\s-le\s/gi,  " <= ")
             .replace(/\s-and\s/gi, " and ")
             .replace(/\s-or\s/gi,  " or ")
             .replace(/(^|\s)-not\s/gi, "$1not ")
             .replace(/\s-like\s/gi, " == ")  // approximate
             .replace(/\s-match\s/gi, " == "); // approximate

        // Array literal: @(1, 2, 3) → [1, 2, 3]
        e = e.replace(/@\(([^)]*)\)/g, "[$1]");

        // Hashtable literal: @{ a = 1; b = 2 } → {"a": 1, "b": 2}
        e = e.replace(/@\{([^}]*)\}/g, function (_, inner) {
            const pairs = inner.split(/[;,]/)
                .map(p => p.trim()).filter(Boolean)
                .map(pair => {
                    const eq = pair.indexOf("=");
                    if (eq < 0) return null;
                    const k = pair.slice(0, eq).trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
                    const v = translateExpression(pair.slice(eq + 1));
                    return `"${k}": ${v}`;
                })
                .filter(Boolean)
                .join(", ");
            return "{" + pairs + "}";
        });

        // $variables → bare names
        e = e.replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, "$1");

        return e;
    }

    // -------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------
    function lineOfMatch(text, idx) {
        if (typeof idx !== "number" || idx < 0) return null;
        return text.slice(0, idx).split(/\r?\n/).length;
    }
    function lastUnmatchedIsHashtable(text) {
        // walk backward through text, counting balanced `{`/`}`,
        // return true if the most recent unmatched `{` is preceded by `@`
        let depth = 0;
        for (let i = text.length - 1; i >= 0; i--) {
            const c = text[i];
            if (c === "}") depth++;
            else if (c === "{") {
                if (depth === 0) return text[i - 1] === "@";
                depth--;
            }
        }
        return false;
    }

    function insideStringOrComment(text, idx) {
        // Find the start of the line containing idx
        const before = text.slice(0, idx);
        const lineStart = before.lastIndexOf("\n") + 1;
        const lineUpToHere = text.slice(lineStart, idx);
        // Inside a comment?
        if (lineUpToHere.indexOf("#") !== -1) return true;
        // Inside a string? Crude check: odd number of unescaped quotes before idx
        const dq = (lineUpToHere.match(/"/g) || []).length;
        const sq = (lineUpToHere.match(/'/g) || []).length;
        return (dq % 2 === 1) || (sq % 2 === 1);
    }

    // Detect whether code is "translatable enough" without actually running
    function canRunInBrowser(psCode) {
        const r = translate(psCode);
        return r.ok;
    }

    global.PsTranslator = {
        translate,
        canRunInBrowser
    };
})(window);
