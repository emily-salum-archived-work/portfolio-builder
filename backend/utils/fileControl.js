
const {log, styles} = require("./logger.js");

const fs = require("fs");

function deleteFile(path) {
    try {
        log("deleting file " + path);
        fs.unlinkSync(path);


    } catch (err) { console.log("file wasnt deleted, "+ path, err ); }
}



exports.deleteFile = deleteFile;