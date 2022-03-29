

import systemConfigurations from '../models/systemConfigurationsModel.js';
import languageConfigurations from './languageConfigurationsController.js';

import SystemConfigurationsView from '../view/systemConfigurationsView.js';

import mainController from './mainController.js';

class SystemConfigurationsController {

    constructor() {

        this.systemConfigurationsView = new SystemConfigurationsView(this);

        this.configurations = systemConfigurations;
    }


    buildSystemConfigurations() {

        let loadedConfigurations = this.attemptLoadConfigurations();

        if (!loadedConfigurations) {

            let systemConfigurationsHTML = this.systemConfigurationsView.template(this.configurations.getLanguageTranslations());
            
            let configurationsDiv = document.getElementById("configurations-div")

            configurationsDiv.innerHTML = systemConfigurationsHTML;
            
            

            mainController.mainEventController.emit("startedConfigurations");

            this.systemConfigurationsView.listenForm(
                (event)=>{this.submitConfigurations(event)});
        
             
        }

    }


    attemptLoadConfigurations() {

        const savedSelectedLanguage =
            sessionStorage.getItem("language") || localStorage.getItem("language");

        if (!savedSelectedLanguage) {
            return false;
        }

        window.addEventListener("load", () => {
            languageConfigurations.loadLanguage(savedSelectedLanguage, true);
            this.systemConfigurationsView.loadedConfigurations(true);

            mainController.mainEventController.emit("finishedConfigurations");

        });

        return true;
    }


    submitConfigurations(event) {



        let selectedLanguage = languageConfigurations.getLanguage();

        let saveConfigurationsSelect = this.systemConfigurationsView.configurationForm.querySelector(
            "#configuration-form-save-select");


        this.saveConfigurations(selectedLanguage,
            saveConfigurationsSelect);


        languageConfigurations.loadLanguage(selectedLanguage);

        this.systemConfigurationsView.loadedConfigurations(false);

        mainController.mainEventController.emit("finishedConfigurations");




    }
 

    saveConfigurations(selectedLanguage, saveConfigurationsSelect) {

        let saveOption = saveConfigurationsSelect.value;

        this.saveConfiguration("language", selectedLanguage, saveOption);

    }



    saveConfiguration(key, value, saveOption) {
        if (saveOption == "session") {
            sessionStorage.setItem(key, value);
            return;
        }

        if (saveOption == 'local') {
            localStorage.setItem(key, value);
            return;
        }
    }






}



const systemConfigurationsController = new SystemConfigurationsController();
systemConfigurationsController.buildSystemConfigurations();
