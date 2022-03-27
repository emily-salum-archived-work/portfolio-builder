
import ProjectFilesView from "../view/projectFilesView.js";

class ProjectFilesController {
    constructor() {
        this.projectFilesView = new ProjectFilesView(this);

    }


    buildProjectFiles() {

        this.projectFilesView.projectFiles.forEach(
            this.projectFilesView.setupProjectFile);



        this.projectFilesView.folderButtons.forEach((folderButton) => {
            folderButton.addEventListener("click",

                () => { 
                    this.projectFilesView.changeFilesSize(folderButton) }
            );
        })
    }

}


let projectFilesController = new ProjectFilesController();
projectFilesController.buildProjectFiles();
