let editor;
let pyodide = null;          // lazily loaded on first Run
let pyodideLoading = false;

let currentModule = 0;
let currentSection = 0;

// Gemini API Configuration
// Key is stored in browser localStorage - never in source code
// Gemini API Configuration
// Key is injected at deploy time via GitHub Actions
const API_KEY_INJECTED = "__GEMINI_API_KEY__";
let OPENROUTER_API_KEY = API_KEY_INJECTED.startsWith("__") ? localStorage.getItem("openrouter_api_key") || "" : API_KEY_INJECTED;

async function initializeApp() {

    const editorEl = document.getElementById("editor");
    if (!editorEl) return;

    editor = CodeMirror.fromTextArea(
        editorEl,
        {
            mode: "shell",
            theme: "material-darker",
            lineNumbers: true
        }
    );

    // Re-evaluate run-vs-copy mode every time the code changes
    let modeTimer = null;
    editor.on("change", () => {
        clearTimeout(modeTimer);
        modeTimer = setTimeout(refreshExecutionMode, 300);
    });

    loadModules();
}

function loadModules() {

    const moduleSelect = document.getElementById("moduleSelect");
    moduleSelect.innerHTML = "";

    courseData.modules.forEach((module, index) => {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = module.title;

        moduleSelect.appendChild(option);
    });

    moduleSelect.value = currentModule;

    moduleSelect.onchange = function () {

        currentModule = parseInt(this.value);
        currentSection = 0;

        loadSections();
    };

    loadSections();
}

function loadSections() {

    const sectionSelect = document.getElementById("sectionSelect");
    sectionSelect.innerHTML = "";

    const sections =
        courseData.modules[currentModule].sections;

    sections.forEach((section, index) => {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = section.title;

        sectionSelect.appendChild(option);
    });

    sectionSelect.value = currentSection;

    sectionSelect.onchange = function () {

        currentSection = parseInt(this.value);

        renderSection();
    };

    renderSection();
}

function renderSection() {

    const section =
        courseData.modules[currentModule]
        .sections[currentSection];

    document.getElementById("moduleSelect").value =
        currentModule;

    document.getElementById("sectionSelect").value =
        currentSection;

    let content = section.brief || section.description;
    content = content.replace(/<h4>.*?<\/h4>/, "");
    document.getElementById("description").innerHTML = content;

    document.getElementById("sectionHeading").textContent = section.title;

    initReveal();

    document.getElementById("syntax").textContent =
        section.syntax;

    updateDiagram(section);

    renderTabs(section, 0);

    if (section.examples.length > 0) {

        editor.setValue(section.examples[0].code);
        currentExampleIndex = 0;

    } else {

        editor.setValue("# No examples available");
        currentExampleIndex = -1;
    }

    setTimeout(refreshExecutionMode, 50);
}

function renderTabs(section, activeIndex) {

    const tabs = document.getElementById("exampleTabs");

    tabs.innerHTML = "";

    function setActiveTab(btn) {
        tabs.querySelectorAll(".example-btn").forEach(b =>
            b.classList.remove("active-tab")
        );
        btn.classList.add("active-tab");
    }

    const scratchButton =
        document.createElement("button");

    scratchButton.innerText = "\u270F Scratch Pad";
    scratchButton.className = "example-btn";

    scratchButton.onclick = () => {

        setActiveTab(scratchButton);
        currentExampleIndex = -1;

        editor.setValue(
            localStorage.getItem(section.id)
            || "# Scratch Pad - write your PowerShell here"
        );
        setTimeout(refreshExecutionMode, 50);
    };

    tabs.appendChild(scratchButton);

    section.examples.forEach((example, index) => {

        const button =
            document.createElement("button");

        button.className = "example-btn";

        button.innerText = example.name;

        button.onclick = () => {

            setActiveTab(button);
            currentExampleIndex = index;

            editor.setValue(example.code);
            setTimeout(refreshExecutionMode, 50);
        };

        tabs.appendChild(button);

        if (index === activeIndex) {
            button.classList.add("active-tab");
        }
    });
}

