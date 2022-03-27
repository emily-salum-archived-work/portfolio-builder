


import systemConfigurations from '../models/systemConfigurationsModel.js';
import LanguageConfigurationView from "../view/languageConfigurationView.js";

class LanguageConfigurationsController {


    constructor() {
        this.languageConfigurationsView = new LanguageConfigurationView();
        this.configurations = systemConfigurations;
    }


    startedConfigurations() {
        this.languageConfigurationsView.inicializeElements();
    }

    getLanguage() {
        return this.languageConfigurationsView.languageSelect.value.toLowerCase()
    }
    
    loadLanguage(newSelectedLanguage, fastStyle = false) {


     
        this.configurations.setLanguage(newSelectedLanguage);


        this.setLanguage(fastStyle);

    }

    
    setLanguage(fastStyle) {


        this.languageConfigurationsView.changedLanguage(
            this.configurations.selectedLanguage, fastStyle);


        const toTranslateObjects = this.languageConfigurationsView.getElementsToTranslate();

        toTranslateObjects.forEach((element) => {

            element.innerHTML = this.configurations.translateWord(element.getAttribute(
                "to-translate"));

        });
    }

}



const languageConfigurations = new LanguageConfigurationsController();

export default languageConfigurations