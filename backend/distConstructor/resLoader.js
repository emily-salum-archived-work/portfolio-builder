
const compress_images = require("compress-images")

const fse = require('fs-extra');

exports.updateRes = function updateRes() {

  
  compress_images('./portfolio_need/res/images/**/*.png', './dist/res/images/',  
    {}, 
    false, 
    
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    }
    , (error, completed, total, t) => { 
      if(error) {
        console.log(error);
      }
      console.log(`${completed} , ${total} , ${t}`);

    });

    
    fse.copySync("./portfolio_need/res/others/", "./dist/res/others/",{ overwrite: true }, function (err) {
        if (err) {                 
          console.error(err);       
        } else {
          console.log("success!");
        }
      });

    
}

