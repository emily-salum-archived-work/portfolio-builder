

var fs = require('fs');
const fse = require('fs-extra');
const compressor = require('node-minify'); 
const path = require('path');

exports.minifyJS = function minifyJS() {

  const pathToJS = "./portfolio_need/js/"


  try {
    fs.unlinkSync("./dist/js/compressed_js.js")
  } catch (e) {}


  compressor.minify({
    compressor: "babel-minify",
    input: __dirname+'/../.' + pathToJS + "compressed_js.js",
    output: __dirname+ "/../../dist/js/compressed_js.js",
    options: {
      compress: true,
      mangle: true,
      output: {
        beautify: false
      }
    },
    callback: function (err, min)   {
      if (err) {
        console.log(err);
        throw err;
      } else {
        console.log("minified");
      }
  
  
      let data = fs.readFileSync(__dirname +
        "/../../dist/js/compressed_js.js", 'utf-8') 
      
          console.log("read file");
  
          let newData = data.replace(/portfolio_need/g, ".");
  
          if(data == newData){
            console.log("no change");
          }
          else{ 
  
            console.log("changed");
          fs.writeFileSync(__dirname + "/../../dist/js/compressed_js.js",
            newData, "utf8")
  
          } 
  
  
  } 
  });

   



}



/* Reads js file, removes importing from the first lines of the file and removes exporting from last lines of the file */
function getConcactanableJS(pathToJS) {

  let jsFile = fs.readFileSync(pathToJS, 'utf-8');

  let lines = jsFile.split("\n");

  console.log("lines length: " + lines.length);

  let removedImporting = false;

  for (let i = 0; i < lines.length; i++) {

    let line = lines[i];

    if (line.replace(" ", "").startsWith("import")) {

      lines.splice(i, 1);
      removedImporting = true;
      i--;
      console.log("removed import");
    } else if(removedImporting){
      break;
    }
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].replace(" ", "").startsWith("export")) {

      lines.splice(i, 1);

      console.log("removed export");
      break;
    }
  }

  console.log("lines length: " + lines.length);
  return lines.join("\n");

}

exports.buildCondensedJS = function buildCondensedJS() {


  let compressedJS = ""

  try {
    fs.unlinkSync("./portfolio_need/js/compressed_js.js")
  } catch (e) {
    console.log(e);
  }

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