const { app, BrowserWindow, ipcMain, globalShortcut
  , getCurrentWindow } = require('electron')
 

var fs = require('fs');
const ejse = require('ejs-electron')
var ejs = require('ejs');
const path = require('path');

const github_main = require("./builder_pages/update_github/main");  

const loader_main = require("./builder_pages/choose_loader/main");

const { save_images } = require("./data_loading/helper_loader.js");
 

const { buildCondensedCSS } = require("./data_loading/css_loader.js");


const { getPortfolioData } = require("./data_loading/portfolio_loader.js");

var win;


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





let firstTime = true;

 



function registerReload() {
  globalShortcut.register('commandOrControl+R', () => {

    buildCondensedCSS();

    win.reload();

  });
}


 
function inicializeProgram(project_lists) {


  registerReload();
  buildCondensedCSS();

  save_images(project_lists);


  data = getPortfolioData(project_lists, __dirname);  
  

  loadEJSPortfolio();


}



function loadEJSPortfolio(data) {
  ejse.data('data', data)

  var portfolio_path = '/portfolio.ejs';

  var template = fs.readFileSync('.' + portfolio_path, 'utf-8');
  var html_to_save = ejs.render(template, data);


  win.loadURL('file://' + __dirname + portfolio_path);

  if (firstTime) {
    firstTime = false;
    github_main.open_window(html_to_save, win);
  }

}