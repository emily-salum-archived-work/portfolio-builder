
import mainController from '../controllers/mainController.js';


export default class View {


    constructor(controller, inicializeEvent) {
        this.controller = controller;

        if (inicializeEvent) {
            mainController.mainEventController.on(inicializeEvent, () => {
                this.inicializeElements();
            });
        } else {
            this.inicializeElements();
        }
    }


    inicializeElements() {


    }
}