function updateDiagram(section) {

    const container =
        document.querySelector(".diagram-box");

    if (section.diagram) {
        container.innerHTML = section.diagram;
        return;
    }

    const title = section.title;
    const id = section.id || "";

    const diagramType = sectionDiagramTypes[id] || "generic";

    const newBox = container.cloneNode(false);
    newBox.innerHTML = getDiagramSVG(diagramType, title);
    container.parentNode.replaceChild(newBox, container);
}

function clearOutput() {

    document.getElementById("output")
        .textContent = "Paste and run this script in your PowerShell terminal (Run as Administrator for SQL Server commands)";
}

// ===== HYBRID EXECUTION =====
//
// Strategy: every example panel first asks the translator if the current code
// can be safely run in the browser as Python. If yes → live run via Pyodide
// and styled PowerShell output. If no → friendly card explaining why, with
// a one-click Copy button so students can run it locally.
// =============================================================

async function loadPyodideOnce() {
    if (pyodide) return pyodide;
    if (pyodideLoading) {
        // wait for in-flight load
        while (pyodideLoading) await new Promise(r => setTimeout(r, 100));
        return pyodide;
    }
    pyodideLoading = true;
    setOutputLine('Loading runtime (~5 sec, one-time)…', 'info');
    try {
        if (typeof loadPyodide !== "function") {
            await injectScript("https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js");
        }
        pyodide = await loadPyodide();
    } finally {
        pyodideLoading = false;
    }
    return pyodide;
}

function injectScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

// Render an output line with the PowerShell-terminal look
function setOutputLine(text, kind) {
    const out = document.getElementById("output");
    if (!out) return;
    out.innerHTML = renderPsOutput(text, kind || "info");
}

function appendOutputLine(text, kind) {
    const out = document.getElementById("output");
    if (!out) return;
    out.innerHTML += renderPsOutput(text, kind || "info");
}

function renderPsOutput(text, kind) {
    // kind: 'prompt' | 'stdout' | 'error' | 'warning' | 'info' | 'verbatim'
    const escaped = String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const cls = "psout-" + kind;
    return '<span class="' + cls + '">' + escaped + '</span>\n';
}

// Detect mode of the currently-loaded code and update the run/copy area accordingly
function refreshExecutionMode() {
    const code = editor ? editor.getValue() : "";
    const section = courseData.modules[currentModule].sections[currentSection];
    const example = (section.examples || [])[currentExampleIndex];
    const forcedMode = example && example.mode;  // "browser" | "copy" | undefined (auto)

    let result;
    if (forcedMode === "copy") {
        result = { ok: false, reason: "this example is meant to run on a real PowerShell terminal" };
    } else if (forcedMode === "browser") {
        result = window.PsTranslator.translate(code);
    } else {
        result = window.PsTranslator.translate(code);
    }

    const badge   = document.getElementById("modeBadge");
    const runBtn  = document.getElementById("runBtn");
    const copyBtn = document.getElementById("copyBtn");
    const note    = document.getElementById("modeNote");

    if (result.ok) {
        // Browser-runnable
        if (badge) {
            badge.className = "mode-badge mode-browser";
            badge.textContent = "🟢 Runs in browser";
        }
        if (runBtn) {
            runBtn.style.display = "";
            runBtn.disabled = false;
            runBtn.title = "Run this script in the browser";
        }
        if (note) {
            note.innerHTML = '<strong>Live preview:</strong> output is rendered to look like PowerShell. ' +
                'For real Windows-specific behaviour, copy and run locally.';
            note.className = "mode-note ok";
        }
    } else {
        // Needs real PowerShell
        if (badge) {
            badge.className = "mode-badge mode-copy";
            badge.textContent = "📋 Copy to terminal";
        }
        if (runBtn) {
            runBtn.style.display = "none";
        }
        if (note) {
            note.innerHTML = '<strong>This script needs real PowerShell</strong> — ' +
                (result.reason ? escapeHtmlText(result.reason) + '.' : '') +
                ' Click <em>Copy to Clipboard</em> and paste it in your PowerShell terminal.';
            note.className = "mode-note copy";
        }
    }
}

