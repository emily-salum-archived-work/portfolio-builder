

import ModeView from "../view/modeView.js";


import mainController from "./mainController.js";
class ModeController {

    constructor() {

        this.view = new ModeView(this);


        this.listenMode();
    }

    listenMode() {

        
        mainController.mainEventController.on("headerChangedState", 
        (headerState) => {
            this.view.changeUnfocus(headerState);
        });

        mainController.mainEventController.on(
            "startedConfigurations", ()=>{
            {
                console.log("Going to apply loading mode in screen cover")
                this.view.applyLoadingMode();
            }
        
        });
   
        if (this.view.changeModeButton) {

            this.view.changeModeButton.addEventListener("click", () => {

                this.view.applyLightMode();
            });
        }
    }
}


new ModeController();