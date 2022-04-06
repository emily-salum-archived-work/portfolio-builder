import View from './view.js';	

/* To pass class in constructor */
export type Newable<T> = { new (...args: any[]): T; };


abstract class Controller<CView extends View> {
    
    protected view: CView;
 
    
    constructor(viewClass : Newable<CView>, waitTime: number = 0) {

        this.view = new viewClass(this);
         
        //document.addEventListener('DOMContentLoaded', () => {
        // Timeout was added to make sure that the imported resources are loaded before the controller is initialized
        setTimeout(() => {
            this.startBehaviour();
        }, waitTime);
       // });
    
    }   

    protected abstract startBehaviour(): void;  
}

export default Controller