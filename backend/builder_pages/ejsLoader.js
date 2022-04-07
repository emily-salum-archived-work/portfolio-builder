
const ejse = require('ejs-electron')
var fs = require('fs');
var ejs = require('ejs');



const { getPortfolioData } = require("../data_loading/portfolio_loader.js");
const path = require('path');

var data = {};

var html_to_save = "";

var loadEJSListeners = [];
exports.loadEJSListeners = loadEJSListeners;

 
 
/* Main EJS function, call to build EJS */
function updateEJS(project_lists) {

  data = getPortfolioData(project_lists, __dirname);
  loadEJSPortfolio();
}

exports.updateEJS = updateEJS;




 

function loadEJSPortfolio() {


  for (key of Object.keys(data)) {
    ejse.data(key, data[key]);
  }
  ejse.data('data', data)

  var portfolio_path = '../../portfolio.ejs';

  portfolio_path = path.join(__dirname, portfolio_path);

  var template = fs.readFileSync(portfolio_path, 'utf-8');
  html_to_save = ejs.render(template, { ...data });
 
  loadEJSListeners.forEach(listener => listener(html_to_save));

}

exports.loadEJSPortfolio = loadEJSPortfolio;


function getHtmlToSave() {
  return html_to_save;
}

exports.getHtmlToSave = getHtmlToSave;


/*  Currently unused. 

  Opens the ejs result as an electron window. */
function openEJSWindow() {
  
  var portfolio_path = '../../portfolio.ejs';
  win.loadURL('file://' + __dirname + portfolio_path);
}

/* In case openEJSWindow is used again, this function is called to reload the window */
function reloadEJSWindow() {
  // const {win} = require("../../main.js");
  ///win.reload();
}


exports.reloadEJSWindow = reloadEJSWindow;