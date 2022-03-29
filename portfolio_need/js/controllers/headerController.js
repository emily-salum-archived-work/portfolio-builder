
import HeaderView from "../view/headerView.js";


import mainController from "./mainController.js";
 

class HeaderController {



    constructor() {

        this.headerView = new HeaderView(this);


 

    }

    listenHeader() {

        document.body.addEventListener("click",
            (event)=>{
                
                let headerState = this.headerView.headerIsOpen();
                this.headerView.clickHeader(event);
                let newHeaderState = this.headerView.headerIsOpen();
                
                let changedState = headerState != newHeaderState;

                if(changedState) {
                    
                    mainController.mainEventController.emit("headerChangedState", 
                    newHeaderState)
            
                }

            },
            true);
    }


    closeHeader() {
        
        let changedState = this.headerView.closeHeader();

        if(!changedState) {
            return;
        }
        mainController.mainEventController.emit("headerChangedState", 
        false)
    }
 
}



const headerController = new HeaderController();

headerController.listenHeader();

export default headerController;