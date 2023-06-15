let inputName = document.querySelector("#name");
let inputPassword = document.querySelector("#password")
let submit = document.querySelector("#submit");

submit.addEventListener("click", getUsers);

async function getUsers(){
    fetch("/users", {
        method: "GET",
        headers: {"Accept": "application/json;charset=utf-8"}
    }).then(res=>{
        let users = res.json();
        console.log(users)
    }).catch(err=>{console.log(err)})
    // if(resp.ok === true){
    //     let users = await resp.json();
    //     console.log(users)
        
    // }
}