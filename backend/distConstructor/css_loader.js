




const fs = require("fs");

const path = require('path');


const postcss = require('postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')


/* Gets the list of paths of css files, reads those css files and
writes all their content to a new file, "condensed_css" */
exports.buildCondensedCSS = async function buildCondensedCSS() {

  const condensedCSS = path.join(__dirname,
    "../../portfolio_need/styles/condensed_css.css");


  /* Delete condensed_css file */
  try {
    console.log("gonna delete condensed css")
    fs.unlinkSync(condensedCSS);


  } catch (err) { }

  console.log("after trying to condense css")

  const cssPaths = getCSSPaths();
  console.log("got css paths")

  const condensedCSSExplanation = "/*\n WARNING \n This file is auto generated  \n  If you wish to look \n or modify the structure, look at the other files \n */ \n";


  fs.writeFileSync(
    condensedCSS,
    condensedCSSExplanation, { flag: 'a' });

  cssPaths.forEach(function (cssPath) {
    if (fs.statSync(cssPath).isDirectory()) {
      return;
    }

    let cssFile = getCSSData(cssPath);

    fs.writeFileSync(condensedCSS,
      cssFile, { flag: 'a' });
  });

 
    
}

exports.updateCSS =  async function updateCSS() {
  const condensedCSS = path.join(__dirname,
    "../../portfolio_need/styles/condensed_css.css");
  
  const distCondensedCSS = path.join(__dirname,
      "../../dist/styles/condensed_css.css");



      const output = await postcss([cssnano, autoprefixer])
      .process(fs.readFileSync(condensedCSS, 'utf-8'))
     
      const minifiedCss = output.css

    fs.writeFileSync(distCondensedCSS, minifiedCss, { flag: 'w' });
      
  
}

function getCSSData(css_path) {
  var css_data = fs.readFileSync(css_path, 'utf-8');

  //.replace(/\s/g, "")
  //.replace(/\n/g, "")
  //css_data = css_data ;
  return css_data;
}

/* gets all css file paths from the portfolio directory */
function getCSSPaths(startPath = '../../portfolio_need/styles') {


  /*  console.log("Going to read sP " + startPath);*/

  var css_paths = [];

  if (startPath[0] == '.') {
    startPath = path.join(__dirname, startPath)
  }
  var css_directories = fs.readdirSync(startPath);

  for (var i = 0; i < css_directories.length; i++) {

    var css_directory_path = startPath + "/" + css_directories[i];
    //  console.log("Going to read nP " + css_directory_path);
    if (fs.statSync(css_directory_path).isDirectory()) {

      //  console.log("Directory. ");

      // console.log("Calling with length " + css_paths.length);

      css_paths = css_paths.concat(
        getCSSPaths(css_directory_path + '/'));

      // console.log("Back with length " + css_paths.length);


      continue;
    }
    //console.log("File ");
    css_paths.push(css_directory_path);
  }

  //console.log("Returning with length " + css_paths.length);

  return css_paths;


}

exports.getCSSPaths = getCSSPaths;

