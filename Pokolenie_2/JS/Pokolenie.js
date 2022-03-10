let shadow_body = document.getElementById("shadow_body");
let btn_span = document.getElementById("btn_span");
let btn_body = document.querySelector("#btn_body");
let nav_flex = document.getElementById("nav_flex");
let head = document.querySelector(".header");
let nf = 0;
let a = document.querySelectorAll(".nav_link");

if (window.innerWidth < 768) {
    btn_body.addEventListener('click', open_menu);
    a.forEach(function (event) {
        event.addEventListener("click", close_menu);
    });

    function open_menu() {
        shadow_body.classList.toggle("active_sb");
        btn_body.classList.toggle("active");
        nav_flex.classList.toggle("active_nf");
        head.classList.toggle("active_h");
    };

    function close_menu() {
        shadow_body.classList.toggle("active_sb");
        btn_body.classList.toggle("active");
        nav_flex.classList.toggle("active_nf");
        head.classList.toggle("active_h");
    }
}