 
import { ProfileField } from "../models/profile-field.js";
import { ProfileView } from "../view/profileView.js";

 


class ProfileController {


    constructor() {

        this.profileView = new ProfileView(this); 

         

        this.profileFieldObjects = []
    }


    buildProfile() {

        this.profileView.profileFields.forEach(field => {
            let newField = new ProfileField(field);
            this.profileFieldObjects.push(newField);
        });

    }

    listenProfileButton() {

       this.profileView.listenProfileButton(this.prettify.bind(this));

    }

    prettify() {

        this.prettifyProfile();
        this.profileView.hideRawElements();
        this.profileView.showHiddenFromRawElements();
    }


    addAgeToProfile() {

        const myAge = moment("26-11-2003", "DD-MM-YYYY").fromNow().substring(0, 2);
        
        let fieldElements = this.profileView.addFieldToProfile("age", myAge);
        
        let newProfile = new ProfileField(fieldElements.field, 
            fieldElements.fieldTitle, 
            fieldElements.fieldValue)
   
        this.profileFieldObjects.push(newProfile); 

    }


    

    prettifyProfile() {
        
        this.profileView.prettifyProfile();

        this.profileFieldObjects.forEach(field => {
             
            this.profileView.prettifyField(field.titleElement,
                 field.valueElement);

        });
    }
 
}

 

let profileController = new ProfileController();

profileController.addAgeToProfile();
profileController.buildProfile();
profileController.listenProfileButton();





