

import { Tech } from "../models/tech.js";

import { TechsView } from "../view/techsView.js";

class TechController {


    constructor() {


        this.techsView = new TechsView(this);

        this.techs = []

    }

    buildTechObjects() {

        this.techsView.techNames.forEach((techName) => {

            const nameOfTech = techName.getAttribute("tech-name");

            let techLogo = this.techsView.getTechLogoFromName(nameOfTech);

            let tech = new Tech(techName, techLogo);
            this.techs.push(tech);

        });

    }

    onTechNameOver(tech) {

        this.techsView.unselectTechs();
        tech.imageElement.classList.remove("techs__image--unselected");

    }

    onTechNameOut() {
        this.techsView.removeUnselectFromTechLogos();
    }


    listenForTechHover() {

        this.techs.forEach((tech) => {

            let techName = tech.nameElement

            this.techsView.listenForTechHover(techName,
                this.onTechNameOver.bind(this, tech),
                this.onTechNameOut.bind(this));
        });

    }


}


let techController = new TechController();
techController.buildTechObjects()
techController.listenForTechHover()