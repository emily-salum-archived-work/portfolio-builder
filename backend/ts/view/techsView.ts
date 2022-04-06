import Controller from "../classes/controller.js";
import View from "../classes/view.js";

 

 

class TechsView extends View {



    techDisplays: TechDisplay[] = [];

    constructor(controller: Controller<TechsView>) {
        super(controller); 
    }

    techLogos: HTMLElement[];
    techNames: HTMLElement[];

    inicializeElements() {
        this.techLogos = Array.from(
            document.querySelectorAll(".techs__image"));

        this.techNames = Array.from(
            document.querySelectorAll(".techs__name"));
        this.buildTechObjects();
    }

    buildTechObjects() {

        this.techNames.forEach((techName) => {

            const nameOfTech = techName.getAttribute("tech-name") as string;

            let techLogo = this.getTechLogoFromName(nameOfTech);

            if(!techLogo) {
                throw new Error("Tech logo for " + nameOfTech +  " not found");
            }

            let techDisplay = new TechDisplay(techName, techLogo);
            this.techDisplays.push(techDisplay);

        });

    }

    listenForTechNameHover(mouseover: (techName: HTMLElement, techImage: HTMLElement) => any, 
            mouseout : (techName: HTMLElement, techImage: HTMLElement) => any) {


        this.techDisplays.forEach(
            (techDisplay) => {

                let techName = techDisplay.techName;
                let techImage = techDisplay.techImage;

                /* Currently the event llsteners return the elements themselves..
                  Is that okay in MVC? Think about that */
                techName.addEventListener("mouseover",
                    () => { mouseover(techName, techImage) });

                techName.addEventListener("mouseout",
                    () => { mouseout(techName, techImage) });
            });
    }

    getTechLogoFromName(techName: string): HTMLElement | null {

        for (let i = 0; i < this.techLogos.length; i++) {

            let techLogo = this.techLogos[i];

            let techLogoName = techLogo.getAttribute("tech");

            if (techLogoName === techName) {
                return techLogo
            }
        }


        return null;

    }


    selectTechImage(techImage: HTMLElement) {
        techImage.classList.remove("techs__image--unselected");
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

class TechDisplay {

    techName: HTMLElement;
    techImage: HTMLElement;

    constructor(nameElement: HTMLElement, imageElement: HTMLElement) {
        this.techName = nameElement;
        this.techImage = imageElement;
    }

}

export default TechsView;