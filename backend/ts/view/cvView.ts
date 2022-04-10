import configuration from "../models/systemConfigurationsModel.js";
import staticConfiguration from "../models/staticConfigurationsModel.js";
import mainController from "../classes/mainController.js"
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";

class CvView extends View {


    @domInjector("#cv")
    cvSection: HTMLElement;

    @domInjector("#cv_link")
    cvLink: HTMLElement;

    inicializeElements() { 
    }

    translateCv() {
        this.cvLink.setAttribute(
            "href",
            `${staticConfiguration.initialPath()}/res/others/cv/cv_${configuration.selectedLanguage}.pdf`)
    }



}


export default CvView;