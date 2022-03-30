

var fs = require('fs');
const fse = require('fs-extra');
const compressor = require('node-minify');
const path = require('path');

exports.minifyJS = function minifyJS() {
    fs.promises.readFile(__dirname +
        "/../../../portfolio_need/js/controllers/contactController.js", 
    "utf8").then(
   
    (data)=> {  
        
       
     
    }    
   );

   const pathToJS = "./portfolio_need/js/"
 

   fse.copySync(pathToJS, "./dist/js/",{ overwrite: true }, function (err) {
    if (err) {                 
      console.error(err);       // add if you want to replace existing folder or file with same name
    } else {
      console.log("success!");
    }
  });


  walk("./dist/js/", (err, results)=> {
     

    results.forEach(file => {
        if (file.endsWith(".js")) {
            compressor.minify({
                compressor: 'uglify-es',
                input: file,
                output: file,
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        beautify: false
                    }
                }
            }, (err, min) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("minified");
                }
            });
        }
    })
  })



}


function walk (dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          } else {
            results.push(file);
            next();
          }
        });
      })();
    });
  };