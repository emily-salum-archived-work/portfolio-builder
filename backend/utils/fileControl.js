
const {log, styles} = require("./logger.js");

const fs = require("fs");
const path = require('path');

function deleteFile(path) {

  if (!fs.existsSync(path)) {
    console.log("deleteFile - file doesnt exist", path);
    return;
  }
    try {
        log("deleting file " + path);
        fs.unlinkSync(path);


    } catch (err) { console.log("file wasnt deleted, "+ path  ); }
}



exports.deleteFile = deleteFile;


/* Function that walks through the folder recursively untill there is no other file to be found,
 I copied it from stackoverflow
https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
*/
function walk(dir, done) {
    //log("walk", styles.called, {dir: dir});
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

  exports.walk = walk;