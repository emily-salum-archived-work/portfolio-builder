

/** ALL THE LANGUAGES I KNOW! Since I plan to know more languages...
 * Steps to add a new language:
 *    1- put the name of the language and the country name in the array
 *    2= look for an icon image on google.
 *    3= add the image to the folder "res/flags" with the name of the LANGUAGE you added
 *    4= add translations inside "js/languages/" folder
 *    5= add a README for that language inside "READMES" folder
 */






exports.getLanguagesISpeak = function getLanguagesISpeak() {
    return [
        { name: "portugues", country: "brazil" }, 
        { name: "english", country: "usa" }
    ];
}