



export class TechsView {


    constructor(controller) {
                
     this.techsController = controller;
     
     this.techLogos = Array.from(
        document.querySelectorAll(".techs__image"));
    
     this.techNames = Array.from(
            document.querySelectorAll(".techs__name"));
        
    }

    listenForTechHover(techName, mouseover, mouseout) {

        techName.addEventListener("mouseover", mouseover);
    
        techName.addEventListener("mouseout", mouseout);

    }

    getTechLogoFromName(techName) {
    
        for(let i = 0; i < this.techLogos.length; i++) {
        
            let techLogo = this.techLogos[i];
    
            let techLogoName = techLogo.getAttribute("tech");
    
            if(techLogoName === techName) { 
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