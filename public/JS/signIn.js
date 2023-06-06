const exp = require("express");
const sql = require("sequelize");

const app = exp();

let inputName = document.querySelector("#name");
let inputPassword = document.querySelector("#password")
let submit = document.querySelector("#submit");

submit.addEventListener("click", getUser =>{
    getUser.preventDefault();
    console.log(inputName.value);
    console.log(inputPassword.value);
    let user = {
        name: inputName.value,
        password: inputPassword.value
    }
    console.log(user);
    
});
