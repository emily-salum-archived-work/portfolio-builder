

 
const techNames = Array.from(
    document.querySelectorAll(".techs__name"));

const techLogos = Array.from(
    document.querySelectorAll(".techs__image"));



techNames.forEach((techName) => {

    
    techName.addEventListener("mouseover", () => {
        
        const nameOfTech = techName.getAttribute("tech-name");

        techLogos.forEach((techLogo) => {

            if(techLogo.getAttribute("tech") != nameOfTech) {
                techLogo.classList.add("techs__image--unselected");
            } else {
                techLogo.classList.remove("techs__image--unselected");
            }
        });

    });

    techName.addEventListener("mouseout", () => { 
        techLogos.forEach((techLogo) => {
            techLogo.classList.remove("techs__image--unselected");
        });
    });


});





