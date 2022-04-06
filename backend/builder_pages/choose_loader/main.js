const { app, BrowserWindow, ipcMain } = require('electron')
 
const { loadProjects } = require("../../data_loading/projects_loader");

function open_window(win)
{
    
    win.loadURL(__dirname + "/main.html");
    ipcMain.on('load_selected', (event, arg) => {
       
        var loaders = { 'local' : loadProjects };
        
        loaders[arg]();
        
        win.close();

    });

}
exports.open_window = open_window;