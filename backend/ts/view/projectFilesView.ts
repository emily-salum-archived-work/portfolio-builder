import headerController from "../controllers/headerController.js";
import View from "../classes/view.js";
import Controller from "../classes/controller.js";
import domInjector from "../decorators/dom-injector.js";



class ProjectFilesView extends View {

    constructor(controller: Controller<ProjectFilesView>) {
        super(controller);
    }

    @domInjector("#project-box")
    projectsBox: HTMLElement;

    @domInjector("#projects-buttons")
    projectsFolderContainer: HTMLElement;

    folderButtons: Array<HTMLElement>;
    projectFiles: Array<HTMLElement>;

    inicializeElements() {

         
        this.folderButtons = Array.from(document.querySelectorAll("[folder]"));


        /* From folder, files (Anchors) used to link to projects */
        this.projectFiles = Array.from(
            this.projectsFolderContainer.querySelectorAll('a'));

        console.log("projectFilesView.inicializeElements");
    }

    markProjectAsSelected(project: HTMLElement) {

        project.classList.remove("projects__project--selected");
        void project.offsetWidth;
        project.classList.add("projects__project--selected");

    }



    setupProjectFile(project_file: HTMLElement) {
        const project = document.querySelector(`
    [project-name="${project_file.getAttribute("link-project-name")}"]`) as HTMLElement | null;

        if (!project) {
            return;
        }

        project_file.addEventListener('click',
            () => {
                this.moveUserToProject(project)
            });
    }


    /* Function that gets called when the file (project link) is clicked */
    moveUserToProject(project: HTMLElement) {

        headerController.closeHeader();

        this.projectsBox.scrollLeft = project.offsetLeft - this.projectsBox.offsetLeft;
        project.scrollIntoView();

        this.markProjectAsSelected(project);


    }


    changeFilesSize(folderButton: HTMLElement) {

        const folderContainer = folderButton.nextElementSibling as HTMLElement;

        folderContainer.classList.toggle("header__folder--closed");

        var projectFiles = Array.from(folderContainer.querySelectorAll('a'));

        projectFiles.forEach((el) => {
            el.classList.toggle("header__file--opened");
            el.classList.toggle("header__file--closed");

        })


    }


    update() {	
    

        /*let projectBoxLocation = document.getElementById("project-box-location");
        
        if(!projectBoxLocation) {
            throw Error("projectBoxLocation not found");
        }
        
        projectBoxLocation.innerHTML = this.template();
    
        this.inicializeElements();*/
    }
    
    
    template(): string {
        return "!PTemplate";
    
    }



}

export default ProjectFilesView