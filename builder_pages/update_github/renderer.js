const ipc = require('electron').ipcRenderer;

ipc.on("init_update_github", (event, args) =>{

    document.body.style.background = "#9f9060";


   sendButton  = document.querySelector('#commitButton'),
    closeButton = document.querySelector('#closeButton');
    
    
    sendButton.addEventListener('click', () => {
    
        ipc.send("save_changes");
    
    }
    );
    
    
    closeButton.addEventListener('click', () => {
        ipc.send("github_close");
    
    });

});
