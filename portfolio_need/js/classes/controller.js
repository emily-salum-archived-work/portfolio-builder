class Controller {
    constructor(viewClass) {
        this.view = new viewClass(this);
        setTimeout(() => {
            this.startBehaviour();
        }, 0);
    }
}
export default Controller;
