class Controller {
    constructor(viewClass, waitTime = 0) {
        this.view = new viewClass(this);
        setTimeout(() => {
            this.startBehaviour();
        }, waitTime);
    }
}
export default Controller;
