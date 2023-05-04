var topNavBar = document.getElementsByClassName("topnav")[0];

var inputFile = document.createElement("input");
inputFile.setAttribute("type", "file");
inputFile.setAttribute("accept", "application/json");
inputFile.style.display = "none";



inputFile.onchange = (event) => {
    var reader = new FileReader();
    reader.onload = () => {
        loadContentToTable(JSON.parse(reader.result));
        snackbar.show("File Opened!");
    };
    reader.readAsText(event.target.files[0]);

}


var menu2 = [
    {
        title: "File", child: [
            { title: "New", action: () => { snackbar.show("New Project Loaded!"); newProject() } },
            { title: "Open", action: () => { inputFile.click(); } },
            {
                title: "Recover", child: [
                    { title: "Last Session", action: () => { }, enabled: hasLastSession },
                    { title: "Auto Save", action: () => { }, enabled: hasLastAutoSave },
                ]
            },
            {
                title: "Save", child: [
                    { title: "As file", action: () => { } },
                    { title: "In browser", action: () => { snackbar.show("Saved To Browser!"); saveToBrowser() } },
                ]
            },
            {
                title: "Export", child: [
                    { title: "as Image", action: () => { initSaveAsImageModule() } },
                    { title: "as Json", action: () => { saveAs(new Blob([JSON.stringify(sJson, undefined, '\t')], { type: 'application/json' })); } },
                ],
            },
            {
                title: "Defaults", child: [
                    { title: "Save Startup File", action: () => { snackbar.show("Startup File Saved!"); saveStartupFile(); } },
                    { title: "Load Factory Setting", action: () => { loadFactorySetting } },
                ]
            },
        ]
    },
    {
        title: "Edit", child: [
            { title: "Cut", action: () => { Table.cutEvent() } },
            { title: "Copy", action: () => { Table.copyEvent() } },
            { title: "Paste Before", action: () => { Table.putEvent() }, enabled: () => Table.Data.copiedEvent != undefined },
            { title: "Paste After", action: () => { Table.putEventAfter() }, enabled: () => Table.Data.copiedEvent != undefined },
            { title: "Delete", action: () => { Table.deleteEvent() }, enabled: () => Table.Data.active != undefined },
            { title: "Add Timeline", action: () => { onContextAddTimeline() } },
            { title: "Change Color Palette", action: () => { generateColorPalette() } },
        ]
    },
    {
        title: "Preference", child: [
            { title: () => !Preferences.showDebugMenu ? "Show Debug Menu" : "Hide Debug Menu", action: () => { Preferences.showDebugMenu = !Preferences.showDebugMenu; } },
            {
                title: "Themes", child: [
                    { title: "Dark", selected: () => Preferences.theme === "dark", action: () => { Preferences.theme = "dark"; } },
                    { title: "Vlue", selected: () => Preferences.theme === "vlue", action: () => { Preferences.theme = "vlue"; } },
                    { title: "Light", selected: () => Preferences.theme === "light", action: () => { Preferences.theme = "light"; } },
                    { title: "--", selected: () => Preferences.theme === "", action: () => { Preferences.theme = ""; } },
                    { title: "--", selected: () => Preferences.theme === "", action: () => { Preferences.theme = ""; } },
                ]
            },
            {
                title: "Auto Backup Interval", child: [
                    { title: "None", selected: () => Preferences.autoBackupInterval === -1, action: () => { Preferences.autoBackupInterval = -1; } },
                    { title: "10 sec", selected: () => Preferences.autoBackupInterval === 10000, action: () => { Preferences.autoBackupInterval = 10000; } },
                    { title: "1 min", selected: () => Preferences.autoBackupInterval === 60000, action: () => { Preferences.autoBackupInterval = 60000; } },
                    { title: "2 min", selected: () => Preferences.autoBackupInterval === 120000, action: () => { Preferences.autoBackupInterval = 120000; } },
                    { title: "5 min", selected: () => Preferences.autoBackupInterval === 300000, action: () => { Preferences.autoBackupInterval = 300000; } },
                ]
            },
            { title: "Auto Save", action: () => { Preferences.autoSave = !Preferences.autoSave }, checked: () => { return Preferences.autoSave } },
            {
                title: "Undo Steps", child: [
                    { title: "8", selected: () => Preferences.undoStep === 8, action: () => { Preferences.undoStep = 8; } },
                    { title: "16", selected: () => Preferences.undoStep === 16, action: () => { Preferences.undoStep = 16; } },
                    { title: "24", selected: () => Preferences.undoStep === 24, action: () => { Preferences.undoStep = 24; } },
                    { title: "32", selected: () => Preferences.undoStep === 32, action: () => { Preferences.undoStep = 32; } },
                    { title: "40", selected: () => Preferences.undoStep === 40, action: () => { Preferences.undoStep = 40; } },
                ]
            },
        ]
    },
]

function addChild(child) {
    var rev = document.createElement("ul");
    for (let i = 0; i < child.length; i++) {
        const element = child[i];
        var c = document.createElement("li");
        var item = document.createElement("a");
        var enabled = true;
        item.innerText = typeof element.title == "string" ? element.title : element.title();
        if (element.action != undefined) {
            item.onclick = element.action;
        }
        if (element.checked != undefined) {
            if (element.checked() === true)
                c.classList = "checked";
            else if (element.checked() === false)
                c.classList = "unchecked";
        }
        if (element.selected != undefined) {
            if (element.selected() === true)
                c.classList = "selected";
        }
        if (element.enabled != undefined) {
            if (element.enabled() === false) {
                c.classList = "disabled";
                item.onclick = undefined;
                enabled = false;
            }

        }
        c.appendChild(item);
        if (element.child != undefined && enabled) {
            c.appendChild(addChild(element.child));
        }
        rev.appendChild(c);
    }
    return rev;
}


function refreshTopNavBar() {

    topNavBar.firstChild.onclick = () => {
        topNavBar.innerHTML = "";
        topNavBar.append(addChild(menu2));
        topNavBar.classList.toggle("ss")
        closeContextMenu();
        refreshTopNavBar();
    };

    topNavBar.firstChild.addEventListener("mouseleave", () => {
        topNavBar.classList.remove("ss")
    });
}

function initTopNavBar() {

    topNavBar.innerHTML = "";
    topNavBar.append(addChild(menu2));
}

initTopNavBar();
refreshTopNavBar();
initializeDb();