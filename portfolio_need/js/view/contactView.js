
import View from "./view.js";

export default class ContactView extends View {


    constructor(controller) {

        super(controller);

        this.contactFormSubmitListeners = [];

        this.contactForm.addEventListener("submit", (event) => {

            console.log("contactForm.addEventListener");
            event.preventDefault();

            const submitInfo = this.getSubmitInfo();

            this.contactFormSubmitListeners.forEach((listener) => {
                listener(event, submitInfo);
            })
        });

    }


    inicializeElements() {
        this.contactFormBox = document.getElementById("contact-form-box")

        this.contactForm = document.getElementById("contact-form");

        this.inputs = Array.from(
            this.contactForm.querySelectorAll(".contacts__element"));



    }

    listenForContactForm(onSubmit) {

        console.log("listenForContactForm");

        this.contactFormSubmitListeners.push(onSubmit);

    }

    emailSent() {

        this.contactFormBox.classList.add("contacts--closed");

    }

    getSubmitInfo() {
        const submitInfo = {};

        this.inputs.forEach((input) => {
            submitInfo[input.getAttribute("name")] = input.value;
        })

        return submitInfo;
    }

}