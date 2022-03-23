const { app, BrowserWindow, ipcMain, globalShortcut
      , getCurrentWindow } = require('electron')



var fs = require('fs');
const ejse = require('ejs-electron')
var ejs  = require('ejs');
const path = require('path');
const github_main = require("./builder_pages/update_github/main");
const loader_main =   require("./builder_pages/choose_loader/main");
const {  save_images } = require("./data_loading/helper_loader.js");
const { getProfile } = require("./data_loading/profile_loader.js");

const { getCSSPaths } = require("./data_loading/css_loader.js");

var win;

/* I decided that at the current moment, its not worth automating much of the process
of adding a new language. Currently, after putting the name in this array directly in code,
you must manually look for an icon image on google. For next versions, consider finding a better
way!  */
tech_list = ["python", 'java', 
              'javascript', 'nodejs', 
              'godot', 'electron',  
              'unity', "c"];

function createWindow ()  {
  
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



  

  let firstTime = true;

  /* Receives a list of paths of css files, reads those css files and
  writes all their content to a new file*/
  function buildCondensedCSS( ) {

 
    /* Delete condensed_css file */

    
    fs.unlinkSync('./portfolio_need/styles/condensed_css.css');


    const cssPaths = getCSSPaths();
    const condensedCSSExplanation = "/*\n WARNING \n This file is auto generated so that the \n portfolio page only needs to import one \n stylesheet path. If you wish to look \n or modify the structure, look at the other files \n */ \n";
    fs.writeFileSync(path.join(__dirname, 
      "portfolio_need/styles/condensed_css.css"), 
      condensedCSSExplanation, { flag: 'a' });

    cssPaths.forEach(function(cssPath) {
      if( fs.statSync(cssPath).isDirectory()) {
         return;
      }
      
      let cssFile = fs.readFileSync(cssPath, 'utf8');
      fs.writeFileSync(path.join(__dirname, 
        "portfolio_need/styles/condensed_css.css"), 
        cssFile, { flag: 'a' });
  });

   
  }


 
  function inicialize_program(project_lists)
  {

    globalShortcut.register('commandOrControl+R', ()=>{
    
      buildCondensedCSS();

      win.reload();
    
    });

    /*win.on('ready-to-show', (e) => {
      buildCondensedCSS( );
    })*/
  
    save_images(project_lists);

 
 
      data = {
        'project_lists' : project_lists, 
        'tech_list': tech_list,
        'profile': getProfile(), 
        'languages': [{name: "portugues", country: "brazil"}, {name: "english", country: "usa"}],
         
      
      'root': __dirname}
  
      ejse.data('data', data)
  
      var portfolio_path = '/portfolio.ejs';

      var template = fs.readFileSync('.'+portfolio_path, 'utf-8');
      var html_to_save = ejs.render ( template , data );
      
  
      win.loadURL('file://' + __dirname + portfolio_path);
      
      if(firstTime)
      {
        firstTime = false;
        github_main.open_window(html_to_save,win);
      }
      


  }

