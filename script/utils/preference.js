const backupsTrackerId = "backuptracker";
const PreferenceId = "PreferenceCache";



var PreferenceVars = {
    autoSave: true,
    undoStep: 32,
    autoBackupInterval: 60000,
    theme:"dark",
    dump: undefined,
    showDebugMenu: false,
};

var PreferenceHandler = {
    set: function (target, key, value) {
        if (key === "dump") {
            var j = JSON.parse(value);
            for (var v in j) {
                if (target[v] != j[v]) Preferences[v] = j[v];
            }
        }
        if (target[key] != value) {
            if (SHOW_DEBUG_MESSAGES) console.log(`Preference: ${key} = ${target[key]} -> ${value}`);
            target[key] = value;
            if (key === "autoSave") onAutosaveChange();
            if (key === "undoStep") onUndoStepChange();
            if (key === "autoBackupInterval") onAutoBackupIntervalChange();
            if (key === "theme") onThemeChange();
            if (key === "showDebugMenu") onShowDebugMenuChange();
            localStorage.setItem(PreferenceId, Preferences.dump)
        }
    },
    get: function (target, key) {
        if (key === "dump") return JSON.stringify(target);
        return target[key];
    },
};

const Preferences = new Proxy(PreferenceVars, PreferenceHandler);


var j = JSON.parse(localStorage.getItem(PreferenceId));
for (var v in j) {
    if (PreferenceVars[v] != j[v]) Preferences[v] = j[v];
}

/*--------------------Preference Change Functions--------------------*/

function onAutosaveChange() {
    //TODO
}

function onUndoStepChange() {
    UndoManager.undoStack = UndoManager.undoStack.slice(Math.max(UndoManager.undoStack.length - Preferences.undoStep , 0));
    UndoManager.redoStack = UndoManager.redoStack.slice(0,Math.min(Preferences.undoStep,UndoManager.redoStack.length ));
}

/**
 * The function updates the backup timer when the auto backup interval is changed.
 */
function onAutoBackupIntervalChange() {
    updateBackupTimmer();
}

/**
 * The function toggles the visibility of a debug window based on the value of a preference.
 */
function onShowDebugMenuChange() {
    if (Preferences.showDebugMenu)
        document
            .getElementsByClassName("debug-window")[0]
            .classList.remove("hidden");
    else
        document.getElementsByClassName("debug-window")[0].classList.add("hidden");
}

function onThemeChange(){
    document.body.classList=Preferences.theme;
    generateColorPalette();
}


onShowDebugMenuChange();