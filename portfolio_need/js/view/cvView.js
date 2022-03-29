

import configuration from "../models/systemConfigurationsModel.js";


import staticConfiguration from "../models/staticConfigurationsModel.js";

import mainController from "../controllers/mainController.js"
import View from "./view.js";

export class cvView extends View {

    inicializeElements() {
        this.cvSection = document.getElementById("cv");

       this.cvLink = this.cvSection.querySelector("#cv_link"); 


       mainController.mainEventController.on("finishedConfigurations", 
       ()=> {
            this.cvLink.setAttribute(
                "href",
                `${staticConfiguration.initialPath()}/res/cv/cv_${configuration.selectedLanguage}.pdf`)
       });
    }



}