const { app, BrowserWindow, ipcMain, globalShortcut
  , getCurrentWindow } = require('electron')
 
 
const path = require('path');
 

const loader_main = require("./backend/builder_pages/choose_loader/main");
 

const { updateCSS } = require("./backend/distConstructor/cssLoader.js");
const { buildCondensedJS, minifyJS } = require("./backend/distConstructor/jsLoader.js");

const { getPortfolioData } = require("./backend/data_loading/portfolio_loader.js");

var win;

require("./backend/builder_pages/update_github/main"); 

const chokidar = require('chokidar');
const { updateEJS, loadEJSListeners } = require('./backend/builder_pages/ejsLoader');
const { updateHTML } = require('./backend/distConstructor/htmlLoader');


var inicializeProgramListeners = [];


function createWindow() {
 
  win = new BrowserWindow({

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, contextIsolation: false,
    }
  });




  app.on("project_lists_loaded",
    (arg) => {

      inicializeProgram(arg);
    });

  loader_main.open_window(win); 


}



app.whenReady().then(createWindow)


 


function registerReload() {
 
  globalShortcut.register('commandOrControl+R', () => {

    buildCondensedCSS();
    buildCondensedJS();

    reloadEJSWindow();

  });
}


 var changing_css = false;
  var changing_js = false;
var html_to_save ="" 

function inicializeProgram(project_lists) {
  
  buildCondensedJS();

  inicializeProgramListeners.forEach(listener=> listener());

 // registerReload();
 const jsWatcher = chokidar.watch(__dirname + "/portfolio_need/js", { persistent: true });

  jsWatcher.on('change', (path) => {
  
    if(!changing_js) {
      changing_js = true;
      buildCondensedJS();
      minifyJS();
      setTimeout(()=> {
      changing_js = false;} , 4000);
      reloadEJSWindow();
    }
  })


  const cssWatcher = chokidar.watch(__dirname + "/portfolio_need/styles/structure", { persistent: true });


  cssWatcher.on('change', (path) => {
    
    if(!changing_css) {
      changing_css = true; 
      updateCSS();

      setTimeout(()=> {
      changing_css = false;} , 4000);
      reloadEJSWindow();
    }
  });

  let essentialCSSWatcher = chokidar.watch(__dirname + "/portfolio_need/styles/essentials", { persistent: true });
 
  essentialCSSWatcher.on('change', (path) => {

    updateHTML(html_to_save);
  });

  updateEJS(project_lists);

}

loadEJSListeners.push((html) => {html_to_save = html; });
 
function openEJSWindow() {
  
  var portfolio_path = '/portfolio.ejs';
  win.loadURL('file://' + __dirname + portfolio_path);
}

function reloadEJSWindow() {
  ///win.reload();
}