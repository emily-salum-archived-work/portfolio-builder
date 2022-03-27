

import headerController from "../controllers/header.js";



export default class ProjectFilesView {

    constructor(controller) {
        this.controller = controller;

        this.projectsBox = document.querySelector("#project-box");

        this.projectsFolderContainer = document.querySelector("#projects-buttons");

        this.folderButtons = Array.from(document.querySelectorAll("[folder]"));


        /* From folder, files (Anchors) used to link to projects */
        this.projectFiles = Array.from(
            this.projectsFolderContainer.querySelectorAll('a'));

    }

    markProjectAsSelected(project) {

        project.classList.remove("projects__project--selected");
        void project.offsetWidth;
        project.classList.add("projects__project--selected");

    }



    setupProjectFile(project_file) {
        const project = document.querySelector(`
    [project-name="${project_file.getAttribute("link-project-name")}"]`);


        project_file.addEventListener('click',
           ()=>{
            this.moveUserToProject(project)
           } );
    }


    /* Function that gets called when the file (project link) is clicked */
    moveUserToProject(project) {

        headerController.headerView.closeHeader();

        this.projectsBox.scrollLeft = project.offsetLeft - this.projectsBox.offsetLeft;
        project.scrollIntoView();

        this.headerView.markProjectAsSelected(project);


    }

  
 changeFilesSize(folderButton) {

    const folderContainer = folderButton.nextElementSibling;

    folderContainer.classList.toggle("header__folder--closed");

    var projectFiles = Array.from(folderContainer.querySelectorAll('a'));

    projectFiles.forEach((el) => {
        el.classList.toggle("header__file--opened");
        el.classList.toggle("header__file--closed");

    })


}



}