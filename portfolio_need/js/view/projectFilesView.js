var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import headerController from "../controllers/headerController.js";
import View from "../classes/view.js";
import domInjector from "../decorators/dom-injector.js";
class ProjectFilesView extends View {
    constructor(controller) {
        super(controller);
    }
    inicializeElements() {
        this.folderButtons = Array.from(document.querySelectorAll("[folder]"));
        this.projectFiles = Array.from(this.projectsFolderContainer.querySelectorAll('a'));
        console.log("projectFilesView.inicializeElements");
    }
    markProjectAsSelected(project) {
        project.classList.remove("projects__project--selected");
        void project.offsetWidth;
        project.classList.add("projects__project--selected");
    }
    setupProjectFile(project_file) {
        const project = document.querySelector(`
    [project-name="${project_file.getAttribute("link-project-name")}"]`);
        if (!project) {
            return;
        }
        project_file.addEventListener('click', () => {
            this.moveUserToProject(project);
        });
    }
    moveUserToProject(project) {
        headerController.closeHeader();
        this.projectsBox.scrollLeft = project.offsetLeft - this.projectsBox.offsetLeft;
        project.scrollIntoView();
        this.markProjectAsSelected(project);
    }
    changeFilesSize(folderButton) {
        const folderContainer = folderButton.nextElementSibling;
        folderContainer.classList.toggle("header__folder--closed");
        var projectFiles = Array.from(folderContainer.querySelectorAll('a'));
        projectFiles.forEach((el) => {
            el.classList.toggle("header__file--opened");
            el.classList.toggle("header__file--closed");
        });
    }
}
__decorate([
    domInjector("#project-box")
], ProjectFilesView.prototype, "projectsBox", void 0);
__decorate([
    domInjector("#projects-buttons")
], ProjectFilesView.prototype, "projectsFolderContainer", void 0);
export default ProjectFilesView;
