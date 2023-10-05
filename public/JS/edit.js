let select = document.querySelector(".select");
let list_option = document.querySelector(".list_option");
let roleContainer = document.querySelector("#role")
let options = document.getElementsByClassName("option");

function changeRole(){
    for(option of options){
        option.addEventListener("click", (e)=>{
            let val = e.currentTarget.innerHTML;
            select.innerHTML = val;
            roleContainer.value = val;
            list_option.classList.remove("list_drp_dwn");
            select.classList.remove("arrow_up");
        })
    }
}

select.addEventListener("click", ()=>{
    list_option.classList.toggle("list_drp_dwn");
    select.classList.toggle("arrow_up");
    let roles = ["админ", "ученик", "ментор"];
    let sel_role = select.innerHTML;
    let del_index = roles.indexOf(sel_role, 0);
    roles.splice(del_index, 1);
    for(let option of options){
        if(option.innerHTML == "" || option.innerHTML == sel_role || option.innerHTML != roles[1]){
            option.innerHTML = roles[0];
            roles.splice(0, 1);
        }
    }
});

changeRole()