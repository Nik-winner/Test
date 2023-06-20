let inputName = document.querySelector("#name");
let inputPassword = document.querySelector("#password")
let submit = document.querySelector("#submit");

submit.addEventListener("click", getUsers);

async function getUsers(){
    fetch("http://localhost:3306/pageUsers", {
        method: "GET",
        headers: {"Accept": "application/json;"}
    }).then(res=>{
        return res.json();
    }).then(result=>{
        console.log(result)
    }).catch(err=>{console.log(err)})
}