var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";
class ContactView extends View {
    constructor(controller) {
        super(controller);
        this.contactFormSubmitListeners = [];
    }
    inicializeElements() {
        this.contactForm.addEventListener("submit", (event) => {
            console.log("contactForm.addEventListener");
            event.preventDefault();
            const submitInfo = new FormData(this.contactForm);
            this.contactFormSubmitListeners.forEach((listener) => {
                listener(event, submitInfo);
            });
        });
        this.inputs = Array.from(this.contactForm.querySelectorAll(".contacts__element"));
    }
    listenForContactForm(onSubmit) {
        console.log("listenForContactForm");
        this.contactFormSubmitListeners.push(onSubmit);
    }
    emailSent() {
        this.contactFormBox.classList.add("contacts--closed");
    }
}
__decorate([
    domInjector("#contact-form-box")
], ContactView.prototype, "contactFormBox", void 0);
__decorate([
    domInjector("#contact-form")
], ContactView.prototype, "contactForm", void 0);
export default ContactView;
