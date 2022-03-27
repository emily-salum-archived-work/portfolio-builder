
import HeaderView from "../view/headerView.js";

class HeaderController {



    constructor() {

        this.headerView = new HeaderView(this);


 

    }

    listenHeader() {

        document.body.addEventListener("click",
            (event)=>{this.headerView.clickHeader(event)},
            true);
    }

 
}



const headerController = new HeaderController();

headerController.listenHeader();

export default headerController;