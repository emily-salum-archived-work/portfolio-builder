
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
 * 
 * @param {String} nome 
 * @param {String} imagem 
 * @param {String} link 
 * @param {String} github
 * 
 */
    addProject(nome, imagem, link, github) {
        projectLists[this.name].push(makeProject(nome, imagem, this.name, link, github));
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
        "heart_beat",
        "https://raw.githubusercontent.com/emilymarquessalum/HeartBeat/main/md_res/heart_beat_presentation_image.png",
        
        
        
        "https://gotm.io/emilysalum/heart-beat")



    frontStackProjects.addProject(
        "barbearia_alura",
        "https://raw.githubusercontent.com/emilymarquessalum/alura-barbearia/main/readmeres/barbearia_alura_presentation_image.png",
        "https://emilymarquessalum.github.io/alura-barbearia/")


    javaProjects.addProject("Perfect Seven",
        "https://i.ibb.co/vZBF0d3/Perfect-Seven-presentation-image.png",
        "https://youtu.be/CWss5f941eA");

    javaProjects.addProject("Crumb Hunt",
        "https://raw.githubusercontent.com/emilymarquessalum/CrumbHunt/main/res/Crumb%20Hunt_presentation_image.png",
        "https://youtu.be/urmSuQsfpsE"
    )



    app.emit("project_lists_loaded", projectLists);


}

exports.loadProjects = loadProjects;
