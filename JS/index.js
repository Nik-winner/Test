let shadow_body = document.getElementById("shadow_body");
let btn_span = document.getElementById("btn_span");
let btn_body = document.querySelector("#btn_body");
let nav_flex = document.getElementById("nav_flex");
btn_body.addEventListener('click', open_menu);
let nf = 0;
function open_menu() {
    shadow_body.classList.toggle("active_sb");
    btn_body.classList.toggle("active");
    function act_nf() {
        nav_flex.classList.toggle("active_nf");
    }
    if(nf == 0){
        setTimeout(act_nf, 320);
        nf = 1;
    }
    else{
        nav_flex.classList.toggle("active_nf");
        nf = 0;
    }
};
