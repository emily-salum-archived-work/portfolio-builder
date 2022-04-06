

var minify = require('html-minifier').minify;

const fs = require('fs');
const path = require('path');
const { getCSSPaths, getCSSData, cleanCSS } = require('./cssLoader');

const {log, styles} = require("../utils/logger.js");
const { deleteFile } = require("../utils/fileControl");
const { needsHTMLInsert } = require('./jsLoader');


class ConstructedTemplate {

    constructor(templateName) {
        this.templateName = templateName;
    }
}

const distPath = path.join(__dirname,  "../../dist/")

exports.updateHTML = function updateHTML(htmlToSave) { 
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
        fs.writeFileSync("./dist/index.html",
                html, 'utf8');
    
        log("updateHTML", styles.finished);        
       


    })
 

}


function passConstructedTemplatesToJS(htmlToSave) {
     


    let compressedJS = fs.readFileSync(distPath + "js/compressed_js.js", "utf8")


    if(!compressedJS.startsWith(needsHTMLInsert)) {
        return;
    }

    log("passConstructedTemplatesToJS", styles.called);

    compressedJS = compressedJS.replace(needsHTMLInsert, "")

    let templates = [new ConstructedTemplate("P")];
    for(let template of templates) {

        let name = template.templateName;
        let templateStart = htmlToSave.indexOf("<!--!" + name + "HTML-->")
        let templateEnd = htmlToSave.indexOf("<!--" + name + "HTML!-->")
        
        log("Template " + name, styles.progress, {"start": templateStart, "end": templateEnd});
        
        let templateHTML = htmlToSave.substring(templateStart, templateEnd)
        htmlToSave = htmlToSave.replace(templateHTML, "");
    compressedJS = compressedJS.replace('"!'+ name + 'Template"', "`" + templateHTML + "`");
    }
 
    fs.writeFileSync(distPath + "js/compressed_js.js", compressedJS);

    log("passConstructedTemplatesToJS", styles.finished);
    return htmlToSave;
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


function getEssentialCSS() {


    return new Promise(function (resolve, reject) {

        let css = ""
        
        let essentialCSSPaths = getCSSPaths("../../portfolio_need/styles/essentials");

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