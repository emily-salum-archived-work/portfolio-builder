import mainController from './mainController.js';
class View {
    constructor(controller, inicializeEvent = undefined) {
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
        if (inicializeEvent === null) {
            return;
        }
        setTimeout(() => {
            this.inicializeElements();
        }, 0);
    }
}
export default View;
