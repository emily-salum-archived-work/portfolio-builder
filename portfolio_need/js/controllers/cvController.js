import Controller from "../classes/controller";
import mainController from "../classes/mainController";
import CvView from "../view/cvView";
class CvController extends Controller {
    constructor() {
        super(CvView, 0);
    }
    startBehaviour() {
        mainController.mainEventController.on("finishedConfigurations", () => {
            this.view.translateCv();
        });
    }
}
const cvController = new CvController();
