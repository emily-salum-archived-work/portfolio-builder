/*

  "Profile"
    Some personal information about me.

*/


 
  exports.getProfile =  function getProfile() {

    /* Steps to add or remove from stuffILike:
      * 1. Add or remove a KEY from this array.
      * 2. Add or remove the key from the translation files.
     */
    const stuffILike =  ["Rpg", "classical music", "discord"]; 

    return {
  
      "from": {'raw': "COUNTRIES.Brazil", 'not_raw': "Brasil"},

      "likes": {'raw': `${stuffILikeString(stuffILike)}`, "not_raw": "stuffILike" }  
       
      /* if you look in the interface, you will find an age field, Its not here because
        its added via javascript. Its a dinamic value afterall. */
    }
  }


  
  function stuffILikeString(stuffILike) {

    let likesString = "[";
    
    stuffILike.forEach((t) => {likesString += `"${t}",` });

    likesString = likesString.substring(0, likesString.length - 1) + "]";

    return likesString;
  }
  