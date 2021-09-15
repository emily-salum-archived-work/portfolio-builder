const { app, BrowserWindow, ipcMain } = require('electron')
var fs = require('fs');
const ejse = require('ejs-electron')
var ejs  = require('ejs');
const { load_projects } = require("./data_loading/projects_loader");
const { mock_data, load_mock } = require("./data_loading/mock_loader");
const path = require('path');

let win;
function createWindow () 
{

    win = new BrowserWindow({

        webPreferences:{
             preload: path.join(__dirname, "preload.js"),
             nodeIntegration: true,  contextIsolation: false,
        }
    });

      
  app.on("project_lists_loaded",
  (arg) => {
 
     inicialize_program(arg);    
 });
  
    ipcMain.on('load_selected', (event, arg) => {
        var loaders = {'projects' : load_projects, 'mock': load_mock};
        
        loaders[arg]();

    });

    win.loadURL(__dirname + "/builder_pages/choose_loader/main.html");
  //  win.loadURL(__dirname + "/index.html");
    
   
  }
  app.whenReady().then(createWindow)    

  let confirm_win ;
  let html_to_save ;
  function inicialize_program(project_lists)
  {
      data = {'project_lists' : project_lists, 'root': __dirname}
  
      ejse.data('data', data)
  
      var portfolio_path = '/portfolio.ejs';

      var template = fs.readFileSync('.'+portfolio_path, 'utf-8');
      html_to_save = ejs.render ( template , data );
      
  
      win.loadURL('file://' + __dirname + portfolio_path);
      

    confirm_win = new BrowserWindow({
        webPreferences:{
             preload: path.join(__dirname, "preload.js"),
             nodeIntegration: true,  contextIsolation: false,
        }
    });

    confirm_win.loadURL(__dirname + "/builder_pages\\update_github\\main.html");


  }


  ipcMain.on("github_close", () => {

    confirm_win.close();

  });

  function test()
  {
      console.log("it works");
  }

let changes_sent = false;
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

    PythonShell.run('C:/Users/user/PycharmProjects/github_init/github_args.py', options, function (err, results) {
        if (err)
            throw err;
        console.log('github.py finished.');
    });

}
  

ipcMain.on('save_changes', send_changes);