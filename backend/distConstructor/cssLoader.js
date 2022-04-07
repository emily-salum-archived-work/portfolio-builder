




const fs = require("fs");

const path = require('path');


const postcss = require('postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

const {log, styles} = require("../utils/logger.js");
 
const {deleteFile} = require("../utils/fileControl");

 

 
exports.updateCSS =  async function updateCSS() { 
  
    
  log("updateCSS", styles.called);

  const distCondensedCSS = path.join(__dirname,
      "../../dist/styles/condensed_css.css");

      deleteFile(distCondensedCSS);
       buildCSS(distCondensedCSS, "structure/");

      const output = await postcss([cssnano, autoprefixer])
      .process(fs.readFileSync(distCondensedCSS, 'utf-8'))
     
      let minifiedCss = output.css

     // minifiedCss = minifiedCss.replace("__", "")

    fs.writeFileSync(distCondensedCSS, minifiedCss, { flag: 'w' });
      
  
}


function buildCSS(condensedCSS, prefix="") {	

  
  log("buildCSS", styles.called, {prefix: prefix});

  const cssPaths = getCSSPaths("../../portfolio_need/styles/" + prefix);
  console.log("got css paths")

  

  cssPaths.forEach(function (cssPath) {
    if (fs.statSync(cssPath).isDirectory()) {
      return;
    }

    let cssFile = getCSSData(cssPath);

    fs.writeFileSync(condensedCSS,
      cssFile, { flag: 'a' });
  });


  log("buildCSS", styles.finished);
}

async function cleanCSS(cssToClean) {

  log("cleanCSS", styles.called);
  return await postcss([cssnano, autoprefixer])
      .process(cssToClean,  { from: undefined })
}

exports.cleanCSS = cleanCSS;
 

function getCSSData(css_path) {
  
  var css_data = fs.readFileSync(css_path, 'utf-8');

  //.replace(/\s/g, "")
  //.replace(/\n/g, "")
  //css_data = css_data ;
  
  return css_data;
}

/* gets all css file paths from the portfolio directory */
function getCSSPaths(startPath = '../../portfolio_need/styles') {

 

  var css_paths = [];

  if (startPath[0] == '.') {
    startPath = path.join(__dirname, startPath)
  }
  var css_directories = fs.readdirSync(startPath);

  for (var i = 0; i < css_directories.length; i++) {

    var css_directory_path = startPath + "/" + css_directories[i]; 
    if (fs.statSync(css_directory_path).isDirectory()) {
 
      css_paths = css_paths.concat(
        getCSSPaths(css_directory_path + '/'));
 

      continue;
    } 
    css_paths.push(css_directory_path);
  }
 

  return css_paths;


}
 
exports.getCSSPaths = getCSSPaths;
exports.getCSSData = getCSSData;
