var autoSave = false;
var undoStep = 32;



function toggleAutosave()
{
    autoSave=!autoSave;
    saveAll();
}