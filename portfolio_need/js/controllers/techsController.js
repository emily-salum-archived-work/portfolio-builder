

import { Tech } from "../models/techModel.js";

import { TechsView } from "../view/techsView.js";

class TechController {


    constructor() {


        this.techsView = new TechsView(this);

        this.techs = []

    }

    buildTechObjects() {

        this.techsView.techNames.forEach((techName) => {

            const nameOfTech = techName.getAttribute("tech-name");

            let tech = new Tech(nameOfTech);
            this.techs.push(tech);

        });

    }

    onTechNameOver(_techName, techImage) {

        this.techsView.unselectTechs();
        techImage.classList.remove("techs__image--unselected");

    }

    onTechNameOut(_techName, _techImage) {
        this.techsView.removeUnselectFromTechLogos();
    }


    listenForTechHover() {

 
     this.techsView.listenForTechNameHover(
                this.onTechNameOver.bind(this),
                this.onTechNameOut.bind(this));
       

    }


}


let techController = new TechController();
techController.buildTechObjects()
techController.listenForTechHover()