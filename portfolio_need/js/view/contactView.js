

export default class ContactView {


    constructor(controller) {

        this.contactFormBox = document.getElementById("contact-form-box")

        this.controller = controller;
        this.contactForm = document.getElementById("contact-form");

        this.inputs = Array.from(
            this.contactForm.querySelectorAll(".contacts__element"));
    }


    listenForContactForm(onSubmit) {

        this.contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const submitInfo = this.getSubmitInfo();

            onSubmit(event, submitInfo);
        });
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