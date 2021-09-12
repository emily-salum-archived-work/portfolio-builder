
const { make_project } = require("./helper_loader");
const { app } = require("electron");
function load_mock() {

  
    let project_lists = {};

    
    project_lists["python"] = [make_project("portfolio builder"),
    make_project("md builder")];

    project_lists["java"] = [make_project("necromancer tower defense"),
    make_project("perfect seven"),
    make_project("crumb hunt"),
    make_project("underway"),
    make_project("travellair"),
    make_project("space game"),
    make_project("shooting on robots game")];
    
    app.emit("project_lists_loaded", project_lists);
}
exports.load_mock = load_mock;
