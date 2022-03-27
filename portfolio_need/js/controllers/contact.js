
import configuration from "../models/systemConfigurationsModel.js";
import ContactView from "../view/contactView.js";
 

var popupDiv = null;

function makePopup(title, text) {

  title = configuration.translateWord(title);
  text = configuration.translateWord(text);

  if (popupDiv) {

    popupDiv.remove();
    popupDiv = null;
  }

  popupDiv = document.createElement("div");

  popupDiv.classList.add("popup");

  const titleElement = document.createElement("h3");
  titleElement.innerHTML = title;
  popupDiv.appendChild(titleElement);

  const textElement = document.createElement("p");
  textElement.innerHTML = text;

  popupDiv.appendChild(textElement);


  document.body.appendChild(popupDiv);
}


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
  
    fetch(event.target.action, {
      method: this.contactView.contactForm.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        makePopup("email_sent", "thank_you");
  
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            makePopup("oh_no", "email_not_sent");
          }
  
  
        })
      }
    }).catch(error => {
      makePopup("oh_no", "email_not_sent");
    });
  
    return false;
  }
  
  
  
  submitInfoValidated(submitInfo) {
  
    if (submitInfo['name'].length < 3) {
      makePopup("name_problem", "short_name");
      return false;
    }
  
    if (!this.validateEmail(submitInfo['email'])) {
      makePopup("email_problem", "bad_email");
      return false;
    }
  
  
    return true;
  }
  
  
  listenContacts() {

    this.contactView.listenForContactForm(this.sendEmail.bind(this));
  
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
