    const ipc = require('electron').ipcRenderer;

    


const loadOptions = ["local"];

ipc.send("load_selected", "local");


loadOptions.forEach((option) => {
    
    
    let button = document.querySelector('#' + option + 'Button');

    button.addEventListener('click', () => {
    
        ipc.send("load_selected", option);
    
    });

})


 