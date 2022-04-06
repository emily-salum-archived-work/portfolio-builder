
const { makeProject, save_images } = require("./helper_loader");
const { app } = require("electron");



class ProjectCreator {

    /**
     * 
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;

        projectLists[name] = []
    }

    /**
 * @param {String} nome 
 * @param {Object} links 
 * 
 */
    addProject(nome,  links) {
        projectLists[this.name].push(makeProject(nome,  this.name, links));
    }

}

 

var projectLists = {}

function loadProjects() {


    projectLists = {};

    const godotProjects = new ProjectCreator("godot");
    const frontStackProjects = new ProjectCreator("HTML, CSS, JS");
    const javaProjects = new ProjectCreator("java");



    /** C:\\Users\\user\\Desktop\\emily\\projects\\godot_projects\\HeartBeat\\md_res\\menu.png */
    godotProjects.addProject(
        "Heart Beat",
         {"open": "https://gotm.io/emilysalum/heart-beat"})



    frontStackProjects.addProject(
        "alura-barbearia",
         {"open": "https://emilymarquessalum.github.io/alura-barbearia/"})



    /**"https://i.ibb.co/vZBF0d3/Perfect-Seven-presentation-image.png" */
    javaProjects.addProject("Perfect Seven",
         {"watch": "https://www.youtube.com/embed/CWss5f941eA"});


    javaProjects.addProject("Crumb Hunt",
         {"watch": "https://www.youtube.com/embed/urmSuQsfpsE"})



    app.emit("project_lists_loaded", projectLists);


}

exports.loadProjects = loadProjects;
