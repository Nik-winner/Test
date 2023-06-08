let inputName = document.querySelector("#name");
let inputPassword = document.querySelector("#password")
let submit = document.querySelector("#submit");

// submit.addEventListener("click", getUser =>{
//     getUser.preventDefault();
//     let user = {
//         name: inputName.value,
//         password: inputPassword.value
//     }
//     console.log(user);
//     module.exports = getUser;
// });

submit.addEventListener("click", getUser);

function getUser(){
    let user = {
        name: inputName.value,
        password: inputPassword.value
    }
    console.log(user);
    return user
}
module.exports = getUser;