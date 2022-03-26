let changes_sent = false;

const path = require('path');
const loader_main =   require("../../builder_pages/choose_loader/main");

const { app,BrowserWindow, ipcMain } = require('electron')
var fs = require('fs');
let confirm_win;
let html_to_save;

function open_window(html,win)
{
    html_to_save = html;
     confirm_win = new BrowserWindow({
        width: 300,
        height:250,
        resizable:false,
        webPreferences:{
             
             nodeIntegration: true,  contextIsolation: false,
        }
    });

    confirm_win.loadURL(__dirname + "\\main.html").then(
        () => {
 
            ipcMain.on('save_changes', send_changes);

            ipcMain.on("github_close", (e,a) => {
                confirm_win.close();
            });

            ipcMain.on("choose_loader_again", () => {loader_main.open_window(win);
            })
            


        confirm_win.webContents.send('init_update_github');    

  });

}
exports.open_window = open_window;




/* Receives an array and turns it into string-formatted version of it.  */
function stringifyArray(arr) {
    let str = "[";
    for (let i = 0; i < arr.length; i++) {

        let element = arr[i];
        
        if(typeof element === "object") {
            element = JSON.stringify(element);
        }
        str += element;
        if (i != arr.length - 1) {
            str += ",";
        }
    }
    str += "]";
    return str;
}


/* Receives an array of paths, returns an array with builderPath + path for each path; 
    if the path is an object, it adds to the attribute "str" of that object instead. */
function getBuilderPaths(initialPaths) {
    const builderPath = "C:/Users/user/Desktop/emily/projects/@site_projects/portfolio-builder/";

    let paths = [];
    for (let i = 0; i < initialPaths.length; i++) {
        let path = initialPaths[i];
        if (typeof path == "object") {
            path.str = builderPath + path.str;
            paths.push(path);
        } else {
            paths.push(builderPath + path);
        }
   
    }

    return paths;
}

function send_changes() 
{
    let {PythonShell} = require('python-shell');
    fs.writeFileSync("./index.html", html_to_save, 'utf8');
    

    const pythonPath = "C:\\Users\\user\\AppData\\Local\\Programs\\Python\\Python39\\python.exe";

 
    /* Paths to every file that will be added to the portfolio repository */
    let paths = getBuilderPaths([
        "index.html", 
    "bootstrap-5.1.0-dist", 
    "portfolio_need", 
    {"str": "README-PORTFOLIO.md", "replace": "README.md"},
    "READMESP"]);

    let args = '{"paths" : '+ JSON.stringify(paths) + '}';
 
    console.log(args);
 

    if (changes_sent){ return;}
    changes_sent = true;
    let options = {
        pythonPath: pythonPath,
        args: ["portfolio",
            args,
            true]
    };


    const githubInitPath = "C:\\Users\\user\\Desktop\\emily\\projects\\@python_projects\\@Automation\\github_init\\togit\\github_args.py";

    PythonShell.run(githubInitPath, options, function (err, results) {
        if (err)
            throw err;
        console.log('github.py finished.');
    });

}
  
