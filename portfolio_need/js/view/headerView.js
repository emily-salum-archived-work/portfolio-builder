var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";
const OPENED_HEADER = "header--opened";
const CLOSED_HEADER = "header--closed";
class HeaderView extends View {
    constructor(controller) {
        super(controller);
    }
    inicializeElements() {
        console.log("headerView.inicializeElements");
    }
    clickHeader(event) {
        let element = event.target;
        let hasHeaderOrigin = element.id === 'header' || this.header.contains(element);
        if (!hasHeaderOrigin) {
            this.closeHeader();
            return;
        }
        this.openHeader();
    }
    headerIsOpen() {
        return this.header.classList.contains(OPENED_HEADER);
    }
    changeHeaderState() {
        this.header.classList.toggle(CLOSED_HEADER);
        this.header.classList.toggle(OPENED_HEADER);
    }
    closeHeader() {
        let open = this.headerIsOpen();
        this.header.classList.add(CLOSED_HEADER);
        this.header.classList.remove(OPENED_HEADER);
        return open != this.headerIsOpen();
    }
    openHeader() {
        this.header.classList.add(OPENED_HEADER);
        this.header.classList.remove(CLOSED_HEADER);
    }
}
__decorate([
    domInjector("#header")
], HeaderView.prototype, "header", void 0);
export default HeaderView;
