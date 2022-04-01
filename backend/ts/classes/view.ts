import mainController from './mainController.js';
import Controller from './controller.js';


abstract class View {

    controller: Controller<View>;

    constructor(controller: Controller<View>, inicializeEvent: string | null = null) {
        
        this.controller = controller;
        this.inicializeEvent(inicializeEvent);

    }

    private inicializeEvent(inicializeEvent: string | null): void {

        if (inicializeEvent) {
            mainController.mainEventController.on(inicializeEvent, () => {
                this.inicializeElements();
            });
            return;
        }
 
        document.addEventListener('DOMContentLoaded', () => {
            this.inicializeElements();
        });

    }


    protected abstract inicializeElements(): void;

}

export default View;