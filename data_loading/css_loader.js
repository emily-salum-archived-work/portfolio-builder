

const fs = require("fs");

 

/* gets all css file paths from the portfolio directory */
exports.getCSSPaths = function getCSSPaths(startPath='./portfolio_need/styles') {


  /*  console.log("Going to read sP " + startPath);*/

    var css_paths = [];

    var css_directories = fs.readdirSync(startPath);

    for(var i = 0; i < css_directories.length; i++) {

        var css_directory_path = startPath + "/" + css_directories[i];
        console.log("Going to read nP " + css_directory_path);
        if(fs.statSync(css_directory_path).isDirectory()) {

            console.log("Directory. ");
            
            console.log("Calling with length " + css_paths.length);

            css_paths = css_paths.concat(getCSSPaths(css_directory_path + '/'));

            console.log("Back with length " + css_paths.length);

            
            continue;         
        }
        console.log("File ");
        css_paths.push(css_directory_path);
    }

    console.log("Returning with length " + css_paths.length);

    return css_paths;


}