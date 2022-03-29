

import View from "./view.js";

 

export default class ModeView extends View {

    inicializeElements() {

        this.changeModeButton = document.getElementById("change-mode_button");
        this.coverScreen = document.querySelector(".screen-cover");

    
    }


    applyLoadingMode() {

        console.log("Adding screen-cover--loading")
        this.coverScreen.classList.add("screen-cover--loading");
        console.log(this.coverScreen.classList)
        
        let loadingTitle =  this.createLoadingTitle();
        
        document.body.appendChild(loadingTitle);


        setTimeout(()=>{
    
    
            loadingTitle.classList.add("loading__title--loaded");

            setTimeout(() => {

                loadingTitle.remove();
                this.coverScreen.classList.add("screen-cover--loaded");
    
            }, 2000);
    
        }
            , 1000)
    }



    createLoadingTitle() {
        let loadingTitle = document.createElement('h2');
        loadingTitle.innerHTML = 'Loading Portfolio.exe'
        loadingTitle.classList.add("loading__title");

        return loadingTitle;
    }

    applyLightMode() {
        document.body.classList.toggle("body--light-mode");
    }

    changeUnfocus(doUnfocus) {

        if (doUnfocus) {
            this.coverScreen.classList.add("screen-cover--unfocus");
            return;
        }

        this.coverScreen.classList.remove("screen-cover--unfocus");



    }


}