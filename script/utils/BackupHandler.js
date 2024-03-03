var autoBackupTimmer;

const s = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

/**
 * This function updates the backup timer based on user preferences and adds the current file to a
 * record of backups.
 */
function updateBackupTimmer() {
    if (autoBackupTimmer != -1) clearInterval(autoBackupTimmer);
    if (PreferenceVars.autoBackupInterval != -1) {
        autoBackupTimmer = setInterval(() => {
            let backupFileName = `Autosave_${getTimeStamp()}`
            backupFile(backupFileName,Table.Data.dump)
        }, PreferenceVars.autoBackupInterval);
    }
}

function backupFile(name,data) {
    var prev = localStorage.getItem(backupsTrackerId) || "{}";
    prev = JSON.parse(prev)
    var v = {};
    let keys = Object.keys(prev);
    for (var i = Math.max((keys.length) - (Preferences.keepBackupCount) +1 ,0); i < keys.length; i++) {
        console.log(i);
        v[keys[i]] = prev[keys[i]]
    }
    v[name] = data;
    localStorage.setItem(backupsTrackerId, JSON.stringify(v))
}

function backupForceCloseFile(name,data) {
    var prev = localStorage.getItem(forceClosedBackupsTrackerId) || "{}";
    prev = JSON.parse(prev)
    var v = {};
    let keys = Object.keys(prev);
    for (var i = Math.max((keys.length) - (Preferences.keepBackupCount) +1 ,0); i < keys.length; i++) {
        v[keys[i]] = prev[keys[i]]
    }
    v[name] = data;
    localStorage.setItem(forceClosedBackupsTrackerId, JSON.stringify(v))
}

function getForceCloseBackupFiles() {
    return Object.keys(JSON.parse(localStorage.getItem(forceClosedBackupsTrackerId) || "{}"));
}
function getAutoSaveFiles() {
    return Object.keys(JSON.parse(localStorage.getItem(backupsTrackerId) || "{}"));
}

function loadBackup(name){
    var prev = localStorage.getItem(backupsTrackerId) || "{}";
    prev = JSON.parse(prev)
    if(Object.keys(prev).includes(name)){
        Table.loadTableContent(prev[name])
        return 
    }
    prev = localStorage.getItem(forceClosedBackupsTrackerId) || "{}";
    prev = JSON.parse(prev)
    if(Object.keys(prev).includes(name)){
        Table.loadTableContent(prev[name])
        return 
    }
}

function getTimeStamp() {
    let now = new Date()
    return `${now.getDate()}-${s[parseInt(now.getMonth())-1]}-${now.getFullYear()}_${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}


function onForceCloseBackup(e){
    // console.log(e);
    // e.preventDefault();
    let fn = `Close_${getTimeStamp()}`;
    backupForceCloseFile(fn,Table.Data.dump)
}

window.addEventListener('beforeunload',(e)=>onForceCloseBackup(e))
window.addEventListener('onbeforeunload',(e)=>onForceCloseBackup(e))