import EventEmitter from '../helpers/eventEmitter.js';
 
/* Proposal:
    Main Controller will have the responsability to make 
    communication between the different controllers and views easier*/
class MainController {

 
    mainEventController;

    constructor() { 
        this.mainEventController = new EventEmitter();

    }
}

const mainController = new MainController();

export default mainController;