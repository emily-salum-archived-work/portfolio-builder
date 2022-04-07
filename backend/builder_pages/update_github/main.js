let changes_sent = false;


const loader_main = require("../../builder_pages/choose_loader/main");


const { minifyJS } = require("../../distConstructor/jsLoader.js");
const { updateHTML } = require('../../distConstructor/htmlLoader.js');
const { updateRes } = require("../../distConstructor/resLoader.js");

const { log, logListeners, styles } = require("../../utils/logger.js");

const { app, BrowserWindow, ipcMain } = require('electron') 
const { updateCSS } = require('../../distConstructor/cssLoader');
const { loadEJSPortfolio, loadEJSListeners } = require('../ejsLoader.js');
let confirm_win;
var html_to_save;


/* Emits log to custom console */
function logEmit(message, style, extraInfo) {

    if (!confirm_win) {
        return;
    }
    confirm_win.webContents.send("log", message, style, extraInfo);
}


logListeners.push(logEmit);



function open_window(html) {
    html_to_save = html;


    if (!confirm_win) {
        startWindow();
    }

    confirm_win.loadURL(__dirname + "\\main.html").then(
        () => {

            setupOnEvents()


            confirm_win.webContents.send('init_update_github');

        });

}
exports.open_window = open_window;


function startWindow() {

    confirm_win = new BrowserWindow({
        width: 900,
        height: 520,
        webPreferences: {

            nodeIntegration: true, contextIsolation: false,
        }
    });
}

loadEJSListeners.push(open_window);



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


function updateAll() {

    updateRes();

    updateContent();

}


function updateContent() {

    minifyJS();
    updateHTML(html_to_save);
    updateCSS();
}

function sendChanges() {

    logEmit("Sending changes to github...");

     

    /* Paths to every file that will be added to the portfolio repository */
    let paths = getBuilderPaths([


        { // gets dist, extracts its contents to root
            "str": "dist", 
            "options": {
                "extract": true
            }
        },  

    ]);

    let args = '{"paths" : ' + JSON.stringify(paths) + '}';

    log("Built args", null, args);


    if (changes_sent) { return; }
    changes_sent = true;


    callGithubInit(args);
}


function callGithubInit(args) {

    let { PythonShell } = require('python-shell');
    
    const pythonPath = "C:\\Users\\user\\AppData\\Local\\Programs\\Python\\Python39\\python.exe";


    let options = {
        pythonPath: pythonPath,
        args: ["portfolio",
            args,
            true]
    };  


    const githubInitPath = "C:\\Users\\user\\Desktop\\emily\\projects\\@python_projects\\@Automation\\github_init\\togit\\github_args.py";

    PythonShell.run(githubInitPath, options, function (err, results) {
        if (err) {
            console.log(err);
            log("Error in github_init: " + err, styles.error);
            throw err;
        }
 
        log("github.py finished.");

        console.log(results);

        changes_sent = false;
    });

}

/* Events for buttons in control-interface */
function setupOnEvents() {
    ipcMain.on('send_changes', sendChanges);

    ipcMain.on("save_and_send_changes", () => {
        updateContent();
        sendChanges();
    });


    ipcMain.on("update_html_and_js", () => {

        updateHTML(html_to_save);
        minifyJS();

    });

    ipcMain.on("update_ejs", () => {


        if (loadEJSPortfolio) {
            loadEJSPortfolio();
            return;
        }

        log("Error: loadEJSPortfolio is not defined", styles.error);
    })

    ipcMain.on("update_all", updateAll);

    ipcMain.on("github_close", () => {
        confirm_win.close();
    });

    ipcMain.on("minify_js", () => {
        minifyJS();
        updatedJS = true
    });


    ipcMain.on("update_res", () => {
        updateRes();
        updatedRES = true;
    });


    ipcMain.on("update_html", (e, a) => {
        updateHTML(html_to_save);
    });

    ipcMain.on("update_css", (e, a) => {
        updateCSS();
    });


    ipcMain.on("choose_loader_again", () => {
        loader_main.open_window(win);
    })



}

