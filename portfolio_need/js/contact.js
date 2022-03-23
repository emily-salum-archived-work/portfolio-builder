
import languageLoad from "./systemConfigurations/languageLoad.js";

const translateWord = languageLoad.translateWord;

var popupDiv = null;

function makePopup(title, text) {

  title = translateWord(title);
  text = translateWord(text);

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


function validateEmail(emailAdress) {
  let regexEmail = /^\S+@\S+\.\S+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

const contactFormBox = document.getElementById("contact-form-box")

const contactForm = document.getElementById("contact-form");


function sendEmail(event) {

  event.preventDefault();




  const submitInfo = {};


  const inputs = Array.from(
    event.target.querySelectorAll(".contacts__element"));

  inputs.forEach((input) => {
    submitInfo[input.getAttribute("name")] = input.value;
  })


  if (!submitInfoValidated(submitInfo)) {

    return;
  }

  contactFormBox.classList.add("contacts--closed");


  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: contactForm.method,
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



function submitInfoValidated(submitInfo) {

  if (submitInfo['name'].length <= 3) {
    makePopup("name_problem", "short_name");
    return false;
  }

  if (!validateEmail(submitInfo['email'])) {
    makePopup("email_problem", "bad_email");
    return false;
  }


  return true;
}



contactForm.addEventListener("submit", sendEmail);
