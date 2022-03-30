

const fse = require('fs-extra');

exports.updateRes = function updateRes() {



    fse.copySync("./portfolio_need/res/", "./dist/res/",{ overwrite: true }, function (err) {
        if (err) {                 
          console.error(err);       // add if you want to replace existing folder or file with same name
        } else {
          console.log("success!");
        }
      });
}

