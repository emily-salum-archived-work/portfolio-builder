
/* CURRENTLY DISCONTINUED

    possible recovery -> learn more about gzip compression and use this file
    to take advantage of it.
    otherwise, delete this file.

    Modifies HTMTL - CSS - JS 

    Step 1: Replaces the first name (group) with a shorter version of it
        Ex: projects__list -> pjs__list
    Step 2: Removes "__" from the class names
        Ex: pjs__list -> pjslist
    
*/

const { getCSS, saveCSS } = require("../cssLoader");
const { getHTML, saveHTML } = require("../htmlConstructor/htmlLoader");
const { getJS, saveJS } = require("../jsConstructor/jsLoader");



let htmlGetClassRegex = /<[^>]+?\s?class\s?=\s?"?([^"].+?)[">]/g


let getInfoFromClassRegex = /(\w.+)__(\w.+)/;


/* Call it only when sending to production, this one is kinda heavy */
async function shortenStyles() {
    let css = await getCSS();
    let js = await getJS();
    let html = await getHTML();

    [html, css, js] = cleanClassesFromContent(html, css, js);


    saveCSS(css);
    saveJS(js);
    saveHTML(html);
}


/* Receives content from all files */
function cleanClassesFromContent(html, css, js) {
 
    let result;

    
    let htmlClasses = [];

    let regex = new RegExp(htmlGetClassRegex); 
    result = regex.exec(html);
    
    while (result) {
        
        htmlClasses.push(...result[1].split(" ")); 
        result = regex.exec(html);
    }

    htmlClasses = [...new Set(htmlClasses)];

 
    let groups = [];

    htmlClasses.forEach((htmlClass) => {

        let regexResult = getInfoFromClassRegex.exec(htmlClass);

        if(!regexResult) {
            return;
        }

        let group = regexResult[1];

        if (groups.indexOf(group) === -1) {

            groups.push(group);

        }

    });

    console.log(groups);
 

    let groupAbbreviations = {};


    let letter = 65;



    let commonStringsInHTML = ["div", "class", "id", "h2","to-translate", "section", 
                     "link", "rel", "h3"];

    groups.forEach((group) => {
             
            let groupAbbreviation = commonStringsInHTML.pop();
            letter++;
            groupAbbreviations[group] = groupAbbreviation;
    
    });

    console.log(groupAbbreviations);
 
    Object.entries(groupAbbreviations).forEach(([group, groupAbbreviation]) => {
            
            let groupRegex = new RegExp(
                
                group + '__', "g");

            html = html.replace(groupRegex, groupAbbreviation);
    
            css = css.replace(groupRegex, groupAbbreviation);
    
            js = js.replace(groupRegex, groupAbbreviation);
    
        });

    return [html, css, js];
}
 

exports.shortenStyles = shortenStyles;