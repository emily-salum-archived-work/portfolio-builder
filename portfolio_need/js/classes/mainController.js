import EventEmitter from '../helpers/eventEmitter.js';
class MainController {
    constructor() {
        this.mainEventController = new EventEmitter();
    }
}
const mainController = new MainController();
export default mainController;