function escapeHtmlText(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// Track which example tab the user is on so we can read the right mode override
let currentExampleIndex = 0;

async function runScript() {
    const code = editor ? editor.getValue() : "";
    if (!code.trim()) {
        setOutputLine('No code to run.', 'warning');
        return;
    }

    // Try to translate
    const r = window.PsTranslator.translate(code);
    if (!r.ok) {
        setOutputLine('This script needs real PowerShell.\n' +
            'Reason: ' + r.reason + '\n\n' +
            'Click "Copy to Clipboard" and run it in your PowerShell terminal.', 'warning');
        return;
    }

    // Render the PowerShell-style prompt + Loading state
    const out = document.getElementById("output");
    out.innerHTML = renderPsOutput("PS C:\\Lab> .\\example.ps1", "prompt");

    try {
        const py = await loadPyodideOnce();
        appendOutputLine("", "stdout"); // separator

        let collected = "";
        py.setStdout({
            batched: (msg) => { collected += msg + "\n"; }
        });
        py.setStderr({
            batched: (msg) => { collected += "STDERR: " + msg + "\n"; }
        });

        await py.runPythonAsync(r.python);

        // Render collected output
        if (collected.trim()) {
            appendOutputLine(collected.replace(/\s+$/, ""), "stdout");
        } else {
            appendOutputLine("(no output)", "info");
        }

        if (r.warnings && r.warnings.length > 0) {
            appendOutputLine("", "info");
            appendOutputLine("⚠ Some lines were skipped in this preview:", "warning");
            r.warnings.forEach(w => {
                appendOutputLine("  Line " + w.line + ": " + w.text, "warning");
            });
        }

    } catch (err) {
        // Mimic PowerShell's red error block
        const msg = err && err.message ? err.message : String(err);
        appendOutputLine("", "info");
        appendOutputLine(msg, "error");
        appendOutputLine("    + CategoryInfo          : NotSpecified: (browser-preview)", "error");
        appendOutputLine("    + FullyQualifiedErrorId : LabPreviewError", "error");
    }
}

// Patched copyToClipboard that also gives terminal-styled output
function copyToClipboard() {
    const code = editor.getValue();
    if (!code.trim()) {
        setOutputLine('No code to copy. Write or select an example first.', 'warning');
        return;
    }
    navigator.clipboard.writeText(code).then(() => {
        const out = document.getElementById("output");
        out.innerHTML =
            renderPsOutput('✓ Code copied to clipboard.', 'stdout') +
            renderPsOutput('', 'info') +
            renderPsOutput('Next steps:', 'info') +
            renderPsOutput('  1. Open Windows PowerShell (Run as Administrator for SQL/system tasks)', 'info') +
            renderPsOutput('  2. Right-click in the terminal → Paste', 'info') +
            renderPsOutput('  3. Press Enter', 'info');
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setOutputLine('✓ Code copied to clipboard. Paste it in your PowerShell terminal.', 'stdout');
    });
}

let revealItems = [];
let revealIndex = 0;

function initReveal() {
    const desc = document.getElementById("description");
    revealItems = desc.querySelectorAll("li");
    revealIndex = 0;
    updateRevealCounter();
}

function revealNext() {
    if (revealIndex < revealItems.length) {
        revealItems[revealIndex].classList.add("revealed");
        revealIndex++;
        updateRevealCounter();
    }
}

function revealAll() {
    revealItems.forEach(item => item.classList.add("revealed"));
    revealIndex = revealItems.length;
    updateRevealCounter();
}

function updateRevealCounter() {
    const counter = document.getElementById("revealCount");
    if (counter) {
        if (revealItems.length === 0) {
            counter.textContent = "";
        } else {
            counter.textContent = revealIndex + " / " + revealItems.length;
        }
    }
}

function previousSection() {

    if (currentSection > 0) {

        currentSection--;

    } else if (currentModule > 0) {

        currentModule--;

        currentSection =
            courseData.modules[currentModule]
            .sections.length - 1;

        loadSections();

        return;
    }

    renderSection();
}

function nextSection() {

    if (revealIndex < revealItems.length) {
        revealNext();
        return;
    }

    const totalSections =
        courseData.modules[currentModule]
        .sections.length;

    if (currentSection < totalSections - 1) {

        currentSection++;

    } else if (
        currentModule <
        courseData.modules.length - 1
    ) {

        currentModule++;
        currentSection = 0;

        loadSections();

        return;
    }

    renderSection();
}

function toggleDescription() {

    document.querySelector(".left-panel")
        .classList.toggle("fullscreen");
}

window.onload = initializeApp;

// ===== AI Chat Functions =====

function toggleChat() {
    const body = document.getElementById("chatBody");
    body.classList.toggle("open");
    const btn = document.querySelector(".chat-toggle");
    btn.textContent = body.classList.contains("open") ? "\u25B2" : "\u25BC";
}

function addChatMessage(text, role) {
    const messages = document.getElementById("chatMessages");
    const msg = document.createElement("div");
    msg.className = "chat-msg " + role;
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
}

async function sendChat() {
    const input = document.getElementById("chatInput");
    const question = input.value.trim();
    if (!question) return;

    input.value = "";
    addChatMessage(question, "user");

    if (!OPENROUTER_API_KEY) {
        const key = prompt("Enter the AI API key (provided by your instructor):");
        if (key && key.trim()) {
            OPENROUTER_API_KEY = key.trim();
            localStorage.setItem("openrouter_api_key", OPENROUTER_API_KEY);
        } else {
            addChatMessage("No API key provided. Ask your instructor for the key.", "bot");
            return;
        }
    }

    const loadingMsg = addChatMessage("Thinking...", "bot loading");

    const code = editor ? editor.getValue() : "";
    const section = courseData.modules[currentModule].sections[currentSection];

    const chatPrompt = 'You are a helpful PowerShell and SQL Server DBA tutor for IT professionals learning PowerShell automation for SQL Server administration. You ONLY answer questions related to PowerShell, SQL Server, DBATools, or the code shown below. If the question is unrelated, politely decline and ask them to keep questions relevant to the course material.\n\nThe student is currently studying: "' + section.title + '"\n\nHere is the code they are looking at:\n```powershell\n' + code + '\n```\n\nThe student asks: "' + question + '"\n\nGive a clear, helpful answer. If the question is about the code, refer to specific lines. If it is a general PowerShell or SQL Server question related to the course, answer it directly. If it is completely unrelated to PowerShell, SQL Server, or DBA work, politely say you can only help with course-related questions. Keep the answer concise but complete (4-6 sentences).';

    try {
        const url = "https://openrouter.ai/api/v1/chat/completions";

        const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + OPENROUTER_API_KEY, "HTTP-Referer": window.location.href, "X-Title": "PowerShell for SQL Server DBAs" },
                body: JSON.stringify({
                    model: "openrouter/auto",
                    messages: [{ role: "user", content: chatPrompt }],
                    max_tokens: 1024,
                    temperature: 0.7
                })
            }
        );

        const data = await response.json();

        if (data.choices && data.choices[0]) {
            let answer = data.choices[0].message.content;
            loadingMsg.remove();
            answer = answer
                .replace(/\n\n/g, "<br><br>")
                .replace(/\n/g, "<br>")
                .replace(/`([^`]+)`/g, "<code>$1</code>")
                .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                .replace(/\*([^*]+)\*/g, "<em>$1</em>");
            addChatMessage(answer, "bot");
        } else {
            loadingMsg.remove();
            const errMsg = data.error ? data.error.message : "No response generated";
            addChatMessage("Error: " + errMsg, "bot");
        }
    } catch (error) {
        loadingMsg.remove();
        addChatMessage("Connection error: " + error.message, "bot");
    }
}

function toggleRightPanel() {
    var panel = document.getElementById('rightPanel');
    var toggle = document.getElementById('panelToggle');
    var left = document.getElementById('leftPanel');
    
    panel.classList.toggle('open');
    toggle.classList.toggle('shifted');
    left.classList.toggle('shifted');
    
    if (panel.classList.contains('open')) {
        toggle.innerHTML = '&#x25B6; Close';
    } else {
        toggle.innerHTML = '&#x25C0; Code &amp; AI';
    }
    
    // Refresh CodeMirror after transition
    setTimeout(function() { if (editor) editor.refresh(); }, 350);
}
// Keyboard navigation
document.addEventListener("keydown", function(e) {
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
    if (e.target.classList.contains("CodeMirror")) return;
    if (document.querySelector(".CodeMirror-focused")) return;

    if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSection();
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        previousSection();
    }
});









