const { app } = require("electron");
let { PythonShell } = require('python-shell');
const { save_images, make_function_argument } = require('./helper_loader');


function load_projects() {


    var function_arguments = buildArguments();

    
    final_args = { "functions": "[", "parameters": "[" };

    final_args["functions"] = "[" + function_arguments.map(x => x["function"]).join('');
    final_args["parameters"] = "[" + function_arguments.map(x => x["parameters"]).join('');
    
    final_args["functions"] += ']';
    final_args["parameters"] += ']';

    var options = {
        pythonPath: "C:\\Users\\user\\PycharmProjects\\builder_helper\\venv\\Scripts\\python.exe",
        args: ['{' +
            '"module" : "builder_help",' +
            ` "functions" : ${final_args['functions']}, ` +
            ` "parameters" : ${final_args['parameters']}}`]
    };

    PythonShell.run('C:\\Users\\user\\PycharmProjects\\builder_helper\\builder_args.py', options, function (err, results) {
        if (err)
            throw err;

        let project_lists = JSON.parse(clean_python_result(results[0]));

        save_images(project_lists);
        
        app.emit("project_lists_loaded", project_lists);

    });

}


function clean_python_result(result)
{
    return result.replace(/'/g, `"`).replace(/True/g, "true");
}

function buildArguments()
{
    var function_arguments = [];

    function_arguments.push(make_function_argument('"get_projects_with", ', '{"to_portfolio" : true}, '));
    function_arguments.push(make_function_argument('"group_archives", ', '{"selection": "language", "archives": "to_insert"}, '));
    function_arguments.push(make_function_argument('"get_properties_from_list"', '{"archive_list" : "to_insert", "traverse_by": "array_dict"}'));

    return function_arguments;
}

exports.load_projects = load_projects;
