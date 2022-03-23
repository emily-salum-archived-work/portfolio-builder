



const { getProfile } = require("./profile_loader.js");
const { getTechs } = require("./techs_loader.js");
const { getLanguagesISpeak } = require("./languages_loader.js");


exports.getPortfolioData = function getPortfolioData(project_lists, __dirname) {

    return {
      'project_lists': project_lists,
      'tech_list': getTechs(),
      'profile': getProfile(),
      'languages': getLanguagesISpeak(),
  
  
      'root': __dirname
    }
  }
  