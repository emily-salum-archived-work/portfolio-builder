import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";



class ModeView extends View {

    @domInjector("#change-mode_button")
    private changeModeButton: HTMLElement;

    @domInjector(".screen-cover")
    private coverScreen: HTMLElement;

    @domInjector("#loading-title")
    private loadingTitle: HTMLElement;

    @domInjector("#loading__binaries")
    private binaryTextDiv: HTMLElement;

    private binaryDanceListeners: Array<() => void> = [];

    @domInjector("#loading__bar")
    private loadingBar: HTMLElement;

    inicializeElements() { }

    public setCoverScreenMode(mode: string) {
        console.log("Adding screen-cover--" + mode);
        this.coverScreen.classList.add("screen-cover--" + mode);

    }

    public removeCoverScreenMode(mode: string) {
        console.log("Removing screen-cover--" + mode);
        this.coverScreen.classList.remove("screen-cover--" + mode);

    }

    public applyLoadingMode() {

        this.setCoverScreenMode("loading");
        //document.body.appendChild(this.loadingTitle); 

        console.log("Binary ammount: " + this.binaryAmmount);
        setTimeout(()=> {

            let animation = this.loadingBar.getAnimations()[0];


            console.log(animation); 

            if (animation.playState === "running") {
    
                this.loadingBar.addEventListener('animationend', () => {
                    console.log('Animation ended');
                    this.finishedLoading();
                });
            } else {
                this.finishedLoading();
            }
    

        }, 0)

        
    }


    public addListenerToFinishedBinaryDance(callback: () => void) {

        this.binaryDanceListeners.push(callback);
    }

    public applyLightMode() {
        document.body.classList.toggle("body--light-mode");
    }

    public changeUnfocus(doUnfocus: boolean) {

        if (doUnfocus) {
            this.setCoverScreenMode("unfocus");
            return;
        }

        this.removeCoverScreenMode("unfocus");


    }

    private finishedLoading() {


        setTimeout(() => {

            this.loadingTitle.classList.add("loading__title--loaded");

        }, 1000);

        this.makeBinaryDance();
        for (let i = 0; i < this.binaryCalls; i++) {
            setTimeout(this.makeBinaryDance.bind(this), 80 * i);
        }


        setTimeout(this.loadingTitleFinishedAnimation.bind(this), 1500);




    }


    private binaryAmmount: number = 6;
    private binaryCalls: number = 4;

    private makeBinaryDance() {



        let binaryTexts = [];
        for (let i = 0; i < this.binaryAmmount; i++) {


            let binaryText = this.makeBinaryText();
            binaryTexts.push(binaryText);

            binaryText.style.left = (i * 20) + Math.round(Math.random() * 25) + "%";
            binaryText.style.top = 105 + Math.floor(Math.random() * 30) + "%";

            binaryText.style.animationDuration = (Math.random() *1.2 + i / 2) + "s";
            this.binaryTextDiv.appendChild(binaryText);

        }


        this.binaryDanceStart(binaryTexts);

    }


    private makeBinaryText(): HTMLElement {

        let binaryText = document.createElement("p");
        binaryText.classList.add("loading__binary");
        let binaryTextContent = "";
        for (let j = 0; j < 16; j++) {
            binaryTextContent += Math.round(Math.random()) ? "1" : "0";
        }
        binaryText.innerHTML = binaryTextContent;
        return binaryText;
    }

    private binaryDanceStart(binaryTexts: Array<HTMLElement>) {

        if (binaryTexts.length === 0) {
            return;
        }

        let nextText = binaryTexts.splice(Math.round(Math.random() * binaryTexts.length) - 1, 1)[0];


        nextText.classList.add("loading__binary--animated");

        setTimeout(() => {
            this.binaryDanceStart(binaryTexts);
        }, Math.random() * 600);
    }

    private loadingTitleFinishedAnimation() {


        this.loadingTitle.remove();


        setTimeout(this.setCoverScreenMode.bind(this, "loaded"), 1000);

        setTimeout(() => {
            this.removeCoverScreenMode("loading");
            this.binaryTextDiv.remove();
            this.binaryDanceListeners.forEach(listener => listener());
        }, 3000);
    }



}

export default ModeView;