const ipc = require('electron').ipcRenderer;

ipc.on("init_update_github", (event, args) =>{


   sendButton  = document.querySelector('#commitButton'),
   closeButton = document.querySelector('#closeButton');
   loadAgainButton = document.querySelector("#loadAgainButton"); 

    document.addEventListener('keydown', (ev) => {

        if (ev.key == "z")
        {
            ipc.send("github_close");
        }

    });
    sendButton.addEventListener('click', () => {
        ipc.send("save_changes");
    }
    );
    
    loadAgainButton.addEventListener('click', () => {
        ipc.send("choose_loader_again");
    }
    );
    
    
    closeButton.addEventListener('click', () => {
        ipc.send("github_close");
    
    });

});
