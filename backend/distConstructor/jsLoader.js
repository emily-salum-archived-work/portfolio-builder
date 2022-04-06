

var fs = require('fs');
const fse = require('fs-extra');
const compressor = require('node-minify');
const path = require('path');

const {log, styles} = require("../utils/logger.js");
const { deleteFile } = require("../utils/fileControl");



//throw new Error('HTML INSERT')\n
const needsHTMLInsert = ""


exports.needsHTMLInsert = needsHTMLInsert;

exports.minifyJS = function minifyJS() {


  log("minifyJS", styles.called);

  const pathToJS = "./portfolio_need/js/"


  deleteFile(path.join(__dirname, "../../dist/js/compressed_js.js"))

  try {

    compressor.minify({
      compressor: "uglify-es",
      input: __dirname + '/../.' + pathToJS + "compressed_js.js",
      output: __dirname + "/../../dist/js/compressed_js.js",
      options: {
        compress: {
          pure_funcs: [ 'console.log' ],
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

  log("minifiedJS", styles.called, {"result size": data.length});
 

  console.log("read file");

  let newData = data.replace(/portfolio_need/g, ".");
 
  

  finishWrittingJS(newData);

}

function finishWrittingJS(newData) {
 
  
   
  newData =  needsHTMLInsert + newData;

  fs.writeFileSync(__dirname + "/../../dist/js/compressed_js.js",
    newData, "utf8")


  log("minifiedJS", styles.finished);
}


/* Reads js file, removes importing from the first lines of the file and removes exporting from last lines of the file */
function getConcactanableJS(pathToJS) {

  let jsFile = fs.readFileSync(pathToJS, 'utf-8');

  //return jsFile;
  let lines = jsFile.split("\n");

  /*console.log("lines length: " + lines.length);*/ 

  let removedImporting = false;

  for (let i = 0; i < lines.length; i++) {

    let line = lines[i];

    if (line.replace(" ", "").startsWith("import")) {

      lines.splice(i, 1);
      removedImporting = true;
      i--;
      /*console.log("removed import");*/
    } else if (removedImporting) {
      break;
    }
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].replace(" ", "").startsWith("export")) {

      lines.splice(i, 1);

      ///console.log("removed export");
      break;
    }
  }

  //console.log("lines length: " + lines.length);
  return lines.join("\n");

}

exports.buildCondensedJS = function buildCondensedJS() {


  let compressedJS = ""


  deleteFile(path.join(__dirname, "../../portfolio_need/js/compressed_js.js"))



  let renderOrder = ["helpers", "decorators",
    "classes", "models",
    "languages", "view", "controllers"];

  let mainFolder = "portfolio_need"
  renderOrder.forEach(folder => {




    walk("./" + mainFolder + "/js/" + folder, (err, results) => {


      results.forEach(file => {

        compressedJS += getConcactanableJS(file);

      }
      )


    })

  })

/*
  let compressedJSSplitByDecorate = compressedJS.split(decorateTSTranslation);
  
  log("compressed js decorate repetitions: " + compressedJSSplitByDecorate.length, styles.called);
  compressedJS = compressedJSSplitByDecorate[0] + compressedJSSplitByDecorate.slice(1).join("");
*/
  fs.writeFileSync("./" + mainFolder + "/js/compressed_js.js", compressedJS, { flag: 'w' });


}

function walk(dir, done) {
  var results = [];
  let list = fs.readdirSync(dir)


  var i = 0;
  (function next() {
    var file = list[i++];
    if (!file) return done(null, results);
    file = path.resolve(dir, file);
    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      walk(file, function (_err, res) {
        results = results.concat(res);
        next();
      });
    } else {
      results.push(file);
      next();
    }

  })();

};


 