
const { make_project, save_images } = require("./helper_loader");
const { app } = require("electron");
function load_mock() {

  
    let project_lists = {};
 
    //project_lists['java'] = [make_project('')];


    project_lists['godot'] = [make_project('heart_beat', 
    "C:\\Users\\user\\Desktop\\emily\\projects\\godot_projects\\HeartBeat\\md_res\\menu.png",
    "https://gotm.io/emilysalum/heart-beat")];


    project_lists['javascript'] = [make_project("barbearia_alura", 
    "C:\\Users\\user\\Desktop\\emily\\alura\\alura-barbershop\\readmeres\\frontpage2.png", "https://emilymarquessalum.github.io/alura-barbearia/")]

    //project_lists['python'] = [make_project()]
    save_images(project_lists);
    app.emit("project_lists_loaded", project_lists);


}
exports.load_mock = load_mock;
