import ProfileView from "../view/profileView.js"; 
import Controller from "../classes/controller.js";


class ProfileController extends Controller<ProfileView> {


    constructor() {
        super(ProfileView, 2000);
    }

    startBehaviour() {
        profileController.addAgeToProfile();
        profileController.buildProfile();
        profileController.listenProfileButton();
    }

    buildProfile() {

        this.view.buildProfileFields();
    }

    listenProfileButton() {

        this.view.listenProfileButton(this.prettify.bind(this));

    }

    prettify() {

        this.prettifyProfile();
        this.view.hideRawElements();
        this.view.showHiddenFromRawElements();
    }


    addAgeToProfile() {


        const now = new Date();


        const birthDate = new Date(2003, 11, 26);

        let myAge = now.getFullYear() - birthDate.getFullYear();
        
        const month = now.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && now.getDate() < birthDate.getDate())) {
            myAge--;
        }
 

        this.view.addFieldToProfile("age", myAge.toString(), null);


    }




    prettifyProfile() {

        this.view.prettifyProfile();


    }



}



let profileController = new ProfileController();

 