import ContactView from"../view/contactView.js";import PopupView from"../view/popupView.js";class ContactController{constructor(){this.contactView=new ContactView(this)}sendEmail(t,e){if(this.submitInfoValidated(e)){this.contactView.emailSent();var o=new FormData(t.target);return fetch("https://formspree.io/f/mdobzrbv",{method:"POST",body:o,headers:{Accept:"application/json"}}).then(t=>{t.ok?PopupView.makePopup("email_sent","thank_you"):t.json().then(t=>{Object.hasOwn(t,"errors")&&PopupView.makePopup("oh_no","email_not_sent")})}).catch(t=>{PopupView.makePopup("oh_no","email_not_sent")}),!1}}submitInfoValidated(t){return t.name.length<3?(PopupView.makePopup("name_problem","short_name"),!1):!!this.validateEmail(t.email)||(PopupView.makePopup("email_problem","bad_email"),!1)}listenContacts(){this.contactView.listenForContactForm((t,e)=>{this.sendEmail(t,e)})}validateEmail(t){return!!t.match(/^\S+@\S+\.\S+$/)}}let contactController=new ContactController;contactController.listenContacts();