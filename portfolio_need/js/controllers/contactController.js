 
import ContactView from "../view/contactView.js";
import PopupView from "../view/popupView.js";

class ContactController {



  constructor() {
 
    this.contactView = new ContactView(this);
  }




  sendEmail(event, submitInfo) {



    if (!this.submitInfoValidated(submitInfo)) {

      return;
    }


    this.contactView.emailSent();

    var data = new FormData(event.target);

    fetch("https://formspree.io/f/mdobzrbv", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        PopupView.makePopup("email_sent", "thank_you");

      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            PopupView.makePopup("oh_no", "email_not_sent");
          }


        })
      }
    }).catch(error => {
      PopupView.makePopup("oh_no", "email_not_sent");
    });

    return false;
  }



  submitInfoValidated(submitInfo) {

    if (submitInfo['name'].length < 3) {
      PopupView.makePopup("name_problem", "short_name");
      return false;
    }

    if (!this.validateEmail(submitInfo['email'])) {
      PopupView.makePopup("email_problem", "bad_email");
      return false;
    }


    return true;
  }


  listenContacts() {

    this.contactView.listenForContactForm(
      (event, submitInfo)=>{
        this.sendEmail(event, submitInfo)
      });

  }

  validateEmail(emailAdress) {
    let regexEmail = /^\S+@\S+\.\S+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

}


let contactController = new ContactController();
contactController.listenContacts(); 
