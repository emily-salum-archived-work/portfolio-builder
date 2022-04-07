

// WIP
const { updateCSS } = require("./backend/distConstructor/cssLoader.js");
const { updateHTML } = require('./backend/distConstructor/htmlLoader');
const { buildCondensedJS, minifyJS } = require("./backend/distConstructor/jsLoader.js");


 var changing_css = false;
 var changing_js = false;

function startWatchers() {
 

    startJSWatcher();

    startCSSWatcher();

    startEssentialCSSWatcher();

}



function startJSWatcher() {
    const jsWatcher = chokidar.watch(__dirname + "/../portfolio_need/js", { persistent: true });

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
}


function startCSSWatcher() {
    const cssWatcher = chokidar.watch(__dirname + "/../portfolio_need/styles/structure", { persistent: true });


  cssWatcher.on('change', (path) => {
    
    if(!changing_css) {
      changing_css = true; 
      updateCSS();

      setTimeout(()=> {
      changing_css = false;} , 4000);
      reloadEJSWindow();
    }
  });

  
}



function startEssentialCSSWatcher() {

    let essentialCSSWatcher = chokidar.watch(__dirname + "/../portfolio_need/styles/essentials", { persistent: true });
 
    essentialCSSWatcher.on('change', (path) => {
  
      updateHTML(html_to_save);
    });
}
