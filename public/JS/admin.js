let menu_button = document.querySelector(".menu_text");
let menu = document.querySelector(".menu");

menu_button.addEventListener("click", dropDown);

function dropDown(){
    menu.classList.toggle("menu_drp_dwn");
}