const { app, BrowserWindow, ipcMain } = require('electron')
var fs = require('fs');
const ejse = require('ejs-electron')
var ejs  = require('ejs');
const path = require('path');
const github_main = require("./builder_pages/update_github/main");
const loader_main =   require("./builder_pages/choose_loader/main");

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
  
   loader_main.open_window(win);
  //  win.loadURL(__dirname + "/index.html");
    
   
  }
  app.whenReady().then(createWindow)    

  

  function inicialize_program(project_lists)
  {
      data = {'project_lists' : project_lists, 'root': __dirname}
  
      ejse.data('data', data)
  
      var portfolio_path = '/portfolio.ejs';

      var template = fs.readFileSync('.'+portfolio_path, 'utf-8');
      var html_to_save = ejs.render ( template , data );
      
  
      win.loadURL('file://' + __dirname + portfolio_path);
      

      github_main.open_window(html_to_save,win);


  }

