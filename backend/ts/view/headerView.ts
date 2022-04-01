import Controller from "../classes/controller.js";
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";

const OPENED_HEADER = "header--opened";
const CLOSED_HEADER = "header--closed";
 
  

class HeaderView extends View {



    constructor(controller: Controller<HeaderView>) {

        super(controller);
    }

    @domInjector("#header")
    header: HTMLElement;

    inicializeElements() { 
        console.log("headerView.inicializeElements");
    }

    clickHeader(event: Event) {

        let element: HTMLElement = event.target as HTMLElement;
        
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


export default HeaderView;