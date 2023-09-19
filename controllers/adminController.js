const UserInf = require("../models/userInf.js");
const MainInf = require("../models/mainInf.js");

exports.create = function(req, res){
    res.render("create.hbs")
}

exports.attendance = function(req, res){
    res.render("attendance.hbs")
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
        res.render("admin.hbs", {
            users: data
        })
    }).catch(err=>{console.log(err)})
}

exports.listUsers = function(req, res){
    UserInf.findAll({
        attributes: ["name", "surname"],
        include: [{
            model: MainInf,
            attributes: ["role"]
        }]
    }).then(users=>{
        let data = [];
        for(let user of users){
            if(user.mainInf.role == "ученик"){
                data.push(user);
            }
        }
        res.render("admin.hbs", {
            users: data
        })
    }).catch(err=>{console.log(err)})
}

exports.listMentors = function(req, res){
    UserInf.findAll({
        attributes: ["name", "surname"],
        include: [{
            model: MainInf,
            attributes: ["role"]
        }]
    }).then(users=>{
        let data = [];
        for(let user of users){
            if(user.mainInf.role == "ментор"){
                data.push(user);
            }
        }
        res.render("admin.hbs", {
            users: data
        })
    }).catch(err=>{console.log(err)})
}

exports.detail = function(req, res){
    UserInf.findByPk(req.params["id"]).then(inf=>{
        if(!inf) return console.log("User not found");
        inf.getMainInf().then(mainInf=>{
            let data = {
                name: inf.name,
                surname: inf.surname,
                parentsName: inf.parentsName,
                parentsNumber: inf.parentsNumber,
                usersNumber: inf.usersNumber,
                birthday: inf.birthday,
                dateStartTrialLesson: inf.dateStartTrialLesson,
                dateStartMainLesson: inf.dateStartMainLesson,
                payment: inf.payment,
                password: mainInf.password,
                role: mainInf.role
            }
            res.render("detail.hbs", {
                user:  data
            })
        })
    })
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
            res.redirect("/admin");
        }).catch(err=>{console.log(err)})
    }
}

exports.change = function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }else{
        for(let key in req.body){
            if(req.body[key] == "" || req.body[key] == "Invalid date"){
                req.body[key] = null;
            }
        }
        const userId = req.body.id;
        UserInf.findByPk(userId).then(user=>{
            if(!user) return console.log("User no faund");
            user.getMainInf().then(mainInf=>{
                UserInf.update({
                    name: req.body.name,
                    surname: req.body.surname,
                    parentsName: req.body.parentsName,
                    parentsNumber: req.body.parentsNumber,
                    usersNumber: req.body.usersNumber,
                    birthday: req.body.birthday,
                    dateStartTrialLesson: req.body.dateStartTrialLesson,
                    dateStartMainLesson: req.body.dateStartMainLesson,
                    payment: req.body.payment
                }, {where: {id: userId}}).then(update=>{
                    MainInf.update({
                        login: req.body.name,
                        password: req.body.password,
                        role: req.body.role
                    }, {where: {id: userId}}).then(mainUpdate=>{
                        res.redirect("/admin");
                    }).catch(err=>{console.log(err)});
                }).catch(err=>{console.log(err)});
            })
        }).catch(err=>{console.log(err)});
    }
}

exports.delete = function(req, res){
    UserInf.destroy({
        where: {
            id: req.params.id
        }
    }).then(resolve=>{
        console.log(resolve)
        res.redirect("/admin")
    })
}