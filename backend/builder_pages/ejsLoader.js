
const ejse = require('ejs-electron')
var fs = require('fs'); 
var ejs = require('ejs');
 


let firstTime = true;

const { getPortfolioData } = require("../data_loading/portfolio_loader.js");
const path = require('path');

  var data = {};



  function updateEJS(project_lists) {

    data = getPortfolioData(project_lists, __dirname);  
    loadEJSPortfolio();
  }

  exports.updateEJS = updateEJS;


var loadEJSListeners = [];

exports.loadEJSListeners = loadEJSListeners;

function loadEJSPortfolio( ) {
 

    for(key of Object.keys(data)) {
      ejse.data(key, data[key]);
    }
    ejse.data('data', data)
  
    var portfolio_path = '../../portfolio.ejs';
  
    portfolio_path = path.join(__dirname, portfolio_path);

    var template = fs.readFileSync( portfolio_path, 'utf-8');
    var html_to_save = ejs.render(template, {...data});
  
  
    //openEJSWindow();
  
   
      loadEJSListeners.forEach(listener => listener(html_to_save));
   
  }
  
  exports.loadEJSPortfolio = loadEJSPortfolio;
  