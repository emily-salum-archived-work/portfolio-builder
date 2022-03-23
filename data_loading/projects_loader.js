
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
 */
    addProject(nome, imagem, link) {
        projectLists[this.name].push(makeProject(nome, imagem, this.name, link));
    }

}

 

var projectLists = {}

function loadProjects() {


    projectLists = {};

    const godotProjects = new ProjectCreator("godot");
    const frontStackProjects = new ProjectCreator("HTML, CSS, JS");
    const javaProjects = new ProjectCreator("java");


    godotProjects.addProject(
        "heart_beat",
        "C:\\Users\\user\\Desktop\\emily\\projects\\godot_projects\\HeartBeat\\md_res\\menu.png",
        "https://gotm.io/emilysalum/heart-beat")



    frontStackProjects.addProject(
        "barbearia_alura",
        "C:\\Users\\user\\Desktop\\emily\\alura\\alura-barbershop\\readmeres\\frontpage2.png",
        "https://emilymarquessalum.github.io/alura-barbearia/")


    javaProjects.addProject("Perfect Seven",
        "C:/Users/user/Desktop/emily/projects/res/perfect_seven/logo.png",
        "https://youtu.be/CWss5f941eA");

    javaProjects.addProject("Crumb Hunt",
        "C:/Users/user/Desktop/emily/projects/res/game_prints/crumbt_hunt_start.png",
        "https://youtu.be/urmSuQsfpsE"
    )



    app.emit("project_lists_loaded", projectLists);


}

exports.loadProjects = loadProjects;
