import mainController from './mainController.js';
class View {
    constructor(controller, inicializeEvent = null) {
        this.controller = controller;
        this.inicializeEvent(inicializeEvent);
    }
    inicializeEvent(inicializeEvent) {
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
}
export default View;
