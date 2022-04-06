import View from "../classes/view";
import domInjector from "../decorators/dom-injector";



class IntroductionView extends View {


    @domInjector(".introduction__name")
    private introductionName: HTMLElement;

    protected inicializeElements(): void {
    }


    public introductionNameAnimation() { 

        console.log("Introduction name animation");
        this.introductionName.classList.add("introduction__name--animation");
    
    }

}


export default IntroductionView;