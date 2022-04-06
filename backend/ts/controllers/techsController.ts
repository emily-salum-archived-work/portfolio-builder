import Tech from "../models/techModel.js";
import TechsView from "../view/techsView.js"; 
import Controller from "../classes/controller.js";

class TechController extends Controller<TechsView> {

    techs: Array<Tech>;
    constructor() {

        super(TechsView, 2000); 

        this.techs = []

    }

    startBehaviour() {
        techController.buildTechObjects()
        techController.listenForTechHover()
    }

    buildTechObjects() {

        this.view.techNames.forEach((techName) => {

            const nameOfTech = techName.getAttribute("tech-name") as string | undefined;

            if(!nameOfTech) {
                throw new Error("nameOfTech (String) not found in techName (element)");
            }

            let tech = new Tech(nameOfTech);
            this.techs.push(tech);

        });

    }

    onTechNameOver(_techName: HTMLElement, techImage: HTMLElement) {

        this.view.unselectTechs(); 
        this.view.selectTechImage(techImage);
    }

    onTechNameOut(_techName: HTMLElement, _techImage: HTMLElement) {
        this.view.removeUnselectFromTechLogos();
    }


    listenForTechHover() {


        this.view.listenForTechNameHover(
            this.onTechNameOver.bind(this),
            this.onTechNameOut.bind(this));


    }


}


let techController = new TechController();
