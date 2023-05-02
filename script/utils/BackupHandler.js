var autoBackupTimmer;

/**
 * This function updates the backup timer based on user preferences and adds the current file to a
 * record of backups.
 */
function updateBackupTimmer() {
    if (autoBackupTimmer != -1) clearInterval(autoBackupTimmer);
    if (Preferences.autoBackupInterval != -1) {
        backupFileName = getCurrentTimeDate();
        addCurrentFileToRecord();

        autoBackupTimmer = setInterval(() => {
            backupFileName = getCurrentTimeDate();
            addCurrentFileToRecord();
            console.log(backupFileName);
        }, Preferences.autoBackupInterval);

        function addCurrentFileToRecord() {
            var pre = localStorage.getItem(backupsTrackerId);
            pre = pre?.split(",") || [];
            pre = pre.slice(Math.max(pre.length - 2, 0));
            pre.push(backupFileName);
            localStorage.setItem(backupsTrackerId, pre.toString());
        }
    }
}
