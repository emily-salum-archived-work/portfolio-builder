import mainController from './mainController.js';
import Controller from './controller.js';


abstract class View {

    controller: Controller<View>;

    constructor(controller: Controller<View>, inicializeEvent: string | undefined | null = undefined) {
        
        this.controller = controller;
        this.inicializeEvent(inicializeEvent);

    }

    private inicializeEvent(inicializeEvent: string | null | undefined): void {

        if (inicializeEvent) {
            mainController.mainEventController.on(inicializeEvent, () => {
                this.inicializeElements();
            });
            return;
        }

        if(inicializeEvent === null) {
            return;
        }
 
        setTimeout(() => {

        //document.addEventListener('DOMContentLoaded', () => {
            this.inicializeElements();
        //});

        }, 0);
    }


    protected abstract inicializeElements(): void;

}

export default View;