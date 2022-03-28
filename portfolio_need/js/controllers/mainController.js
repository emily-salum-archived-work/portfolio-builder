
const EventEmitter = require('events');


/* Proposal:
    Main Controller will have the responsability to make 
    communication between the different controllers and views easier*/
class MainController {


    constructor() {
        this.mainEventController = new EventEmitter();
    
    }



}

const controller = new MainController();

export default controller;