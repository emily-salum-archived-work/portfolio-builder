import ProjectFilesView from "../view/projectFilesView.js"; 
import Controller from "../classes/controller.js";


class ProjectFilesController extends Controller<ProjectFilesView> {
    constructor() {
        super(ProjectFilesView); 

    }

    startBehaviour() {
        projectFilesController.buildProjectFiles();

    }

    buildProjectFiles() {

        this.view.projectFiles.forEach(
            (p)=>{this.view.setupProjectFile(p)});



        this.view.folderButtons.forEach((folderButton) => {
            folderButton.addEventListener("click",

                () => { 
                    this.view.changeFilesSize(folderButton) }
            );
        })
    }

}


let projectFilesController = new ProjectFilesController();
