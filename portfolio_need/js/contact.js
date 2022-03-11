


var popupDiv = null;

function makePopup(title, text) {

    if(popupDiv) {

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

    
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.classList.add("close_popup_button");
    closeButton.onclick =  function()  {popupDiv.remove();};
    popupDiv.appendChild(closeButton);


    document.body.appendChild(popupDiv);
}
 
function validateEmail (emailAdress)
{
  let regexEmail = /^\S+@\S+\.\S+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}
formBox = document.getElementById("contact-form-box")
                 
const form = document.getElementById("contact-form");
    

function sendEmail(event) { 

    event.preventDefault();
    sendButton = document.getElementById("send_email");

    sendButton.classList.add("powered");
    sendButton.innerHTML = "Sending...";

    
    let elements = form.getElementsByClassName("input-element");

    let message = 'So, \n';

    const submitInfo = {};

    for(element of elements)
    {
        const value = element.value;

        submitInfo[element.id] = value;

        message += `${element.id}: ${value} \n`;        
    }
    
    if(submitInfo['name'].length <= 3) {
        
        makePopup("Problem in name field!", "This name is too short!");
        return;
    }

    if(!validateEmail(submitInfo['email']))
    {
        makePopup("Problem in email field!", "Not a proper email!");
        return;
    }
    
    formBox.classList.add("closed_contact_top");
 

    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        makePopup("Email sent!", "Thank you for your time!");
       
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            makePopup("Oh no!", "A problem happened! Your email wasn't sent!");
          } 
             
          
        })
      }
    }).catch(error => {
      makePopup("Oh no!", "A problem happened! Your email wasn't sent!");
    });

        return false;
}

form.addEventListener("submit", sendEmail);