
const { app, BrowserWindow } = require('electron') 
const path = require('path'); 
const loader_main = require("./backend/builder_pages/choose_loader/main");    
const { updateEJS } = require('./backend/builder_pages/ejsLoader'); 

var win;
var inicializeProgramListeners = [];
exports.inicializeProgramListeners = inicializeProgramListeners;


// Listener behaviour started
const {open_window} = require("./backend/builder_pages/update_github/main"); 
require("./backend/watchers");

function createWindow() {
 
  open_window();
 
  win = new BrowserWindow({

    webPreferences: {
       
      nodeIntegration: true, contextIsolation: false,
    }
  });

 
  app.on("project_lists_loaded",
    async (arg) => {

      await inicializeProgram(arg);
    });

  loader_main.open_window(win); 


}



app.whenReady().then(createWindow)


 





async function inicializeProgram(project_lists) {
  
  console.log("inicializeProgram");
  try { 

    console.log("inicializeProgramListeners caling");
    inicializeProgramListeners.forEach(async (listener)=> {
       await listener();
    });
    
    console.log("inicializeProgramListeners called");
    updateEJS(project_lists);
  
  } catch (error) {
    console.log(error);
  }
  
 
  
}
 