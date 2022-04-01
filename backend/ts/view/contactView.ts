import Controller from "../classes/controller.js";
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";

class ContactView extends View {

    public contactFormSubmitListeners: Array<Function>;

    constructor(controller: Controller<ContactView>) {

        super(controller);

        this.contactFormSubmitListeners = [];



    }

    @domInjector("#contact-form-box")
    contactFormBox: HTMLElement;

    @domInjector("#contact-form")
    contactForm: HTMLFormElement;


    inputs: Array<HTMLInputElement>;


    inicializeElements() {
      
        this.contactForm.addEventListener("submit", (event) => {

            console.log("contactForm.addEventListener");
            event.preventDefault();

            const submitInfo = new FormData(this.contactForm);

            this.contactFormSubmitListeners.forEach((listener) => {
                listener(event, submitInfo);
            })
        });

        this.inputs = Array.from(
            this.contactForm.querySelectorAll(".contacts__element"));



    }

    listenForContactForm(onSubmit: (event: Event, submitInfo: FormData)=> any): void {

        console.log("listenForContactForm");

        this.contactFormSubmitListeners.push(onSubmit);

    }

    emailSent(): void {

        this.contactFormBox.classList.add("contacts--closed");

    }
 

}

export default ContactView;