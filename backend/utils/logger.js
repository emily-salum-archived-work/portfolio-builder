
 
var logListeners = [];

exports.logListeners = logListeners;

function log(message, logStyle, extraInfo) {

    
    if(logStyle){
        message = `${logStyle.prefix}${message}`    
    }

    console.log(message);
    
    logListeners.forEach(listener => {
        listener(message, logStyle, extraInfo);
    }); 
}

exports.log  = log;


class LogStyle {


    constructor(prefix, classCSS) {
            
            this.prefix = prefix;
            this.classCSS = classCSS;
    }
}



exports.styles = {
    "called" : new LogStyle("called ", "log__call"),

    "finished": new LogStyle("finished ", "log__finish"),
    "warning": new LogStyle("warning: ", "log__warning"),
    "error": new LogStyle("error: ", "log__error"),
}