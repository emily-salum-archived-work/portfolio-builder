

var minify = require('html-minifier').minify;

const fs = require('fs');

exports.updateHTML = function updateHTML(htmlToSave) {


    htmlToSave = minify(htmlToSave, {
        collapseWhitespace: true, // Removes all white space characters
        removeComments: true, // Removes all comments
        removeRedundantAttributes: true, // Removes all unnecessary attributes
        removeAttributeQuotes: true, // Removes unnecessary quotes
        removeTagWhitespace: true, // Removes all whitespace between tags
        trimCustomFragments: true, // Trims custom fragments
        useShortDoctype: true, // Uses short doctype
    });

    fs.writeFileSync("./dist/index.html", 
    htmlToSave, 'utf8');
}