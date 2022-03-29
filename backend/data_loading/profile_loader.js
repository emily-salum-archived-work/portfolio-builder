

  function stuffILikeString(stuffILike) {

    let likesString = "[";
    
    stuffILike.forEach((t) => {likesString += `"${t}",` });

    likesString = likesString.substring(0, likesString.length - 1) + "]";

    return likesString;
  }
  
  exports.getProfile =  function getProfile() {

    /* Steps to add or remove from stuffILike:
      * 1. Add or remove from this array.
      * 2. Add or remove from the translation files key "stuffILike"
     */
    const stuffILike =  ["Rpg", "classical music", "discord"]; 

    return {
  
      "from": {'raw': "COUNTRIES.Brazil", 'not_raw': "Brasil"},
      "likes": {'raw': `${stuffILikeString(stuffILike)}`, "not_raw": "stuffILike" }  
       
    }
  }

