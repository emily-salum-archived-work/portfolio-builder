
const compress_images = require("compress-images")

const fse = require('fs-extra');
var nsg = require('node-sprite-generator');

const {log, styles} = require("../utils/logger.js");
/*const { deleteFile } = require("../utils/fileControl");
*/

exports.updateRes = function updateRes() {


/*

  nsg({
    src: [
      'portfolio_need/res/images/flags/*.png'
    ],
    spritePath: 'portfolio_need/res/images/flags/sprite.png',
    stylesheetPath: 'portfolio_need/res/images/flags/sprite.css',
  }, function (err) {
    if(err) {
      console.log(err);
      throw err
    }
    console.log('Sprite generated!');
  });
*/

  minifyRES();




}



function minifyRES() {


  fse.removeSync("./dist/res");
  compress_images('./portfolio_need/res/images/**/*.{png, svg}', './dist/res/images/',
    {},
    false,

    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50 --strip", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    }
    , (error, completed, total, t) => {
      if (error) {
        console.log(error);
      }
      console.log(`${completed} , ${total} , ${t}`);

    });


  fse.copySync("./portfolio_need/res/others/", "./dist/res/others/", { overwrite: true }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");
    }
  });

 
}