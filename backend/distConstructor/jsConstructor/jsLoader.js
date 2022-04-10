

var fs = require('fs');
const fse = require('fs-extra');
const compressor = require('node-minify');
const path = require('path');

const { log, styles } = require("../../utils/logger.js");
const { deleteFile, walk } = require("../../utils/fileControl");


let mainFolder = "../../../portfolio_need"; 

const compressedJSPath = path.join(__dirname, "../../../dist/js/compressed_js.js");
const portfolioNeedJSPath = path.join(__dirname, "../../../portfolio_need/js/compressed_js.js");


// special key to represent the file was recently written and needs HTML to be inserted on it.
// currently this doesnt do anything. read the end of htmlLoader to know more;
const needsHTMLInsert = ""
exports.needsHTMLInsert = needsHTMLInsert;

exports.minifyJS = function minifyJS() {


  log("minifyJS", styles.called);


  if(!fs.existsSync(portfolioNeedJSPath)){
      buildCondensedJS().then(()=> {
        doMinifyJS();
      });
      return;
  }
  
  doMinifyJS();


}

function doMinifyJS() {
  deleteFile(compressedJSPath)

  try {

    compressor.minify({
      compressor: "uglify-es",
      input: portfolioNeedJSPath,
      output: compressedJSPath,
      options: {
        compress: {
          pure_funcs: ['console.log'],
        },




        mangle: true,

        output: {
          beautify: false
        }
      },
      callback: minifiedJS
    });
  } catch (error) {
    log("minifyJS", styles.error, error);
  }


}

function minifiedJS(err, data) {
  if (err) {
    log("minifiedJS", styles.error, err);
    throw err;
  }

  log("minifiedJS", styles.called, { "result size": data.length });


  console.log("read file");

  let newData = data.replace(/portfolio_need/g, ".");



  finishWrittingJS(newData);

}

function finishWrittingJS(newData) {

  log("finishWrittingJS", styles.called);

  newData = needsHTMLInsert + newData;

  fs.writeFileSync(compressedJSPath,
    newData, "utf8")


  log("minifiedJS", styles.finished);
}


/* Reads js file, removes importing from the first lines of the file 
and removes exporting from last lines of the file 
  WARNING: The current implementation forces exports to be made in the bottom of the file, 
  and the file must have a single export statement. Thats the way the code is written in the
  current implementation of the portfolio, but this could be refactored perhaps.
*/
function getConcactanableJS(pathToJS) {

  let jsFile = fs.readFileSync(pathToJS, 'utf-8');

  let lines = jsFile.split("\n");


  let removedImporting = false;

  for (let i = 0; i < lines.length; i++) {

    let line = lines[i];

    if (line.replace(" ", "").startsWith("import")) {

      lines.splice(i, 1);
      removedImporting = true;
      i--;

    } else if (removedImporting) {
      break;
    }
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].replace(" ", "").startsWith("export")) {

      lines.splice(i, 1);
      break;
    }
  }

  return lines.join("\n");

}

 async function buildCondensedJS() {

  console.log("buildCondensedJS");

  let compressedJS = ""


  deleteFile(portfolioNeedJSPath)



  /* Condensed js file follows this order to allow for linear reading 
    (Dependencies always in top) */
  let renderOrder = ["helpers", "decorators",
    "classes", "models",
    "languages", "view", "controllers"];


  renderOrder.forEach(folder => {
    compressedJS = addJSFolderContentToCompressedJS(compressedJS, folder);
  })

  /*
    let compressedJSSplitByDecorate = compressedJS.split(decorateTSTranslation);
    
    log("compressed js decorate repetitions: " + compressedJSSplitByDecorate.length, styles.called);
    compressedJS = compressedJSSplitByDecorate[0] + compressedJSSplitByDecorate.slice(1).join("");
  */

  await saveJS(compressedJS, portfolioNeedJSPath);

  console.log("buildCondensedJS over ");

}

exports.buildCondensedJS = buildCondensedJS;


function addJSFolderContentToCompressedJS(compressedJS, folder) {
  console.log("folder ", folder);

  walk(path.join( __dirname,mainFolder) + "/js/" + folder, (err, results) => {
    results.forEach(file => {

      compressedJS += getConcactanableJS(file);

    })
  })
  
  return compressedJS;
}


async function getJS() {

  let jsFile = fs.readFileSync(compressedJSPath, 'utf-8');

  return jsFile;
}
exports.getJS = getJS;

function saveJS(js, path=compressedJSPath) {

  console.log("saveJS");
  fs.writeFileSync(path,
    js, { flag: 'w' });

}
exports.saveJS = saveJS;