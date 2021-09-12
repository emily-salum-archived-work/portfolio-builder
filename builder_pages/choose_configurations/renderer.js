const ipc = require('electron').ipcRenderer;

mockButton  = document.querySelector('#mockButton'),
projectsButton = document.querySelector('#projectsButton');


mockButton.addEventListener('click', () => {

    ipc.send("load_selected", "mock")

}
);


projectsButton.addEventListener('click', () => {

    ipc.send("load_selected", "projects")

}
);