import HeaderView from "../view/headerView.js";
import mainController from "../classes/mainController.js"; 
import Controller from "../classes/controller.js";


class HeaderController  extends Controller<HeaderView> {

    constructor() {
        super(HeaderView);
        
    }

    startBehaviour() { 
        this.listenHeader();
    }

    listenHeader() {

        document.body.addEventListener("click",
            (event)=>{
                
                let headerState = this.view.headerIsOpen();
                this.view.clickHeader(event);
                let newHeaderState = this.view.headerIsOpen();
                
                let changedState = headerState != newHeaderState;

                if(changedState) {
                    
                    mainController.mainEventController.emit("headerChangedState", 
                    newHeaderState)
            
                }

            },
            true);
    }


    closeHeader() {
        
        let changedState = this.view.closeHeader();

        if(!changedState) {
            return;
        }
        mainController.mainEventController.emit("headerChangedState", 
        false)
    }
 
}



const headerController = new HeaderController();

 

export default headerController;