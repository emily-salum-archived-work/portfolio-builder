import Controller from "../classes/controller";
import mainController from "../classes/mainController";
import CvView from "../view/cvView";




class CvController extends Controller<CvView> {


    constructor() {
        super(CvView, 0);
 
    }

    protected startBehaviour(): void {
        
        mainController.mainEventController.on("finishedConfigurations", ()=> {

            this.view.translateCv();
        });
    }


    
}

const cvController = new CvController();



