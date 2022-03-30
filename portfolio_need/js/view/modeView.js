

import View from "./view.js";

 

export default class ModeView extends View {

    inicializeElements() {

        this.changeModeButton = document.getElementById("change-mode_button");
        this.coverScreen = document.querySelector(".screen-cover");

    
    }


    setCoverScreenMode(mode) {
        console.log("Adding screen-cover--" + mode);
        this.coverScreen.classList.add("screen-cover--" + mode);
       
    }

    removeCoverScreenMode(mode) {
        console.log("Removing screen-cover--" + mode);
        this.coverScreen.classList.remove("screen-cover--" + mode);
       
    }

    applyLoadingMode() {

        this.setCoverScreenMode("loading");
         
        
        let loadingTitle =  this.createLoadingTitle();
        
        document.body.appendChild(loadingTitle);


        setTimeout(()=>{
    
    
            loadingTitle.classList.add("loading__title--loaded");

            setTimeout(() => {

                loadingTitle.remove();
                this.setCoverScreenMode("loaded"); 
                setTimeout(()=>{ 
                this.removeCoverScreenMode("loading");}, 3000)
                 
            }, 2000);
    
        }
            , 1000)
    }



    createLoadingTitle() {
        let loadingTitle = document.createElement('h2');
        loadingTitle.innerHTML = 'Building Portfolio.exe'
        loadingTitle.classList.add("loading__title");

        return loadingTitle;
    }

    applyLightMode() {
        document.body.classList.toggle("body--light-mode");
    }

    changeUnfocus(doUnfocus) {

        if (doUnfocus) {
            this.setCoverScreenMode("unfocus"); 
            return;
        }

        this.removeCoverScreenMode("unfocus"); 


    }


}