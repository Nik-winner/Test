let select = document.querySelector(".select");
let list_option = document.querySelector(".list_option");
let option = document.getElementsByClassName("option");
let roles = ["админ", "ученик", "ментор"];

select.addEventListener("click", dropList);

function dropList(){
    list_option.classList.toggle("list_drp_dwn");
    select.classList.toggle("arrow_up");
    let role = select.innerHTML;
    let delete_op = roles.indexOf(role, 0)
    option.forEach(item =>{
        
    })
}