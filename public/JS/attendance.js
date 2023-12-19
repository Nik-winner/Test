let attends = document.querySelectorAll(".attend");

window.onload = function(){
    for(let attend of attends){
        let check = attend.children
        console.log(check)
        if(attend.children.innerHTML == 0){
            attend.classList.toggle("attend_check0")
        }else if(attend.children.innerHTML == 1){
            attend.classList.toggle("attend_check1")
        }else if(attend.children.innerHTML == 2){
            attend.classList.toggle("attend_check2")
        }else if(attend.children.innerHTML == 3){
            attend.classList.toggle("attend_check3")
        }
    }
}