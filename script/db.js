// const tableId = "sJson";
// const lastLoadVarsId = "lastloadvars"
// const lastLoadTabId = "lastloadtable"
// const colorTableId = "colortable"





const EventBlock = {
    "time_span": 1,
    "subjects": [
    ],
    /*
     *   classType
     *   0-> Normal Class
     *   1-> Lab Class
     *   2-> Notice
     */
    "class_type": 0
}

var sJson = {
    "table": [
        [1, 2, 3, 4, 5, 6],
        [5, 4, 7, 8, 3, 1, 9, 10],
        [4, 8, 7, 1, 3, 11],
        [5, 9, 4, 12, 3, 1, 6, 10],
        [1, 13, 3, 8, 15, 5],
        [15, 5, 6, 8, 3]
    ],
    "timeList": [555, 610, 665, 720, 775, 825, 875, 925, 975],
    "base": {
        "1": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Design Analysis Algorithm",
                    "subject_code": "",
                    "teacher": "Sikheresh Barik"
                }
            ],
            "class_type": 0
        },
        "2": {
            "time_span": "3",
            "subjects": [
                {
                    "subject": "Design Analysis Algorithm",
                    "subject_code": "",
                    "teacher": "Sikheresh Barik / Sudeep Gochayat"
                }
            ],
            "class_type": "1"
        },
        "3": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Lunch Break",
                    "subject_code": "",
                    "teacher": ""
                }
            ],
            "class_type": "2"
        },
        "4": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Java Programming",
                    "subject_code": "",
                    "teacher": "Mousami Acharya"
                }
            ],
            "class_type": 0
        },
        "5": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Theory Of Computation",
                    "subject_code": "",
                    "teacher": "Sudeep Gochayat"
                }
            ],
            "class_type": 0
        },
        "6": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Organizational Behavior",
                    "subject_code": "",
                    "teacher": "Sushant Kuma Nayak"
                }
            ],
            "class_type": 0
        },
        "7": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Discrete Structure",
                    "subject_code": "",
                    "teacher": "Ranjak Kumar Jati"
                }
            ],
            "class_type": 0
        },
        "8": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Computer Architecture Organization",
                    "subject_code": "",
                    "teacher": "Subhranshu Tripathy"
                }
            ],
            "class_type": 0
        },
        "9": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Soft Skill",
                    "subject_code": "",
                    "teacher": "Mamta Banarjee"
                }
            ],
            "class_type": 0
        },
        "10": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Library",
                    "subject_code": "",
                    "teacher": ""
                }
            ],
            "class_type": "2"
        },
        "11": {
            "time_span": "3",
            "subjects": [
                {
                    "subject": "Java Programming",
                    "subject_code": "",
                    "teacher": "Mousami Acharya / Rosalin Das"
                }
            ],
            "class_type": "1"
        },
        "12": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Constution Of India",
                    "subject_code": "",
                    "teacher": "Leena Patnaik"
                }
            ],
            "class_type": 0
        },
        "13": {
            "time_span": "3",
            "subjects": [
                {
                    "subject": "MAT(MAT)",
                    "subject_code": "",
                    "teacher": "Subhranshu Tripathy / Neeva Tripathy"
                }
            ],
            "class_type": "1"
        },
        "14": {
            "time_span": 1,
            "subjects": [],
            "class_type": 0
        },
        "15": {
            "time_span": 1,
            "subjects": [
                {
                    "subject": "Discrete Structure",
                    "subject_code": "",
                    "teacher": "SK(SK)"
                }
            ],
            "class_type": 0
        }
    }
}
    ;
var Json = {
    table: [
        [],
        [],
        [],
        [],
        [],
        []],
    timeList: [
    ]
    ,
    base: {
    },
};

var nJson = {
    EventTable: [
        [],
        [],
        [],
        [],
        [],
        []],
    TimeList: [
    ]
    ,
    EventList: {
    },
};
[
    "#b09a11",
    "#5778b3",
    "#fe1a54",
    "#37c729",
    "#b0820c",
    "#a7a321",
    "#5ff094",
    "#d436cb",
    "#b124c3",
    "#6a24aa"
]

