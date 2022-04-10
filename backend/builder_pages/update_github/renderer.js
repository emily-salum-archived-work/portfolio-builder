const ipc = require('electron').ipcRenderer;





const controlBoxes = document.querySelectorAll("[control-box]");

controlBoxes.forEach(
    (controlBox) => {

        const button = document.createElement("button");

        button.innerHTML = "Close " + controlBox.id + " column"

        button.classList.add("close-button");
        button.addEventListener("click", () => {
            controlBox.classList.toggle("closed");
            if (controlBox.classList.contains("closed")) {
                button.innerHTML = "Open " + controlBox.id + " column"
            } else {
                button.innerHTML = "Close " + controlBox.id + " column"
            }
        });
        controlBox.appendChild(button)
    })

const buttons = Array.from(
    document.querySelectorAll("button"));

buildButtons(buttons);
 
function buildButtons(buttons) {
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const button_id = e.target.id;
            ipc.send(button_id);
        });
    });
}


document.addEventListener('keydown', (ev) => {

    if (ev.key == "z") {
        ipc.send("github_close");
    }

});


console.log("Going to setup log event");
var logBox = document.getElementById("log-box");
 
ipc.on("log", (event, message, logStyle, extraInfo)=> {

    console.log(message);
    let log = buildLogText(message, logStyle);

    logBox.appendChild(log);    

    if (extraInfo) {
        buildLogExtra(extraInfo, log);
    }

    logBox.scrollTop = logBox.scrollHeight ;

})
 
function buildLogText(message, logStyle) {
    let log = document.createElement("p");
 
    log.innerHTML = message;
    log.classList.add("log")

    if (logStyle) {
        log.classList.add(logStyle.classCSS);
    }

    return log;
}

function buildLogExtra(extraInfo,  log) {
    let extra = document.createElement("p");
    extra.innerHTML = JSON.stringify(extraInfo);
    logBox.appendChild(extra);
    
    extra.style.display = "none";
    log.classList.add("log__extra");
    log.addEventListener("click", () => {
        let extraDisplay = extra.style.display;
        if (extraDisplay == "none") {
        extra.style.display = "block";
        } else {
            extra.style.display = "none";
        }
    });
}