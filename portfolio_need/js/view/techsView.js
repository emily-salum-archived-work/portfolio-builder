

class TechDisplay {

    constructor(nameElement, imageElement) {
        this.techName = nameElement;
        this.techImage = imageElement;
    }

}

import View from "./view.js";

export class TechsView extends View {


    constructor(controller) {

        super(controller);
        this.techDisplays = [];

        this.buildTechObjects();

    }

    inicializeElements() {
        this.techLogos = Array.from(
            document.querySelectorAll(".techs__image"));

        this.techNames = Array.from(
            document.querySelectorAll(".techs__name"));

    }

    buildTechObjects() {

        this.techNames.forEach((techName) => {

            const nameOfTech = techName.getAttribute("tech-name");

            let techLogo = this.getTechLogoFromName(nameOfTech);

            let techDisplay = new TechDisplay(techName, techLogo);
            this.techDisplays.push(techDisplay);

        });

    }

    listenForTechNameHover(mouseover, mouseout) {


        this.techDisplays.forEach(
            (techDisplay) => {

                let techName = techDisplay.techName;
                let techImage = techDisplay.techImage;

                techName.addEventListener("mouseover",
                    ()=>{mouseover(techName, techImage)});

                techName.addEventListener("mouseout",
                    ()=>{mouseout(techName, techImage)});
            });
    }

    getTechLogoFromName(techName) {

        for (let i = 0; i < this.techLogos.length; i++) {

            let techLogo = this.techLogos[i];

            let techLogoName = techLogo.getAttribute("tech");

            if (techLogoName === techName) {
                return techLogo
            }
        }

    }


    unselectTechs() {

        this.techLogos.forEach((techLogo) => {
            techLogo.classList.add("techs__image--unselected");
        });

    }

    removeUnselectFromTechLogos() {

        this.techLogos.forEach((techLogo) => {
            techLogo.classList.remove("techs__image--unselected");
        });

    }

}