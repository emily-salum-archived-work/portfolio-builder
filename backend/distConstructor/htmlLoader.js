

var minify = require('html-minifier').minify;

const fs = require('fs');
const { getCSSPaths, getCSSData, cleanCSS } = require('./css_loader');
 

exports.updateHTML = function updateHTML(htmlToSave) {
 

    try {
     
    fs.unlinkSync("./dist/index.html");   
    } catch (error) {
        
    }

    htmlToSave = htmlToSave.replace(/<!--ECSS-->/, '!ECSS')
    htmlToSave = minify(htmlToSave, {
        collapseWhitespace: true, // Removes all white space characters
        removeComments: true, // Removes all comments
        removeRedundantAttributes: true, // Removes all unnecessary attributes
        removeAttributeQuotes: true, // Removes unnecessary quotes
        removeTagWhitespace: true, // Removes all whitespace between tags
        trimCustomFragments: true, // Trims custom fragments
        useShortDoctype: true, // Uses short doctype
    });

    console.log("Writting to index dist");

    let css = ""
    getCSSPaths("../../portfolio_need/styles/essentials").forEach(function (cssPath) {
    
        if (fs.statSync(cssPath).isDirectory()) {
            return;
        }
        css += getCSSData(cssPath);
    });
    
    cleanCSS(css).then(function (css) {

        htmlToSave = htmlToSave.replace("!ECSS", `<style>${css}</style>`);


        //htmlToSave = htmlToSave.replace("__", "")

        let html = htmlToSave.replace(/portfolio_need/g, "."); 
        fs.writeFileSync("./dist/index.html", 
        html, 'utf8');

        })
}