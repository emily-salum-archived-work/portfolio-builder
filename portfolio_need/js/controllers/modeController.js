import ModeView from "../view/modeView.js";
import mainController from "../classes/mainController.js";
import Controller from "../classes/controller.js";
import IntroductionView from "../view/introductionView.js";
class ModeController extends Controller {
    constructor() {
        super(ModeView, 0);
        this.hasControlOverConfigTag = true;
        this.introductionView = new IntroductionView(this);
    }
    startBehaviour() {
        this.listenMode();
    }
    listenMode() {
        this.onHeaderChange();
        console.log("Going to apply loading mode in screen cover");
        this.view.applyLoadingMode();
        this.view.addListenerToFinishedBinaryDance(() => {
            console.log("Finished binary dance");
            this.view.removeLoadingContent();
            if (this.hasControlOverConfigTag) {
                document.body.classList.remove("body--config");
                this.introductionView.introductionNameAnimation();
            }
            else {
                mainController.mainEventController.on('finishedConfigurations', () => {
                    setTimeout(() => {
                        this.introductionView.introductionNameAnimation();
                    }, 7000);
                });
            }
        });
        mainController.mainEventController.on("startedConfigurations", () => {
            this.hasControlOverConfigTag = false;
        });
    }
    onHeaderChange() {
        mainController.mainEventController.on("headerChangedState", (headerState) => {
            this.view.changeUnfocus(headerState);
        });
    }
}
new ModeController();
