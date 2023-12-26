let attends = document.querySelectorAll(".attend");

window.onload = function(){
    for(let attend of attends){
        let check = attend.firstChild.innerHTML
        switchCheck(check, attend)
    }
}

function switchCheck(condition, item){
    switch (Number(condition)){ 
        case 1:
            item.classList.toggle("attend_check1");
            break;
        case 2:
            item.classList.toggle("attend_check2");
            break;
        case 3:
            item.classList.toggle("attend_check3");
            break;
        default:
            item.classList.toggle("attend_check0");
    }
}

// attends.forEach(function(e){
//     e.addEventListener('click', ()=>{
//         e.classList.remove(e.classList[1]);
//         if(e.firstChild.innerHTML < 3){
//             e.firstChild.innerHTML++
//             switchCheck(e.firstChild.innerHTML, e)
//         } else{
//             e.firstChild.innerHTML = 1
//             switchCheck(e.firstChild.innerHTML, e)
//         }
//     })
// })