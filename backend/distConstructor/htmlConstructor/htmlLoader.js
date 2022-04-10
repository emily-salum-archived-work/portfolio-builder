
/*  Builds HTML

    1- Minifies it
    2- Adds essential css inlining. 

*/


var minify = require('html-minifier').minify; 
const fs = require('fs');
const path = require('path');
const { getCSSPaths, getCSSData, cleanCSS } = require('../cssConstructor/cssLoader'); 
const {log, styles} = require("../../utils/logger.js");
const { deleteFile } = require("../../utils/fileControl");
const { getHtmlToSave } = require('../../builder_pages/ejsLoader');
//const { needsHTMLInsert } = require('../jsConstructor/jsLoader'); 



const distPath = path.join(__dirname,  "../../../dist/")


exports.updateHTML = function updateHTML() { 

    let htmlToSave = getHtmlToSave();
    log("updateHTML", styles.called);
 
   
    const htmlPath = distPath + "index.html";

    deleteFile(htmlPath);
 
    htmlToSave = htmlToSave.replace(/<!--ECSS-->/, '!ECSS')

    

    htmlToSave = minifyHTML(htmlToSave);
    //htmlToSave = passConstructedTemplatesToJS(htmlToSave);

    getEssentialCSS().then(function (css) {


        htmlToSave = htmlToSave.replace("!ECSS", `<style>${css}</style>`);

        log("loaded essential css", styles.progress);
 
        let html = htmlToSave.replace(/portfolio_need/g, ".");
        
        saveHTML(html);
    
        log("updateHTML", styles.finished);        
       


    })
 

}


function minifyHTML(htmlToSave) {

    return minify(htmlToSave, {
        collapseWhitespace: true, // Removes all white space characters
        removeComments: true, // Removes all comments
        removeRedundantAttributes: true, // Removes all unnecessary attributes
        removeAttributeQuotes: true, // Removes unnecessary quotes
        removeTagWhitespace: true, // Removes all whitespace between tags
        trimCustomFragments: true, // Trims custom fragments
        useShortDoctype: true, // Uses short doctype
    });
}


/* Uses the imported methods from cssLoader to get the files inside "essentials"
    Those styles have a high render priority, and should come within the html */
function getEssentialCSS() {


    return new Promise(function (resolve, reject) {

        let css = ""
        
        let essentialCSSPaths = getCSSPaths("../../../portfolio_need/styles/essentials");

        essentialCSSPaths.forEach(function (cssPath) {

            if (fs.statSync(cssPath).isDirectory()) {
                return;
            }
            css += getCSSData(cssPath);
        });

        cleanCSS(css).then(function (css) {

            resolve(css);
        })


    });
}

 


async function getHTML() {
    
        let html = await fs.readFileSync(distPath + "index.html", 'utf8');
        return html;
}
exports.getHTML = getHTML;


function saveHTML(html) {
    
    const htmlPath = distPath + "index.html";

    fs.writeFileSync(htmlPath,
        html, 'utf8');
}
exports.saveHTML = saveHTML;