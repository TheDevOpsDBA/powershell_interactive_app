function getDiagramSVG(type, label) {

    const svgs = {

        "ps-sql-overview": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="20" y="30" width="130" height="50" rx="10" fill="#533483"/>
            <text x="85" y="60" fill="white" font-size="13" text-anchor="middle">PowerShell</text>
            <rect x="170" y="30" width="130" height="50" rx="10" fill="#e94560"/>
            <text x="235" y="60" fill="white" font-size="13" text-anchor="middle">DBATools</text>
            <rect x="320" y="30" width="130" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="385" y="60" fill="white" font-size="13" text-anchor="middle">SQL Server</text>
            <rect x="470" y="30" width="110" height="50" rx="10" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="525" y="60" fill="#e94560" font-size="13" text-anchor="middle">Automation</text>
            <rect x="100" y="100" width="400" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="2"/>
            <text x="300" y="130" fill="white" font-size="14" text-anchor="middle">500+ DBATools Commands for SQL Server DBAs</text>
            <line x1="85" y1="80" x2="200" y2="100" stroke="#7fdbca" stroke-width="2"/>
            <line x1="235" y1="80" x2="260" y2="100" stroke="#7fdbca" stroke-width="2"/>
            <line x1="385" y1="80" x2="350" y2="100" stroke="#7fdbca" stroke-width="2"/>
            <line x1="525" y1="80" x2="430" y2="100" stroke="#7fdbca" stroke-width="2"/>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "lab-setup": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="160" height="50" rx="10" fill="#533483"/>
            <text x="110" y="50" fill="white" font-size="13" text-anchor="middle">Windows Server</text>
            <rect x="220" y="20" width="160" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="50" fill="white" font-size="13" text-anchor="middle">SQL Server 2019+</text>
            <rect x="410" y="20" width="160" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="50" fill="white" font-size="13" text-anchor="middle">PowerShell 5.1+</text>
            <rect x="120" y="90" width="360" height="60" rx="10" fill="#16213e" stroke="#533483" stroke-width="2"/>
            <text x="300" y="115" fill="#7fdbca" font-size="13" text-anchor="middle">Lab Environment</text>
            <text x="300" y="135" fill="white" font-size="11" text-anchor="middle">VM or Local | SQL Instance | Admin Access | DBATools Module</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "ps-basics": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="20" y="25" width="120" height="50" rx="8" fill="#533483"/>
            <text x="80" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">Cmdlet</text>
            <text x="80" y="62" fill="white" font-size="12" text-anchor="middle">Verb-Noun</text>
            <rect x="155" y="25" width="120" height="50" rx="8" fill="#e94560"/>
            <text x="215" y="45" fill="white" font-size="10" text-anchor="middle">Pipeline</text>
            <text x="215" y="62" fill="white" font-size="12" text-anchor="middle">|</text>
            <rect x="290" y="25" width="120" height="50" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="350" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">Variables</text>
            <text x="350" y="62" fill="white" font-size="12" text-anchor="middle">$var</text>
            <rect x="425" y="25" width="150" height="50" rx="8" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="500" y="45" fill="#e94560" font-size="10" text-anchor="middle">Objects</text>
            <text x="500" y="62" fill="white" font-size="12" text-anchor="middle">.Property</text>
            <rect x="50" y="95" width="500" height="50" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="115" fill="#7fdbca" font-size="11" text-anchor="middle">Get-Service | Where-Object Status -eq Running | Select-Object Name</text>
            <text x="300" y="135" fill="white" font-size="11" text-anchor="middle">Everything in PowerShell is an object with properties and methods</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "install-dbatools": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="540" height="35" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="42" fill="white" font-size="13" text-anchor="middle">Install-Module dbatools -Scope CurrentUser</text>
            <rect x="30" y="70" width="160" height="45" rx="8" fill="#533483"/>
            <text x="110" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">PowerShell Gallery</text>
            <text x="110" y="103" fill="white" font-size="11" text-anchor="middle">Source Repository</text>
            <rect x="220" y="70" width="160" height="45" rx="8" fill="#e94560"/>
            <text x="300" y="88" fill="white" font-size="10" text-anchor="middle">DBATools Module</text>
            <text x="300" y="103" fill="white" font-size="11" text-anchor="middle">500+ Commands</text>
            <rect x="410" y="70" width="160" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">SQL Server</text>
            <text x="490" y="103" fill="white" font-size="11" text-anchor="middle">Target Instances</text>
            <line x1="190" y1="92" x2="220" y2="92" stroke="#7fdbca" stroke-width="2"/>
            <line x1="380" y1="92" x2="410" y2="92" stroke="#7fdbca" stroke-width="2"/>
            <rect x="100" y="130" width="400" height="25" rx="5" fill="#16213e"/>
            <text x="300" y="147" fill="white" font-size="11" text-anchor="middle">Import-Module dbatools | Get-Command -Module dbatools | Measure</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "ps-gallery": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="200" y="15" width="200" height="40" rx="10" fill="#533483"/>
            <text x="300" y="40" fill="white" font-size="14" text-anchor="middle">PowerShell Gallery</text>
            <rect x="30" y="80" width="130" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="95" y="100" fill="#7fdbca" font-size="10" text-anchor="middle">dbatools</text>
            <text x="95" y="115" fill="white" font-size="10" text-anchor="middle">SQL Server</text>
            <rect x="175" y="80" width="130" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="240" y="100" fill="#7fdbca" font-size="10" text-anchor="middle">SqlServer</text>
            <text x="240" y="115" fill="white" font-size="10" text-anchor="middle">Microsoft SMO</text>
            <rect x="320" y="80" width="130" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="385" y="100" fill="#7fdbca" font-size="10" text-anchor="middle">PSWindowsUpdate</text>
            <text x="385" y="115" fill="white" font-size="10" text-anchor="middle">Windows Updates</text>
            <rect x="465" y="80" width="110" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="520" y="100" fill="#7fdbca" font-size="10" text-anchor="middle">Pester</text>
            <text x="520" y="115" fill="white" font-size="10" text-anchor="middle">Testing</text>
            <rect x="100" y="140" width="400" height="25" rx="5" fill="#16213e"/>
            <text x="300" y="157" fill="white" font-size="11" text-anchor="middle">Find-Module | Install-Module | Update-Module | Get-InstalledModule</text>
            <text x="300" y="178" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "ps-functions": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="540" height="35" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="42" fill="white" font-size="12" text-anchor="middle" font-family="monospace">function Get-SqlHealth { param($SqlInstance) ... }</text>
            <rect x="30" y="70" width="120" height="40" rx="8" fill="#533483"/>
            <text x="90" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">function</text>
            <text x="90" y="102" fill="white" font-size="10" text-anchor="middle">keyword</text>
            <rect x="165" y="70" width="130" height="40" rx="8" fill="#e94560"/>
            <text x="230" y="88" fill="white" font-size="10" text-anchor="middle">Verb-Noun</text>
            <text x="230" y="102" fill="white" font-size="10" text-anchor="middle">naming</text>
            <rect x="310" y="70" width="120" height="40" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="370" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">param()</text>
            <text x="370" y="102" fill="white" font-size="10" text-anchor="middle">parameters</text>
            <rect x="445" y="70" width="130" height="40" rx="8" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="510" y="88" fill="#e94560" font-size="10" text-anchor="middle">return</text>
            <text x="510" y="102" fill="white" font-size="10" text-anchor="middle">output object</text>
            <rect x="50" y="125" width="500" height="30" rx="6" fill="#16213e"/>
            <text x="300" y="144" fill="white" font-size="11" text-anchor="middle">Advanced Functions: [CmdletBinding()] + [Parameter(Mandatory)] + pipeline input</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "dsc-overview": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="200" y="10" width="200" height="40" rx="10" fill="#e94560"/>
            <text x="300" y="35" fill="white" font-size="14" text-anchor="middle">Desired State Config</text>
            <rect x="30" y="70" width="160" height="45" rx="8" fill="#533483"/>
            <text x="110" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">Configuration</text>
            <text x="110" y="103" fill="white" font-size="11" text-anchor="middle">Define desired state</text>
            <rect x="220" y="70" width="160" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">LCM</text>
            <text x="300" y="103" fill="white" font-size="11" text-anchor="middle">Local Config Manager</text>
            <rect x="410" y="70" width="160" height="45" rx="8" fill="#533483"/>
            <text x="490" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">Resources</text>
            <text x="490" y="103" fill="white" font-size="11" text-anchor="middle">SqlSetup, SqlRS...</text>
            <line x1="190" y1="92" x2="220" y2="92" stroke="#7fdbca" stroke-width="2"/>
            <line x1="380" y1="92" x2="410" y2="92" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="130" width="440" height="30" rx="6" fill="#16213e"/>
            <text x="300" y="149" fill="white" font-size="11" text-anchor="middle">Declarative | Idempotent | Push or Pull Mode | MOF Files</text>
            <text x="300" y="175" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "sql-install-dsc": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="130" height="45" rx="8" fill="#533483"/>
            <text x="95" y="38" fill="#7fdbca" font-size="10" text-anchor="middle">Step 1</text>
            <text x="95" y="53" fill="white" font-size="11" text-anchor="middle">DSC Config</text>
            <rect x="175" y="20" width="130" height="45" rx="8" fill="#e94560"/>
            <text x="240" y="38" fill="white" font-size="10" text-anchor="middle">Step 2</text>
            <text x="240" y="53" fill="white" font-size="11" text-anchor="middle">Compile MOF</text>
            <rect x="320" y="20" width="130" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="385" y="38" fill="#7fdbca" font-size="10" text-anchor="middle">Step 3</text>
            <text x="385" y="53" fill="white" font-size="11" text-anchor="middle">Apply Config</text>
            <rect x="465" y="20" width="110" height="45" rx="8" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="520" y="38" fill="#e94560" font-size="10" text-anchor="middle">Step 4</text>
            <text x="520" y="53" fill="white" font-size="11" text-anchor="middle">SQL Ready</text>
            <line x1="160" y1="42" x2="175" y2="42" stroke="#7fdbca" stroke-width="2"/>
            <line x1="305" y1="42" x2="320" y2="42" stroke="#7fdbca" stroke-width="2"/>
            <line x1="450" y1="42" x2="465" y2="42" stroke="#7fdbca" stroke-width="2"/>
            <rect x="50" y="80" width="500" height="70" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="100" fill="#7fdbca" font-size="11" text-anchor="middle">SqlSetup Resource Configuration</text>
            <text x="300" y="118" fill="white" font-size="11" text-anchor="middle">Features: SQLENGINE, SSMS | InstanceName: MSSQLSERVER</text>
            <text x="300" y="136" fill="white" font-size="11" text-anchor="middle">SQLSysAdminAccounts | InstallSharedDir | SecurityMode</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "ssms-patches": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="30" width="160" height="50" rx="10" fill="#533483"/>
            <text x="110" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Download</text>
            <text x="110" y="67" fill="white" font-size="12" text-anchor="middle">SSMS Installer</text>
            <rect x="220" y="30" width="160" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="50" fill="white" font-size="10" text-anchor="middle">Silent Install</text>
            <text x="300" y="67" fill="white" font-size="12" text-anchor="middle">/Quiet /NoRestart</text>
            <rect x="410" y="30" width="160" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Apply Patches</text>
            <text x="490" y="67" fill="white" font-size="12" text-anchor="middle">CU + Security</text>
            <line x1="190" y1="55" x2="220" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <line x1="380" y1="55" x2="410" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="100" width="440" height="50" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="120" fill="#7fdbca" font-size="11" text-anchor="middle">Automation Commands</text>
            <text x="300" y="138" fill="white" font-size="11" text-anchor="middle">Start-Process | Update-DbaInstance | Test-DbaConnection</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "windows-update": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="25" width="160" height="50" rx="10" fill="#533483"/>
            <text x="110" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">PSWindowsUpdate</text>
            <text x="110" y="62" fill="white" font-size="12" text-anchor="middle">Module</text>
            <rect x="220" y="25" width="160" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="45" fill="white" font-size="10" text-anchor="middle">Get-WindowsUpdate</text>
            <text x="300" y="62" fill="white" font-size="12" text-anchor="middle">Scan Updates</text>
            <rect x="410" y="25" width="160" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">Install-WindowsUpdate</text>
            <text x="490" y="62" fill="white" font-size="12" text-anchor="middle">Apply Patches</text>
            <line x1="190" y1="50" x2="220" y2="50" stroke="#7fdbca" stroke-width="2"/>
            <line x1="380" y1="50" x2="410" y2="50" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="95" width="440" height="55" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="115" fill="#7fdbca" font-size="11" text-anchor="middle">Automation Benefits</text>
            <text x="300" y="133" fill="white" font-size="11" text-anchor="middle">Schedule | Remote Servers | Exclude KBs | Auto-Reboot Control</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "auto-updates": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="30" width="110" height="55" rx="10" fill="#e94560"/>
            <text x="85" y="53" fill="white" font-size="11" text-anchor="middle">Manual</text>
            <text x="85" y="70" fill="white" font-size="13" text-anchor="middle">RDP Each</text>
            <rect x="160" y="30" width="40" height="55" rx="8" fill="#533483"/>
            <text x="180" y="63" fill="white" font-size="18" text-anchor="middle">vs</text>
            <rect x="220" y="30" width="150" height="55" rx="10" fill="#7fdbca"/>
            <text x="295" y="53" fill="#1a1a2e" font-size="11" text-anchor="middle">Automated</text>
            <text x="295" y="70" fill="#1a1a2e" font-size="13" text-anchor="middle">One Script</text>
            <rect x="400" y="20" width="180" height="75" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="42" fill="#7fdbca" font-size="11" text-anchor="middle">Benefits</text>
            <text x="490" y="58" fill="white" font-size="10" text-anchor="middle">Patch 50 servers at once</text>
            <text x="490" y="72" fill="white" font-size="10" text-anchor="middle">Maintenance window control</text>
            <text x="490" y="86" fill="white" font-size="10" text-anchor="middle">Compliance reporting</text>
            <rect x="50" y="110" width="500" height="40" rx="6" fill="#16213e"/>
            <text x="300" y="125" fill="#7fdbca" font-size="10" text-anchor="middle">Invoke-Command -ComputerName $servers -ScriptBlock {</text>
            <text x="300" y="140" fill="white" font-size="10" text-anchor="middle">Install-WindowsUpdate -AcceptAll -AutoReboot }</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "create-database": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="540" height="35" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="42" fill="white" font-size="13" text-anchor="middle">New-DbaDatabase -SqlInstance server1 -Name ProductionDB</text>
            <rect x="30" y="70" width="160" height="45" rx="8" fill="#533483"/>
            <text x="110" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">New-DbaDatabase</text>
            <text x="110" y="103" fill="white" font-size="11" text-anchor="middle">Create DB</text>
            <rect x="220" y="70" width="160" height="45" rx="8" fill="#e94560"/>
            <text x="300" y="88" fill="white" font-size="10" text-anchor="middle">Set-DbaDbOwner</text>
            <text x="300" y="103" fill="white" font-size="11" text-anchor="middle">Set Owner</text>
            <rect x="410" y="70" width="160" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">Set-DbaDbRecoveryModel</text>
            <text x="490" y="103" fill="white" font-size="11" text-anchor="middle">Recovery Model</text>
            <rect x="80" y="130" width="440" height="25" rx="5" fill="#16213e"/>
            <text x="300" y="147" fill="white" font-size="11" text-anchor="middle">Full | Simple | Bulk-Logged | File Growth | Compatibility Level</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "db-properties": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="200" y="10" width="200" height="35" rx="8" fill="#e94560"/>
            <text x="300" y="32" fill="white" font-size="13" text-anchor="middle">Database Properties</text>
            <rect x="20" y="60" width="130" height="40" rx="6" fill="#533483"/>
            <text x="85" y="84" fill="white" font-size="11" text-anchor="middle">Recovery Model</text>
            <rect x="160" y="60" width="130" height="40" rx="6" fill="#533483"/>
            <text x="225" y="84" fill="white" font-size="11" text-anchor="middle">Compatibility</text>
            <rect x="300" y="60" width="130" height="40" rx="6" fill="#533483"/>
            <text x="365" y="84" fill="white" font-size="11" text-anchor="middle">Auto Shrink</text>
            <rect x="440" y="60" width="140" height="40" rx="6" fill="#533483"/>
            <text x="510" y="84" fill="white" font-size="11" text-anchor="middle">Page Verify</text>
            <rect x="50" y="115" width="500" height="40" rx="8" fill="#16213e" stroke="#7fdbca" stroke-width="1"/>
            <text x="300" y="133" fill="#7fdbca" font-size="11" text-anchor="middle">Get-DbaDatabase | Select RecoveryModel, Compatibility, Size</text>
            <text x="300" y="148" fill="white" font-size="10" text-anchor="middle">Set-DbaDbRecoveryModel | Set-DbaDbCompatibility | Set-DbaDbState</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "copy-remove-db": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="30" width="150" height="50" rx="10" fill="#533483"/>
            <text x="105" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Source Server</text>
            <text x="105" y="67" fill="white" font-size="12" text-anchor="middle">SQL-PROD-01</text>
            <rect x="225" y="30" width="150" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="50" fill="white" font-size="10" text-anchor="middle">Copy-DbaDatabase</text>
            <text x="300" y="67" fill="white" font-size="12" text-anchor="middle">Backup + Restore</text>
            <rect x="420" y="30" width="150" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="495" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Destination</text>
            <text x="495" y="67" fill="white" font-size="12" text-anchor="middle">SQL-DEV-01</text>
            <line x1="180" y1="55" x2="225" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <line x1="375" y1="55" x2="420" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="100" width="440" height="50" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="118" fill="#7fdbca" font-size="11" text-anchor="middle">Methods: BackupRestore | DetachAttach</text>
            <text x="300" y="136" fill="white" font-size="11" text-anchor="middle">Remove-DbaDatabase -Confirm:$false | Copy with -SharedPath</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "backup-db": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="540" height="35" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="42" fill="white" font-size="13" text-anchor="middle">Backup-DbaDatabase -SqlInstance server1 -Database mydb -Type Full</text>
            <rect x="30" y="70" width="120" height="45" rx="8" fill="#533483"/>
            <text x="90" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">Full Backup</text>
            <text x="90" y="103" fill="white" font-size="11" text-anchor="middle">Complete copy</text>
            <rect x="165" y="70" width="130" height="45" rx="8" fill="#e94560"/>
            <text x="230" y="88" fill="white" font-size="10" text-anchor="middle">Differential</text>
            <text x="230" y="103" fill="white" font-size="11" text-anchor="middle">Changes since Full</text>
            <rect x="310" y="70" width="130" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="375" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">Transaction Log</text>
            <text x="375" y="103" fill="white" font-size="11" text-anchor="middle">Point-in-time</text>
            <rect x="455" y="70" width="120" height="45" rx="8" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="515" y="88" fill="#e94560" font-size="10" text-anchor="middle">Copy-Only</text>
            <text x="515" y="103" fill="white" font-size="11" text-anchor="middle">No LSN chain</text>
            <rect x="80" y="130" width="440" height="25" rx="5" fill="#16213e"/>
            <text x="300" y="147" fill="white" font-size="11" text-anchor="middle">-CompressBackup | -Verify | -Path \\\\share\\backups | -ReplaceInName</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "restore-db": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="25" width="130" height="50" rx="10" fill="#533483"/>
            <text x="95" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">Backup File</text>
            <text x="95" y="62" fill="white" font-size="12" text-anchor="middle">.bak / .trn</text>
            <rect x="200" y="25" width="200" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="45" fill="white" font-size="10" text-anchor="middle">Restore-DbaDatabase</text>
            <text x="300" y="62" fill="white" font-size="12" text-anchor="middle">Process &amp; Apply</text>
            <rect x="440" y="25" width="130" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="505" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">Restored DB</text>
            <text x="505" y="62" fill="white" font-size="12" text-anchor="middle">Online</text>
            <line x1="160" y1="50" x2="200" y2="50" stroke="#7fdbca" stroke-width="2"/>
            <line x1="400" y1="50" x2="440" y2="50" stroke="#7fdbca" stroke-width="2"/>
            <rect x="50" y="95" width="500" height="55" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="113" fill="#7fdbca" font-size="11" text-anchor="middle">Restore Options</text>
            <text x="300" y="130" fill="white" font-size="10" text-anchor="middle">-WithReplace | -NoRecovery | -Continue | -DestinationDataDirectory</text>
            <text x="300" y="145" fill="white" font-size="10" text-anchor="middle">-MaintenanceSolutionBackup | -GetBackupInformation | Point-in-Time</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "advanced-restore": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="120" height="40" rx="8" fill="#533483"/>
            <text x="90" y="44" fill="white" font-size="11" text-anchor="middle">Full .bak</text>
            <rect x="165" y="20" width="120" height="40" rx="8" fill="#e94560"/>
            <text x="225" y="44" fill="white" font-size="11" text-anchor="middle">Diff .bak</text>
            <rect x="300" y="20" width="120" height="40" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="360" y="44" fill="white" font-size="11" text-anchor="middle">Log 1 .trn</text>
            <rect x="435" y="20" width="120" height="40" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="495" y="44" fill="white" font-size="11" text-anchor="middle">Log 2 .trn</text>
            <line x1="150" y1="40" x2="165" y2="40" stroke="#7fdbca" stroke-width="2"/>
            <line x1="285" y1="40" x2="300" y2="40" stroke="#7fdbca" stroke-width="2"/>
            <line x1="420" y1="40" x2="435" y2="40" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="75" width="440" height="35" rx="8" fill="#e94560"/>
            <text x="300" y="97" fill="white" font-size="12" text-anchor="middle">Point-in-Time Recovery: -RestoreTime "2024-01-15 14:30:00"</text>
            <rect x="50" y="125" width="500" height="30" rx="6" fill="#16213e"/>
            <text x="300" y="144" fill="white" font-size="11" text-anchor="middle">-NoRecovery (standby) | -Continue | -StandbyDirectory | -PageRestore</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "logins-users": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="160" height="50" rx="10" fill="#533483"/>
            <text x="110" y="40" fill="#7fdbca" font-size="10" text-anchor="middle">Server Level</text>
            <text x="110" y="57" fill="white" font-size="12" text-anchor="middle">Logins</text>
            <rect x="220" y="20" width="160" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="40" fill="white" font-size="10" text-anchor="middle">Database Level</text>
            <text x="300" y="57" fill="white" font-size="12" text-anchor="middle">Users</text>
            <rect x="410" y="20" width="160" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="40" fill="#7fdbca" font-size="10" text-anchor="middle">Permissions</text>
            <text x="490" y="57" fill="white" font-size="12" text-anchor="middle">Roles &amp; Grants</text>
            <line x1="190" y1="45" x2="220" y2="45" stroke="#7fdbca" stroke-width="2"/>
            <line x1="380" y1="45" x2="410" y2="45" stroke="#7fdbca" stroke-width="2"/>
            <rect x="50" y="85" width="500" height="65" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="103" fill="#7fdbca" font-size="11" text-anchor="middle">DBATools Security Commands</text>
            <text x="300" y="120" fill="white" font-size="10" text-anchor="middle">Get-DbaLogin | New-DbaLogin | New-DbaDbUser | Get-DbaDbRole</text>
            <text x="300" y="137" fill="white" font-size="10" text-anchor="middle">Add-DbaDbRoleMember | Copy-DbaLogin | Repair-DbaDbOrphanUser</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "roles-permissions": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="200" y="10" width="200" height="35" rx="8" fill="#e94560"/>
            <text x="300" y="32" fill="white" font-size="13" text-anchor="middle">SQL Server Security</text>
            <rect x="20" y="60" width="130" height="40" rx="6" fill="#533483"/>
            <text x="85" y="84" fill="white" font-size="11" text-anchor="middle">Server Roles</text>
            <rect x="160" y="60" width="130" height="40" rx="6" fill="#533483"/>
            <text x="225" y="84" fill="white" font-size="11" text-anchor="middle">DB Roles</text>
            <rect x="300" y="60" width="130" height="40" rx="6" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="365" y="84" fill="white" font-size="11" text-anchor="middle">Custom Roles</text>
            <rect x="440" y="60" width="140" height="40" rx="6" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="510" y="84" fill="#e94560" font-size="11" text-anchor="middle">Permissions</text>
            <rect x="50" y="115" width="500" height="35" rx="6" fill="#16213e"/>
            <text x="300" y="130" fill="#7fdbca" font-size="10" text-anchor="middle">sysadmin | db_owner | db_datareader | db_datawriter | GRANT | DENY | REVOKE</text>
            <text x="300" y="145" fill="white" font-size="10" text-anchor="middle">Get-DbaServerRole | Add-DbaDbRoleMember | Get-DbaUserPermission</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "copy-logins": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="30" width="150" height="50" rx="10" fill="#533483"/>
            <text x="105" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Source Instance</text>
            <text x="105" y="67" fill="white" font-size="12" text-anchor="middle">SQL-PROD-01</text>
            <rect x="225" y="30" width="150" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="50" fill="white" font-size="10" text-anchor="middle">Copy-DbaLogin</text>
            <text x="300" y="67" fill="white" font-size="12" text-anchor="middle">SID + Password</text>
            <rect x="420" y="30" width="150" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="495" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Destination</text>
            <text x="495" y="67" fill="white" font-size="12" text-anchor="middle">SQL-DR-01</text>
            <line x1="180" y1="55" x2="225" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <line x1="375" y1="55" x2="420" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="100" width="440" height="45" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="118" fill="#7fdbca" font-size="11" text-anchor="middle">Preserves: SID, Password Hash, Server Roles, Default DB</text>
            <text x="300" y="135" fill="white" font-size="10" text-anchor="middle">-ExcludeLogin sa | -Login specific_user | Export-DbaLogin (T-SQL script)</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "instance-mgmt": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="200" y="10" width="200" height="35" rx="8" fill="#e94560"/>
            <text x="300" y="32" fill="white" font-size="13" text-anchor="middle">Instance Management</text>
            <rect x="20" y="60" width="130" height="40" rx="6" fill="#533483"/>
            <text x="85" y="84" fill="white" font-size="11" text-anchor="middle">Configuration</text>
            <rect x="160" y="60" width="130" height="40" rx="6" fill="#533483"/>
            <text x="225" y="84" fill="white" font-size="11" text-anchor="middle">Memory</text>
            <rect x="300" y="60" width="130" height="40" rx="6" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="365" y="84" fill="white" font-size="11" text-anchor="middle">Services</text>
            <rect x="440" y="60" width="140" height="40" rx="6" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="510" y="84" fill="#e94560" font-size="11" text-anchor="middle">TempDB</text>
            <rect x="50" y="115" width="500" height="35" rx="6" fill="#16213e"/>
            <text x="300" y="130" fill="#7fdbca" font-size="10" text-anchor="middle">Get-DbaSpConfigure | Set-DbaMaxMemory | Get-DbaService</text>
            <text x="300" y="145" fill="white" font-size="10" text-anchor="middle">Set-DbaSpConfigure | Get-DbaTempdbUsage | Set-DbaTempDbConfig</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "agent-jobs": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="540" height="35" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="42" fill="white" font-size="13" text-anchor="middle">SQL Server Agent — Job Automation</text>
            <rect x="30" y="70" width="130" height="45" rx="8" fill="#533483"/>
            <text x="95" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">Get-DbaAgentJob</text>
            <text x="95" y="103" fill="white" font-size="11" text-anchor="middle">List Jobs</text>
            <rect x="175" y="70" width="130" height="45" rx="8" fill="#e94560"/>
            <text x="240" y="88" fill="white" font-size="10" text-anchor="middle">New-DbaAgentJob</text>
            <text x="240" y="103" fill="white" font-size="11" text-anchor="middle">Create Jobs</text>
            <rect x="320" y="70" width="130" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="385" y="88" fill="#7fdbca" font-size="10" text-anchor="middle">Start-DbaAgentJob</text>
            <text x="385" y="103" fill="white" font-size="11" text-anchor="middle">Run Jobs</text>
            <rect x="465" y="70" width="110" height="45" rx="8" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="520" y="88" fill="#e94560" font-size="10" text-anchor="middle">Get-DbaAgentJobHistory</text>
            <text x="520" y="103" fill="white" font-size="9" text-anchor="middle">History</text>
            <rect x="80" y="130" width="440" height="25" rx="5" fill="#16213e"/>
            <text x="300" y="147" fill="white" font-size="11" text-anchor="middle">Schedules | Steps | Notifications | Categories | Failed Job Alerts</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "error-logs": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="25" width="160" height="50" rx="10" fill="#533483"/>
            <text x="110" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">Get-DbaErrorLog</text>
            <text x="110" y="62" fill="white" font-size="12" text-anchor="middle">SQL Error Logs</text>
            <rect x="220" y="25" width="160" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="45" fill="white" font-size="10" text-anchor="middle">Repair-DbaDbOrphanUser</text>
            <text x="300" y="62" fill="white" font-size="12" text-anchor="middle">Fix Orphans</text>
            <rect x="410" y="25" width="160" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">Get-DbaDbOrphanUser</text>
            <text x="490" y="62" fill="white" font-size="12" text-anchor="middle">Find Orphans</text>
            <rect x="50" y="95" width="500" height="55" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="113" fill="#7fdbca" font-size="11" text-anchor="middle">Troubleshooting Workflow</text>
            <text x="300" y="130" fill="white" font-size="10" text-anchor="middle">1. Check Error Logs → 2. Identify Issues → 3. Fix Orphaned Users</text>
            <text x="300" y="145" fill="white" font-size="10" text-anchor="middle">Get-DbaErrorLog -After (Get-Date).AddHours(-24) | Where Severity -gt 10</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "replication": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="30" width="130" height="50" rx="10" fill="#533483"/>
            <text x="95" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Publisher</text>
            <text x="95" y="67" fill="white" font-size="12" text-anchor="middle">Source DB</text>
            <rect x="235" y="30" width="130" height="50" rx="10" fill="#e94560"/>
            <text x="300" y="50" fill="white" font-size="10" text-anchor="middle">Distributor</text>
            <text x="300" y="67" fill="white" font-size="12" text-anchor="middle">Queue</text>
            <rect x="440" y="30" width="130" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="505" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Subscriber</text>
            <text x="505" y="67" fill="white" font-size="12" text-anchor="middle">Target DB</text>
            <line x1="160" y1="55" x2="235" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <line x1="365" y1="55" x2="440" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="100" width="440" height="50" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="118" fill="#7fdbca" font-size="11" text-anchor="middle">Replication Types</text>
            <text x="300" y="136" fill="white" font-size="11" text-anchor="middle">Transactional | Snapshot | Merge | Peer-to-Peer</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "auto-replication": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="540" height="35" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="42" fill="white" font-size="13" text-anchor="middle">Automating Replication with PowerShell + SMO</text>
            <rect x="30" y="70" width="160" height="40" rx="8" fill="#533483"/>
            <text x="110" y="94" fill="white" font-size="11" text-anchor="middle">Configure Publisher</text>
            <rect x="220" y="70" width="160" height="40" rx="8" fill="#e94560"/>
            <text x="300" y="94" fill="white" font-size="11" text-anchor="middle">Setup Distribution</text>
            <rect x="410" y="70" width="160" height="40" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="94" fill="white" font-size="11" text-anchor="middle">Add Subscribers</text>
            <line x1="190" y1="90" x2="220" y2="90" stroke="#7fdbca" stroke-width="2"/>
            <line x1="380" y1="90" x2="410" y2="90" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="125" width="440" height="30" rx="6" fill="#16213e"/>
            <text x="300" y="144" fill="white" font-size="11" text-anchor="middle">New-ReplPublication | Add-ReplArticle | New-ReplSubscription</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "switch-wildcard": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="250" height="60" rx="10" fill="#533483"/>
            <text x="155" y="42" fill="#7fdbca" font-size="11" text-anchor="middle">Switch Statement</text>
            <text x="155" y="60" fill="white" font-size="11" text-anchor="middle">switch ($status) { "Online" {...} }</text>
            <rect x="310" y="20" width="260" height="60" rx="10" fill="#e94560"/>
            <text x="440" y="42" fill="white" font-size="11" text-anchor="middle">Wildcard Parameters</text>
            <text x="440" y="60" fill="white" font-size="11" text-anchor="middle">-Database *prod* -Exclude *test*</text>
            <rect x="50" y="100" width="500" height="50" rx="8" fill="#16213e" stroke="#7fdbca" stroke-width="1"/>
            <text x="300" y="118" fill="#7fdbca" font-size="11" text-anchor="middle">Pattern Matching in DBA Scripts</text>
            <text x="300" y="136" fill="white" font-size="10" text-anchor="middle">-Like "*prod*" | -Match "^SQL" | switch -Wildcard | switch -Regex</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "grafana-setup": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="25" width="130" height="50" rx="10" fill="#533483"/>
            <text x="95" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">SQL Server</text>
            <text x="95" y="62" fill="white" font-size="12" text-anchor="middle">Metrics Source</text>
            <rect x="195" y="25" width="130" height="50" rx="10" fill="#e94560"/>
            <text x="260" y="45" fill="white" font-size="10" text-anchor="middle">PowerShell</text>
            <text x="260" y="62" fill="white" font-size="12" text-anchor="middle">Collector</text>
            <rect x="360" y="25" width="100" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="410" y="45" fill="#7fdbca" font-size="10" text-anchor="middle">InfluxDB</text>
            <text x="410" y="62" fill="white" font-size="12" text-anchor="middle">Store</text>
            <rect x="495" y="25" width="80" height="50" rx="10" fill="#7fdbca"/>
            <text x="535" y="45" fill="#1a1a2e" font-size="10" text-anchor="middle">Grafana</text>
            <text x="535" y="62" fill="#1a1a2e" font-size="12" text-anchor="middle">Display</text>
            <line x1="160" y1="50" x2="195" y2="50" stroke="#7fdbca" stroke-width="2"/>
            <line x1="325" y1="50" x2="360" y2="50" stroke="#7fdbca" stroke-width="2"/>
            <line x1="460" y1="50" x2="495" y2="50" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="95" width="440" height="55" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="113" fill="#7fdbca" font-size="11" text-anchor="middle">Monitoring Stack</text>
            <text x="300" y="130" fill="white" font-size="10" text-anchor="middle">CPU | Memory | Disk I/O | Wait Stats | Blocking | Long Queries</text>
            <text x="300" y="145" fill="white" font-size="10" text-anchor="middle">Scheduled Task runs PS script every 60 seconds</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "collect-metrics": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="540" height="35" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="42" fill="white" font-size="12" text-anchor="middle">Get-DbaWaitStatistic | Get-DbaCpuUsage | Get-DbaMemoryUsage</text>
            <rect x="30" y="70" width="160" height="40" rx="8" fill="#533483"/>
            <text x="110" y="94" fill="white" font-size="11" text-anchor="middle">Query SQL DMVs</text>
            <rect x="220" y="70" width="160" height="40" rx="8" fill="#e94560"/>
            <text x="300" y="94" fill="white" font-size="11" text-anchor="middle">Format Metrics</text>
            <rect x="410" y="70" width="160" height="40" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="94" fill="white" font-size="11" text-anchor="middle">Write to InfluxDB</text>
            <line x1="190" y1="90" x2="220" y2="90" stroke="#7fdbca" stroke-width="2"/>
            <line x1="380" y1="90" x2="410" y2="90" stroke="#7fdbca" stroke-width="2"/>
            <rect x="80" y="125" width="440" height="30" rx="6" fill="#16213e"/>
            <text x="300" y="144" fill="white" font-size="11" text-anchor="middle">Invoke-RestMethod -Uri $influxUrl -Method Post -Body $metrics</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "dashboard-panels": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="15" width="540" height="30" rx="6" fill="#7fdbca"/>
            <text x="300" y="35" fill="#1a1a2e" font-size="13" text-anchor="middle">Grafana Dashboard — SQL Server Monitoring</text>
            <rect x="30" y="55" width="170" height="55" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="115" y="75" fill="#7fdbca" font-size="10" text-anchor="middle">CPU Usage</text>
            <text x="115" y="95" fill="white" font-size="14" text-anchor="middle">72%</text>
            <rect x="215" y="55" width="170" height="55" rx="8" fill="#0f3460" stroke="#e94560" stroke-width="1.5"/>
            <text x="300" y="75" fill="#e94560" font-size="10" text-anchor="middle">Memory</text>
            <text x="300" y="95" fill="white" font-size="14" text-anchor="middle">89%</text>
            <rect x="400" y="55" width="170" height="55" rx="8" fill="#0f3460" stroke="#533483" stroke-width="1.5"/>
            <text x="485" y="75" fill="#533483" font-size="10" text-anchor="middle">Disk I/O</text>
            <text x="485" y="95" fill="white" font-size="14" text-anchor="middle">45 MB/s</text>
            <rect x="30" y="120" width="540" height="30" rx="6" fill="#16213e"/>
            <text x="300" y="139" fill="white" font-size="11" text-anchor="middle">Panels: Gauge | Graph | Table | Alert List | Stat | Heatmap</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "html-reports": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="160" height="50" rx="10" fill="#533483"/>
            <text x="110" y="40" fill="#7fdbca" font-size="10" text-anchor="middle">PowerShell Data</text>
            <text x="110" y="57" fill="white" font-size="12" text-anchor="middle">Get-DbaDatabase</text>
            <rect x="225" y="20" width="160" height="50" rx="10" fill="#e94560"/>
            <text x="305" y="40" fill="white" font-size="10" text-anchor="middle">ConvertTo-Html</text>
            <text x="305" y="57" fill="white" font-size="12" text-anchor="middle">Format Report</text>
            <rect x="420" y="20" width="150" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="495" y="40" fill="#7fdbca" font-size="10" text-anchor="middle">HTML File</text>
            <text x="495" y="57" fill="white" font-size="12" text-anchor="middle">report.html</text>
            <line x1="190" y1="45" x2="225" y2="45" stroke="#7fdbca" stroke-width="2"/>
            <line x1="385" y1="45" x2="420" y2="45" stroke="#7fdbca" stroke-width="2"/>
            <rect x="50" y="90" width="500" height="60" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="108" fill="#7fdbca" font-size="11" text-anchor="middle">Report Components</text>
            <text x="300" y="125" fill="white" font-size="10" text-anchor="middle">-Head (CSS styling) | -Body (content) | -PreContent | -PostContent</text>
            <text x="300" y="140" fill="white" font-size="10" text-anchor="middle">Fragment mode for multi-section reports | Out-File to save</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "email-reports": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="30" width="130" height="50" rx="10" fill="#533483"/>
            <text x="95" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">HTML Report</text>
            <text x="95" y="67" fill="white" font-size="12" text-anchor="middle">Generated</text>
            <rect x="195" y="30" width="130" height="50" rx="10" fill="#e94560"/>
            <text x="260" y="50" fill="white" font-size="10" text-anchor="middle">Send-MailMessage</text>
            <text x="260" y="67" fill="white" font-size="12" text-anchor="middle">SMTP Send</text>
            <rect x="360" y="30" width="100" height="50" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="410" y="55" fill="white" font-size="12" text-anchor="middle">DBA Team</text>
            <rect x="495" y="30" width="80" height="50" rx="10" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="535" y="55" fill="#e94560" font-size="11" text-anchor="middle">Manager</text>
            <line x1="160" y1="55" x2="195" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <line x1="325" y1="55" x2="360" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <line x1="460" y1="55" x2="495" y2="55" stroke="#7fdbca" stroke-width="2"/>
            <rect x="50" y="100" width="500" height="50" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="118" fill="#7fdbca" font-size="11" text-anchor="middle">Send-MailMessage Parameters</text>
            <text x="300" y="136" fill="white" font-size="10" text-anchor="middle">-SmtpServer | -To | -From | -Subject | -Body | -BodyAsHtml | -Attachments</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "backup-reports": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="540" height="35" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="42" fill="white" font-size="13" text-anchor="middle">Daily DBA Health Report — Backups &amp; DBCC</text>
            <rect x="30" y="70" width="160" height="40" rx="8" fill="#533483"/>
            <text x="110" y="94" fill="white" font-size="11" text-anchor="middle">Get-DbaLastBackup</text>
            <rect x="220" y="70" width="160" height="40" rx="8" fill="#e94560"/>
            <text x="300" y="94" fill="white" font-size="11" text-anchor="middle">Get-DbaLastGoodCheckDb</text>
            <rect x="410" y="70" width="160" height="40" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="490" y="94" fill="white" font-size="11" text-anchor="middle">Get-DbaDbSpace</text>
            <rect x="80" y="125" width="440" height="30" rx="6" fill="#16213e"/>
            <text x="300" y="144" fill="white" font-size="11" text-anchor="middle">ConvertTo-Html | Send-MailMessage — Automated Daily at 7:00 AM</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "migration-plan": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="20" width="120" height="45" rx="8" fill="#533483"/>
            <text x="90" y="38" fill="#7fdbca" font-size="10" text-anchor="middle">Step 1</text>
            <text x="90" y="53" fill="white" font-size="11" text-anchor="middle">Assessment</text>
            <rect x="165" y="20" width="120" height="45" rx="8" fill="#e94560"/>
            <text x="225" y="38" fill="white" font-size="10" text-anchor="middle">Step 2</text>
            <text x="225" y="53" fill="white" font-size="11" text-anchor="middle">Compatibility</text>
            <rect x="300" y="20" width="120" height="45" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="360" y="38" fill="#7fdbca" font-size="10" text-anchor="middle">Step 3</text>
            <text x="360" y="53" fill="white" font-size="11" text-anchor="middle">Migration</text>
            <rect x="435" y="20" width="130" height="45" rx="8" fill="#16213e" stroke="#e94560" stroke-width="1.5"/>
            <text x="500" y="38" fill="#e94560" font-size="10" text-anchor="middle">Step 4</text>
            <text x="500" y="53" fill="white" font-size="11" text-anchor="middle">Validation</text>
            <line x1="150" y1="42" x2="165" y2="42" stroke="#7fdbca" stroke-width="2"/>
            <line x1="285" y1="42" x2="300" y2="42" stroke="#7fdbca" stroke-width="2"/>
            <line x1="420" y1="42" x2="435" y2="42" stroke="#7fdbca" stroke-width="2"/>
            <rect x="50" y="80" width="500" height="70" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="100" fill="#7fdbca" font-size="11" text-anchor="middle">DBATools Migration Commands</text>
            <text x="300" y="118" fill="white" font-size="10" text-anchor="middle">Copy-DbaDatabase | Start-DbaMigration | Test-DbaMigrationConstraint</text>
            <text x="300" y="136" fill="white" font-size="10" text-anchor="middle">Copy-DbaLogin | Copy-DbaAgentJob | Copy-DbaLinkedServer</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "instance-migration": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="30" y="30" width="150" height="55" rx="10" fill="#533483"/>
            <text x="105" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">Old Instance</text>
            <text x="105" y="67" fill="white" font-size="12" text-anchor="middle">SQL 2012/2014</text>
            <rect x="225" y="30" width="150" height="55" rx="10" fill="#e94560"/>
            <text x="300" y="50" fill="white" font-size="10" text-anchor="middle">Start-DbaMigration</text>
            <text x="300" y="67" fill="white" font-size="12" text-anchor="middle">Full Migration</text>
            <rect x="420" y="30" width="150" height="55" rx="10" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="495" y="50" fill="#7fdbca" font-size="10" text-anchor="middle">New Instance</text>
            <text x="495" y="67" fill="white" font-size="12" text-anchor="middle">SQL 2019/2022</text>
            <line x1="180" y1="57" x2="225" y2="57" stroke="#7fdbca" stroke-width="2"/>
            <line x1="375" y1="57" x2="420" y2="57" stroke="#7fdbca" stroke-width="2"/>
            <rect x="50" y="105" width="500" height="45" rx="8" fill="#16213e" stroke="#533483" stroke-width="1"/>
            <text x="300" y="122" fill="#7fdbca" font-size="11" text-anchor="middle">Migrates Everything</text>
            <text x="300" y="139" fill="white" font-size="10" text-anchor="middle">Databases | Logins | Agent Jobs | Linked Servers | Credentials | Mail</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`,

        "generic": `<svg viewBox="0 0 600 180" width="100%" height="180">
            <rect x="150" y="30" width="300" height="60" rx="12" fill="#533483"/>
            <text x="300" y="55" fill="#7fdbca" font-size="11" text-anchor="middle">PowerShell for SQL Server DBAs</text>
            <text x="300" y="75" fill="white" font-size="14" text-anchor="middle">${label}</text>
            <rect x="100" y="110" width="400" height="40" rx="8" fill="#0f3460" stroke="#7fdbca" stroke-width="1.5"/>
            <text x="300" y="135" fill="white" font-size="12" text-anchor="middle">Automate | Monitor | Manage | Migrate</text>
            <text x="300" y="172" fill="#aaa" font-size="12" text-anchor="middle">${label}</text>
        </svg>`
    };

    return svgs[type] || svgs["generic"];
}

// Maps section IDs to diagram types
const sectionDiagramTypes = {
    "m1s1": "ps-sql-overview",
    "m1s2": "lab-setup",
    "m1s3": "ps-basics",
    "m2s1": "install-dbatools",
    "m2s2": "ps-gallery",
    "m2s3": "ps-functions",
    "m3s1": "dsc-overview",
    "m3s2": "sql-install-dsc",
    "m3s3": "ssms-patches",
    "m4s1": "windows-update",
    "m4s2": "auto-updates",
    "m5s1": "create-database",
    "m5s2": "db-properties",
    "m5s3": "copy-remove-db",
    "m6s1": "backup-db",
    "m6s2": "restore-db",
    "m6s3": "advanced-restore",
    "m7s1": "logins-users",
    "m7s2": "roles-permissions",
    "m7s3": "copy-logins",
    "m8s1": "instance-mgmt",
    "m8s2": "agent-jobs",
    "m8s3": "error-logs",
    "m9s1": "replication",
    "m9s2": "auto-replication",
    "m9s3": "switch-wildcard",
    "m10s1": "grafana-setup",
    "m10s2": "collect-metrics",
    "m10s3": "dashboard-panels",
    "m11s1": "html-reports",
    "m11s2": "email-reports",
    "m11s3": "backup-reports",
    "m12s1": "migration-plan",
    "m12s2": "instance-migration"
};
