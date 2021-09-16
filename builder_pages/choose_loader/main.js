const { app, BrowserWindow, ipcMain } = require('electron')

const { load_projects } = require("../../data_loading/projects_loader");
const { mock_data, load_mock } = require("../../data_loading/mock_loader");

function open_window(win)
{
    
    win.loadURL(__dirname + "/main.html");
    ipcMain.on('load_selected', (event, arg) => {
        var loaders = {'projects' : load_projects, 'mock': load_mock};
        
        loaders[arg]();

    });

}
exports.open_window = open_window;