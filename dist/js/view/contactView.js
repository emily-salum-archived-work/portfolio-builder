import View from"./view.js";export default class ContactView extends View{constructor(t){super(t),this.contactFormSubmitListeners=[],this.contactForm.addEventListener("submit",t=>{console.log("contactForm.addEventListener"),t.preventDefault();const o=this.getSubmitInfo();this.contactFormSubmitListeners.forEach(e=>{e(t,o)})})}inicializeElements(){this.contactFormBox=document.getElementById("contact-form-box"),this.contactForm=document.getElementById("contact-form"),this.inputs=Array.from(this.contactForm.querySelectorAll(".contacts__element"))}listenForContactForm(t){console.log("listenForContactForm"),this.contactFormSubmitListeners.push(t)}emailSent(){this.contactFormBox.classList.add("contacts--closed")}getSubmitInfo(){const t={};return this.inputs.forEach(o=>{t[o.getAttribute("name")]=o.value}),t}};