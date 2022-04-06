import ProjectFilesView from "../view/projectFilesView.js";
import Controller from "../classes/controller.js";
class ProjectFilesController extends Controller {
    constructor() {
        super(ProjectFilesView, 1000);
    }
    startBehaviour() {
        this.view.update();
        projectFilesController.buildProjectFiles();
    }
    buildProjectFiles() {
        this.view.projectFiles.forEach((p) => { this.view.setupProjectFile(p); });
        this.view.folderButtons.forEach((folderButton) => {
            folderButton.addEventListener("click", () => {
                this.view.changeFilesSize(folderButton);
            });
        });
    }
}
let projectFilesController = new ProjectFilesController();
