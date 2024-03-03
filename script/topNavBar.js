var topNavMenu = document.getElementsByClassName("menus")[0];


var inputFile = document.createElement("input");
inputFile.setAttribute("type", "file");
inputFile.setAttribute("accept", "application/json , .ssv");
inputFile.style.display = "none";



inputFile.onchange = (event) => {
    var reader = new FileReader();
    reader.onload = () => {
        Table.Data.dump = reader.result;
        snackbar.show("File Opened!");
        Table.Draw();
    };
    reader.readAsText(event.target.files[0]);

}
const downloadFile = () => {
    const link = document.createElement("a");
    var content = JSON.stringify(Table.Data.dump, undefined, '\t');
    content = content.substring(1,content.length-1)
    content = content.replaceAll("\\\"","\"")
    const file = new Blob([content], { type: 'application/json' });
    link.href = URL.createObjectURL(file);
    link.download = "Table.json";
    link.click();
    URL.revokeObjectURL(link.href);
};

const saveFile = () => {
    const link = document.createElement("a");
    const content = JSON.stringify({ table: Table.Data.dump, color: colorTable, }, undefined, '\t');
    const file = new Blob([content], { type: '.ssv' });
    link.href = URL.createObjectURL(file);
    link.download = "Project.ssv";
    link.click();
    URL.revokeObjectURL(link.href);
};


var menu2 = [
    {
        title: "File", child: [
            { title: "New", shortcut: "Ctrl N", action: () => { snackbar.show("New Project Loaded!"); Table.newTable() } },
            { title: "Open", shortcut: "Ctrl O", action: () => { inputFile.click(); } },
            {
                title: "Recover", child: [
                    { title: "Last Auto Save", action: () => { Db.loadFromBrowser() }, enabled: () => Db.hasSavedToBrowser },
                    { title: "Auto Save", action: () => { }, enabled: () => false },
                    { title: "Close Save", action: () => { }, enabled: () => false },
                ]
            },
            {
                title: "Save", child: [
                    { title: "As file", action: () => { saveFile() } },
                    { title: "In browser", shortcut: "Ctrl S", action: () => { Db.saveToBrowser() } },
                ]
            },
            {
                title: "Export", child: [
                    { title: "as Image", action: () => { initSaveAsImageModule() } },
                    { title: "as Json", shortcut: "Ctrl E", action: downloadFile },
                ],
            },
            {
                title: "Defaults", child: [
                    { title: "Save Startup File", action: () => { snackbar.show("Startup File Saved!"); Db.saveStartupFile(); } },
                    { title: "Load Factory Setting", action: () => { Db.loadFactorySetting(); } },
                ]
            },
        ]
    },
    {
        title: "Edit", child: [
            { title: "Cut", shortcut: "Ctrl X", action: () => { Table.cutEvent() } },
            { title: "Copy", shortcut: "Ctrl C", action: () => { Table.copyEvent() } },
            { title: "Paste Before", shortcut: "Ctrl V", action: () => { Table.putEvent() }, enabled: () => Table.Data.copiedEvent != undefined },
            { title: "Paste After", shortcut: "Ctrl Shift V", action: () => { Table.putEventAfter() }, enabled: () => Table.Data.copiedEvent != undefined },
            { title: "Delete", shortcut: "Del", action: () => { Table.deleteEvent() }, enabled: () => Table.Data.active != undefined },
            { title: "Undo", shortcut: "Ctrl Z", action: () => { UndoManager.undo() }, enabled: () => UndoManager.undoStack.length != 0 },
            { title: "Redo", shortcut: "Ctrl Shift Z", action: () => { UndoManager.redo() }, enabled: () => UndoManager.redoStack.length != 0 },
            { title: "Add Timeline", action: () => { onContextAddTimeline() } },
            { title: "Change Color Palette", shortcut: "Ctrl P", action: () => { generateColorPalette() } },
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
            { title: "Backup Count", child:[
                    { title: "5", selected: () => Preferences.keepBackupCount === 5, action: () => { Preferences.keepBackupCount = 5; } },
                    { title: "7", selected: () => Preferences.keepBackupCount === 7, action: () => { Preferences.keepBackupCount = 7; } },
                    { title: "12", selected: () => Preferences.keepBackupCount === 12, action: () => { Preferences.keepBackupCount = 12; } },
                    { title: "16", selected: () => Preferences.keepBackupCount === 16, action: () => { Preferences.keepBackupCount = 16; } },
                    { title: "20", selected: () => Preferences.keepBackupCount === 20, action: () => { Preferences.keepBackupCount = 20; } },
                ] 
            },
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
        if (element.shortcut != undefined) {
            var sholder = document.createElement("a");
            sholder.innerText = element.shortcut;
            sholder.classList = "shortcut";
            item.appendChild(sholder);

        }
        if (element.child != undefined && enabled) {
            c.appendChild(addChild(element.child));
        }
        rev.appendChild(c);
    }
    return rev;
}


function refreshTopNavBar() {
    refreshTopNavBarRef()
    topNavMenu.firstChild.onclick = () => {
        topNavMenu.innerHTML = "";
        var nav = addChild(menu2);
        topNavMenu.append(nav);
        topNavMenu.classList.toggle("ss")
        closeContextMenu();
        refreshTopNavBar();
    };

    topNavMenu.firstChild.addEventListener("mouseleave", () => {
        topNavMenu.classList.remove("ss")
    });
}

function refreshTopNavBarRef() { 
    menu2[0].child[2].child[0].enabled = ()=>false;
    menu2[0].child[2].child[0].action = undefined;
    menu2[0].child[2].child[1].child = undefined;
    menu2[0].child[2].child[1].enabled = ()=>false;
    menu2[0].child[2].child[2].child = undefined;
    menu2[0].child[2].child[2].enabled = ()=>false;
    var sla=[];
    getAutoSaveFiles().forEach(file =>{
        var sl = {
            title: file,
            action: ()=>{loadBackup(file)}
        }
        sla.push(sl)
    })
    if(sla.length>0){
        menu2[0].child[2].child[1].enabled = ()=>true;
        menu2[0].child[2].child[1].child = sla;
        menu2[0].child[2].child[0].enabled = ()=>true;
        menu2[0].child[2].child[0].action = ()=>{loadBackup(sla[sla.length-1])};
    }

    sla = []
    getForceCloseBackupFiles().forEach(file =>{
        var sl = {
            title: file,
            action: ()=>{loadBackup(file)}
        }
        sla.push(sl)
    })
    if(sla.length>0){
        menu2[0].child[2].child[2].enabled = ()=>true;
        menu2[0].child[2].child[2].child = sla;
    }
}

function initTopNavBar() {

    topNavMenu.innerHTML = "";
    topNavMenu.append(addChild(menu2));
}

initTopNavBar();
refreshTopNavBar();