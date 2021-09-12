const { app, BrowserWindow, ipcMain } = require('electron')
var fs = require('fs');
const ejse = require('ejs-electron')
var ejs  = require('ejs');
const { load_projects } = require("./data_loading/projects_loader");
const { mock_data, load_mock } = require("./data_loading/mock_loader");
const path = require('path');

let TESTING = true;
let SEND_CHANGES = false;

let win;
function createWindow () 
{

    win = new BrowserWindow({

        //contextIsolation: true,
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

    win.loadURL(__dirname + "/builder_pages/choose_configurations/main.html");
    
   
  }
  app.whenReady().then(createWindow)    

  function inicialize_program(project_lists)
  {
  
      data = {'project_lists' : project_lists}
  
      ejse.data('data', data)
  
  
      var template = fs.readFileSync('./portfolio.ejs', 'utf-8');
      var html = ejs.render ( template , data );
      
  
      win.loadURL('file://' + __dirname + '/portfolio.ejs');
      
      send_changes(html);
  }




function send_changes(html) 
{
    let {PythonShell} = require('python-shell');

    if(TESTING && !SEND_CHANGES)
    {
        return;
    }
    fs.writeFileSync("./index.html", html, 'utf8');
    let options = {
        pythonPath: "C:\\Users\\user\\PycharmProjects\\untitled\\venv\\Scripts\\python.exe",
        args: ["portfolio",
            '{"paths" : ["C:/Users/user/portfolio_builder/index.html", "C:/Users/user/portfolio_builder/styles.css", "C:/Users/user/portfolio_builder/res"]}',
            true]
    };

    PythonShell.run('C:\\Users\\user\\PycharmProjects\\github_init\\github_args.py', options, function (err, results) {
        if (err)
            throw err;
        console.log('github.py finished.');
    });

}
  