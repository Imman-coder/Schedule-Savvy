var autoSave = true;
var undoStep = 32;



function toggleAutosave()
{
    autoSave=!autoSave;
    saveAll();
}