
const profile = document.getElementById("profile");
const profileBody = document.getElementById("profile_body");

function addFieldToProfile(title, value, value_raw) {

    let field = document.createElement("tr");

    let fieldTitle = document.createElement("td");
    fieldTitle.innerHTML = title;
    fieldTitle.classList.add("profile_field_key")
    field.appendChild(fieldTitle);


    let fieldValue = document.createElement("td");
    fieldValue.innerHTML = value_raw || value;
    fieldValue.classList.add("profile_value")

    fieldValue.setAttribute("not-raw", value);
    fieldValue.setAttribute("field_class", `${title}_value`)
    field.appendChild(fieldValue);

    profileBody.appendChild(field);

}


function addAgeToProfile() {

    const myAge = moment("26-11-2003", "DD-MM-YYYY").fromNow().substring(0, 2);
    addFieldToProfile("Age", myAge);

}


addAgeToProfile();



const buildProfile = document.getElementById("profile_button");


buildProfile.addEventListener("click", () => {


    const fields = Array.from(profileBody.getElementsByClassName("profile_value"));
    const fieldKeys = Array.from(profileBody.getElementsByClassName("profile_field_key"))

    const profileKeys = Array.from(profile.getElementsByClassName("profile_key"));



    /* Prettify fields */
    fields.forEach((field) => {

        let firstClass = field.getAttribute("field_class");
        console.log(firstClass);

        field.classList.remove("raw_value");

        field.innerHTML = field.getAttribute("not-raw");
        field.classList.toggle(firstClass);
        field.classList.add("pretty_profile_value");
    });

    fieldKeys.forEach((profileKey) => {
        profileKey.classList.remove("profile_field_key");
        profileKey.classList.add("profile_field_title");
    })


    profile.classList.add("pretty_profile");

    /* Remove raw-style fields */

    profileKeys.forEach((key) => {

        key.classList.add("closed_keys")
    })

    buildProfile.remove();


    const hiddenElements = Array.from(profile.getElementsByClassName("hidden_from_raw"));

    hiddenElements.forEach((el) =>{el.classList.remove("hidden_from_raw")});


});

