let changes_sent = false;

const path = require('path');
const loader_main =   require("../../builder_pages/choose_loader/main");

const { app,BrowserWindow, ipcMain } = require('electron')
var fs = require('fs');
let confirm_win;
let html_to_save;

function open_window(html,win)
{
    html_to_save = html;
     confirm_win = new BrowserWindow({
        width: 300,
        height:250,
        resizable:false,
        webPreferences:{
             
             nodeIntegration: true,  contextIsolation: false,
        }
    });

    confirm_win.loadURL(__dirname + "\\main.html").then(
        () => {
 
            ipcMain.on('save_changes', send_changes);

            ipcMain.on("github_close", (e,a) => {
                confirm_win.close();
            });

            ipcMain.on("choose_loader_again", () => {loader_main.open_window(win);
            })
            


        confirm_win.webContents.send('init_update_github');    

  });

}
exports.open_window = open_window;

function send_changes() 
{
    let {PythonShell} = require('python-shell');
    fs.writeFileSync("./index.html", html_to_save, 'utf8');
    
    if (changes_sent){ return;}
    changes_sent = true;
    let options = {
        pythonPath: "C:/Users/user/PycharmProjects/untitled/venv/Scripts/python.exe",
        args: ["portfolio",
            '{"paths" : ["C:/Users/user/portfolio-builder/index.html", '+
           '"C:/Users/user/portfolio-builder/bootstrap-5.1.0-dist",'+
           ' "C:/Users/user/portfolio-builder/portfolio_need"]}',
            true]
    };

    PythonShell.run('C:/Users/user/PycharmProjects/github_init/togit/github_args.py', options, function (err, results) {
        if (err)
            throw err;
        console.log('github.py finished.');
    });

}
  
