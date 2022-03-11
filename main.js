const { app, BrowserWindow, ipcMain } = require('electron')
var fs = require('fs');
const ejse = require('ejs-electron')
var ejs  = require('ejs');
const path = require('path');
const github_main = require("./builder_pages/update_github/main");
const loader_main =   require("./builder_pages/choose_loader/main");
 

let win;

/* I decided that at the current moment, its not worth automating much of the process
of adding a new language. Currently, after putting the name in this array directly in code,
you must manually look for an icon image on google. For next versions, consider finding a better
way!  */
tech_list = ["python", 'java', 'javascript', 'godot'];

function createWindow () 
{

    win = new BrowserWindow({

        webPreferences:{
             preload: path.join(__dirname, "preload.js"),
             nodeIntegration: true,  contextIsolation: false,
        }
    });

      


  app.on("project_lists_loaded",
  (arg) => {
 
     inicialize_program(arg);    
 });
  
   loader_main.open_window(win);
  //  win.loadURL(__dirname + "/index.html");
    
   
  }
  app.whenReady().then(createWindow)    



  function getStuffILikeText(stuffILike) {
    let stuffILikeText = "";
    
    stuffILike.forEach((el) => {stuffILikeText += el + ", ";});
    stuffILikeText = stuffILikeText.substring(0, stuffILikeText.length - 2);

    stuffILikeText += "!";

    let lastItem = stuffILikeText.lastIndexOf(",")
    stuffILikeText = stuffILikeText.substring(0, lastItem) + " and" + stuffILikeText.substring(lastItem + 1, stuffILikeText.length);

    return stuffILikeText;
  }
  
  function stuffILikeString(stuffILike) {

    let likesString = "[";
    
    stuffILike.forEach((t) => {likesString += `"${t}",` });

    likesString = likesString.substring(0, likesString.length - 1) + "]";

    return likesString;
  }

  function getProfile() {

    const stuffILike =  ["Rpg", "automation", "classical music", "discord"];
    let stuffILikeText = getStuffILikeText(stuffILike);

    return {
  
      "From": {'raw': "COUNTRIES.Brazil", 'not_raw': "Brasil"},
      "Likes": {'raw': `${stuffILikeString(stuffILike)}`, "not_raw": stuffILikeText }  
       
    }
  }

  

  let firstTime = true;
  function inicialize_program(project_lists)
  {
      data = {
        'project_lists' : project_lists, 
        'tech_list': tech_list,
        'profile': getProfile(), 
         
      
      'root': __dirname}
  
      ejse.data('data', data)
  
      var portfolio_path = '/portfolio.ejs';

      var template = fs.readFileSync('.'+portfolio_path, 'utf-8');
      var html_to_save = ejs.render ( template , data );
      
  
      win.loadURL('file://' + __dirname + portfolio_path);
      
      if(firstTime)
      {
        firstTime = false;
        github_main.open_window(html_to_save,win);
      }
      


  }

