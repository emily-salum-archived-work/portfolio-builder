
/* WORK IN PROGRESS: 

    Upon the construction of the document structure with ejs, 
    it may be interesting to take that data and put it inside a js file to 
    be added dinamically, instead of the static method currently employeed. This 
    idea is still in progress and may be considered irrelevant or inefficient at the end*/

    class ConstructedTemplate {

        constructor(templateName) {
            this.templateName = templateName;
        }
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
     