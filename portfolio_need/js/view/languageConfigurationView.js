import View from "./view.js";



const LANGUAGE_SELECT_ID = "language-choice-select";
const LANGUAGE_SWITCH_ID = "language-switch";

export default class LanguageConfigurationView extends View {


    constructor(controller) {

        super(controller, "startedConfigurations");
        
    }

    inicializeElements() {
    
        this.languageSwitch = document.getElementById(LANGUAGE_SWITCH_ID);
        this.languageSelect = document.getElementById(LANGUAGE_SELECT_ID);
    
    }
    
    
    getElementsToTranslate() {
        return Array.from(
            document.querySelectorAll("[to-translate]"));

    }

    getToMoveElements() {
        return [this.languageSelect];
    }


    changedLanguage(selectedLanguage, fastStyle=false) {



        if (fastStyle) {
            return;
        }


        this.languageSwitch.classList.remove(
            "system-configurations__language-switch--hidden");

        const selectedCase = this.languageSwitch.querySelector(
            "#" + selectedLanguage + "-case");


        setTimeout(() => {
            selectedCase.classList.add("system-configurations__switch-case--selected");
        },
            3500);
 
    }


}