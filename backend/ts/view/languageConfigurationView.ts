import Controller from "../classes/controller.js";
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";

 
class LanguageConfigurationView extends View {


    constructor(controller: Controller<LanguageConfigurationView>) {

        super(controller, "startedConfigurations");
        
    }

    @domInjector("#language-switch")
    languageSwitch: HTMLElement;

    @domInjector("#language-choice-select")
    languageSelect: HTMLSelectElement;

    inicializeElements() { }
    
    
    public getElementsToTranslate() {
        return Array.from(
            document.querySelectorAll("[to-translate]"));

    }

    public getToMoveElements() {
        return [this.languageSelect];
    }


    public changedLanguage(selectedLanguage: string, fastStyle=false) {

        if (fastStyle) {
            return;
        }


        this.languageSwitch.classList.remove(
            "system-configurations__language-switch--hidden");

        const selectedCase: HTMLElement = this.languageSwitch.querySelector(
            "#" + selectedLanguage + "-case") as HTMLElement; 


        setTimeout(() => {
            selectedCase.classList.add("system-configurations__switch-case--selected");
        },
            3500);
 
    }


}


export default LanguageConfigurationView;