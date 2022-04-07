
const { app, BrowserWindow } = require('electron') 
const path = require('path'); 
const loader_main = require("./backend/builder_pages/choose_loader/main");  
const { buildCondensedJS } = require("./backend/distConstructor/jsLoader.js");    
const { updateEJS } = require('./backend/builder_pages/ejsLoader'); 

var win;
var inicializeProgramListeners = [];
exports.inicializeProgramListeners = inicializeProgramListeners;


// Listener behaviour started
require("./backend/builder_pages/update_github/main"); 
require("./backend/watchers");

function createWindow() {
 
  win = new BrowserWindow({

    webPreferences: {
       
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


 





function inicializeProgram(project_lists) {
  
  buildCondensedJS();

  inicializeProgramListeners.forEach(listener=> listener());
  
  updateEJS(project_lists);

}
 