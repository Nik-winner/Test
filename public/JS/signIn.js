let submit = document.querySelector('.submit');
let login = document.querySelector('#name');
let password = document.querySelector("#password");

submit.addEventListener('click', post);

function post(){
    let user = {
        login: login.value,
        password: password.value
    }
    async function postUser(){
        const data = await req('/sign_in/login', "POST", user);
        console.log("вернул промис", data);
        if(data.user == true){
            window.location.href = "/admin";
        }else{alert("не найден")}
    }
    postUser();
}
async function req(url, method, data=null){
    try{
        const headers = {};
        let body;
        if(data){
            headers["Content-Type"]="application/json";
            body = JSON.stringify(data);
        }
        console.log('json', data);
        const res = await fetch(url, {method, headers, body});
        return await res.json();
    }catch(err){console.log(err)}
}