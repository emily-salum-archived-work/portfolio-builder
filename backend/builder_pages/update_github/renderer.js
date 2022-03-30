const ipc = require('electron').ipcRenderer;


 


    const controlBoxes = document.querySelectorAll("[control-box]");

    controlBoxes.forEach(
        (controlBox) => {
            
            const button = document.createElement("button");

            button.innerHTML = "Close "+ controlBox.id + " column"

            button.classList.add("close-button");
            button.addEventListener("click", () => {
                controlBox.classList.toggle("closed");
                if(controlBox.classList.contains("closed")){
                    button.innerHTML = "Open "+ controlBox.id + " column"
                }else{
                    button.innerHTML = "Close "+ controlBox.id + " column"
                }
            });
            controlBox.appendChild(button)
        })

    const buttons =Array.from(
        document.querySelectorAll("button"));



   buttons.forEach(button => {
         button.addEventListener("click", (e) => {
                const button_id = e.target.id;
                ipc.send(button_id);
         });
        });
  
    document.addEventListener('keydown', (ev) => {

        if (ev.key == "z")
        {
            ipc.send("github_close");
        }

    });
    
    
     
 
