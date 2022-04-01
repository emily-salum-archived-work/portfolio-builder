import ModeView from "../view/modeView.js";
import mainController from "../classes/mainController.js";
import Controller from "../classes/controller.js";


class ModeController extends Controller<ModeView> {

    constructor() {
        super(ModeView); 
 
    }

    startBehaviour() {

        this.listenMode();
    }

    listenMode() {

        
        mainController.mainEventController.on("headerChangedState", 
        (headerState: boolean) => {
            this.view.changeUnfocus(headerState);
        });

        console.log("Going to apply loading mode in screen cover")
        this.view.applyLoadingMode();

        mainController.mainEventController.on(
            "startedConfigurations", ()=>{
            {}});
   
        /*if (this.view.changeModeButton) {

            this.view.changeModeButton.addEventListener("click", () => {

                this.view.applyLightMode();
            });
        }*/
    }
}


new ModeController();