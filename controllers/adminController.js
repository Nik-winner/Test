const UserInf = require("../models/userInf.js");
const MainInf = require("../models/mainInf.js");

exports.create = function(req, res){
    res.render("create.hbs")
}

exports.admin = function(req, res){
    UserInf.findAll({raw: true}).then(data=>{
        res.render("admin.hbs", {
            users: data
        })
    }).catch(err=>{console.log(err)})
}

exports.listAdmins = function(req, res){
    UserInf.findAll({
        attributes: ["name", "surname"],
        include: [{
            model: MainInf,
            attributes: ["role"]
        }]
    }).then(users=>{
        let data = [];
        for(let user of users){
            if(user.mainInf.role == "админ"){
                data.push(user);
            }
        }
        res.render("listAdmins.hbs", {
            users: data
        })
    }).catch(err=>{console.log(err)})
}

exports.edit = function(req, res){
    const userId = req.params.id;
    UserInf.findAll({where: {id: userId}, raw: true}).then(data=>{
        res.render("edit.hbs", {
            user: data[0]
        })
    }).catch(err=>{console.log(err)})
}

exports.addUser = function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }else{
        for(let key in req.body){
            if(req.body[key] == "" || req.body[key] == "Invalid date"){
                req.body[key] = null;
            }
        }
        UserInf.create({
            name: req.body.name,
            surname: req.body.surname,
            parentsName: req.body.parentsName,
            parentsNumber: req.body.parentsNumber,
            usersNumber: req.body.usersNumber,
            birthday: req.body.birthday,
            dateStartTrialLesson: req.body.dateStartTrialLesson,
            dateStartMainLesson: req.body.dateStartMainLesson,
            payment: req.body.payment
        }).then(user=>{
            MainInf.create({
                login: req.body.name,
                password: req.body.password,
                role: req.body.role
            }).then(mainInf=>{
                user.setMainInf(mainInf).catch(err=>{console.log(err)})
            });
            console.log(user)
            res.redirect("/admin");
        }).catch(err=>{console.log(err)})
    }
}