

function opacity_change(img, text) {
    img.style.opacity = 0.2;
    text.style.opacity = 1;
}

function opacity_default(img, text) {
    img.style.opacity = 1;
    text.style.opacity = 0;
}








function get_positions(children) {
    positions = []

    for (project of scroller.children) {
        positions.push(project.offsetLeft);
    }

    return positions;
}

function move_to(name) {
    element = document.getElementsByName(name)[0];

    element.scrollIntoView();
}

con_buttons = document.getElementsByName("move_to_button");
for (button of con_buttons) {
    button.addEventListener("click", move_to.bind(null, button.dataset.move_to));
}


lists = document.getElementsByName("list");

function projectMouseOver(project, open_link, open_github) {

    open_link.classList.append("north_east");


    open_github.classList.append("north_weast");


}

function projectMouseOut(project) {



}

write_ones = document.getElementsByName("write_on");

function write_into(to_write, text) {
    to_write.innerHTML += text[0];

    if (text.length <= 1) {
        return;

    }
    setTimeout(write_into.bind(null, to_write, text.slice(1, text.length)), 40);
}

for (write_on of write_ones) {
    setTimeout(write_into.bind(null, write_on, write_on.innerHTML), 1000);

    write_on.innerHTML = "";
}

let class_animations = [{ name: "tech-list", new_name: "tech-list-anim" },
];

for (classes of class_animations) {
    elements = document.getElementsByClassName(classes.name);
    classes['elements'] = Array.from(elements);
}




function check_for_in_screen() {
    for (classes of class_animations) {
        for (let i = 0; i < classes['elements'].length; i++) {
            element = classes['elements'][i];
            var position = element.getBoundingClientRect();
            position.top += window.innerHeight / 2;
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                element.className += ` ${classes.new_name}`;

                classes['elements'].splice(i, 1);
                i -= 1;
            }
        }
    }
}

window.addEventListener('scroll', check_for_in_screen);
check_for_in_screen();
