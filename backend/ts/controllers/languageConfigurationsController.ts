import configuration from '../models/systemConfigurationsModel.js';
import LanguageConfigurationView from "../view/languageConfigurationView.js";
import Controller from "../classes/controller.js";


class LanguageConfigurationsController extends Controller<LanguageConfigurationView> {


    constructor() {
        super(LanguageConfigurationView, 150);
 
    }

    startBehaviour() {
    
    }


    startedConfigurations() {
        this.view.inicializeElements();
    }

    getLanguage() {
        return this.view.languageSelect.value.toLowerCase()
    }
    
    loadLanguage(newSelectedLanguage: string, fastStyle = false) {


     
        configuration.setLanguage(newSelectedLanguage);


        this.setLanguage(fastStyle);

    }

    
    setLanguage(fastStyle: boolean) {


        this.view.changedLanguage(
           configuration.selectedLanguage, fastStyle);


        const toTranslateObjects = this.view.getElementsToTranslate();

        toTranslateObjects.forEach((element) => {

            let toTranslate =element.getAttribute("to-translate") as string | undefined;

            if(toTranslate !== undefined) {
                element.innerHTML = configuration.translateWord(toTranslate);
            }
               
        });
    }

}



const languageConfigurations = new LanguageConfigurationsController();

export default languageConfigurations