// function saveToBrowser() {
//   localStorage.setItem(tableId, JSON.stringify(sJson));
//   localStorage.setItem(colorTableId, colorTable.toString());
// }

// function loadFromBrowser() {
//   if (localStorage.getItem(tableId) != undefined)
//     loadContentToTable(JSON.parse(localStorage.getItem(tableId)), localStorage.getItem("color")?.split(","));
// }

// function loadContentToTable(json, color = undefined) {
//   Table.Data.dump = JSON.stringify(json);
//   colorTable = color || colorTable;
// //   onEventSelect();
// }

// function hasTableBackup() { return (localStorage.getItem(tableId) != undefined); };

// function hasLastSession() { return false };
// function hasLastAutoSave() { return false };

// function initializeDb() {

//   if (hasStartupVars()) {
//     var vs = JSON.parse(localStorage.getItem(lastLoadTabId));
//     autoBackup = vs.autoBackup;
//     undoStep = vs.undoStep;
//     autoSave = vs.autoSave;
//     showDebugMenu = vs.showDebugMenu;
//     initDebugMenu();
//     updateBackupTimmer();
//   }

//   if (hasTableBackup())
//     initLoadLastModule();
// }

// function hasStartupTable() { return localStorage.getItem(lastLoadTabId) != undefined };
// function hasStartupVars() { return localStorage.getItem(lastLoadTabId) != undefined };

// function newProject() {

//   if (hasStartupTable()) {
//     loadContentToTable(JSON.parse(localStorage.getItem(lastLoadTabId)));
//   }
//   else
//     loadContentToTable(nJson);

//   if (hasStartupVars()) {
//     var vs = JSON.parse(localStorage.getItem(lastLoadTabId));
//     autoBackupInterval = vs.autoBackupInterval;
//     undoStep = vs.undoStep;
//     autoSave = vs.autoSave;
//     showDebugMenu = vs.showDebugMenu;
//     initDebugMenu();
//     startBackupTimmer();
//   }
// }

// function saveStartupFile() {
//   localStorage.setItem(lastLoadVarsId, JSON.stringify({
//     autoSave: autoSave,
//     undoStep: undoStep,
//     autoBackupInterval: autoBackupInterval,
//     showDebugMenu: showDebugMenu,
//   }));
//   localStorage.setItem(lastLoadTabId, JSON.stringify(sJson));
// }

// function loadFactorySetting() {
//   localStorage.clear();
//   newProject();
// }



// function makeBackup() {
//   fullBackupToBrowser(backupFileName);
// }


// function fullBackupToBrowser(fileName) {
//   localStorage.setItem(fileName, JSON.stringify({
//       prefs: JSON.stringify({
//           autoSave: autoSave,
//           undoStep: undoStep,
//           autoBackupInterval: autoBackupInterval,
//           showDebugMenu: showDebugMenu,
//       }),
//       table: JSON.stringify(sJson),
//       colorTable: colorTable.toString(),
//   }));
// }

// function fullBackupFromBrowser(fileName) {
//   return localStorage.getItem(fileName);
// }

class Db {

    static startupTable = "startuptable";
    static saveTable = "savetable";

    static loadFactorySetting() {
        localStorage.removeItem(this.startupTable);
        localStorage.removeItem(PreferenceId);
    }

    static loadStartupFile() {
        if (this.hasStartupTable()) {
            Table.Data.dump = localStorage.getItem(this.startupTable);
        }
        else{
            Table.Data.dump = JSON.stringify(nJson);
        }
        Table.Draw();
        onEventSelect();
    }

    static saveStartupFile() {
        //TO-DO remove not used Event if any
        localStorage.setItem(this.startupTable, Table.Data.dump);
    }
    
    static hasStartupTable(){
        return localStorage.getItem(this.startupTable) != undefined;
    }

    static saveToBrowser(){
        localStorage.setItem(this.saveTable, Table.Data.dump);
        snackbar.show("Saved to Browser",snackbar.Success);
    }

    static loadFromBrowser(){
        Table.Data.dump =localStorage.getItem(this.saveTable);
        Table.Draw();
        onEventSelect();
        snackbar.show("Loaded from Browser",snackbar.Success);
    }

    static hasSavedToBrowser(){
        return localStorage.getItem(this.saveTable)!=undefined;
    }


}