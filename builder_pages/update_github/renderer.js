const ipc = require('electron').ipcRenderer;

sendButton  = document.querySelector('#commitButton'),
closeButton = document.querySelector('#closeButton');


sendButton.addEventListener('click', () => {

    ipc.send("save_changes");

}
);


closeButton.addEventListener('click', () => {

    ipc.send("github_close");

}
);