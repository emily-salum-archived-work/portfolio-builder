

const OPENED_HEADER = "header--opened";
const CLOSED_HEADER = "header--closed";
const HEADER_ID = "header";

/* todo: class for controlling coverScreen? */
 
 
import View from "./view.js";

export default class HeaderView extends View {



    constructor(controller) {

        super(controller);
    }

   
    inicializeElements() { 
        this.header = document.getElementById(HEADER_ID);
        console.log("headerView.inicializeElements");
    }

    clickHeader(event) {

        let element = event.target;
        
        let hasHeaderOrigin = element.id === 'header' || this.header.contains(element);
        if(!hasHeaderOrigin) {
            this.closeHeader();
            return;
        }
    
        this.openHeader();
    }


    headerIsOpen() {
        return this.header.classList.contains(OPENED_HEADER);
    }

    changeHeaderState() {

        this.header.classList.toggle(CLOSED_HEADER);
        this.header.classList.toggle(OPENED_HEADER);
    }
     
    
    closeHeader() {
       
        
        let open = this.headerIsOpen(); 
        this.header.classList.add(CLOSED_HEADER);
        this.header.classList.remove(OPENED_HEADER);
 
        return open != this.headerIsOpen();
    }
    
    openHeader() {
     
        this.header.classList.add(OPENED_HEADER);
        this.header.classList.remove(CLOSED_HEADER);
      
    }
} 


