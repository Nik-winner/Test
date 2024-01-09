const sql = require("../database/pokolenie.js");
const UserInf = require("../models/userInf.js");
const MainInf = require("../models/mainInf.js");
const Lesson = require("../models/lesson.js");
const Branch = require("../models/branch.js");
const LessonsDate = require("../models/lessonsDate.js");
const Attendance = require("../models/attendance");
const associations = require("../models/associations.js");

exports.create = function(req, res){
    res.render("create.hbs")
}

exports.branch = function(req, res){
    sql.transaction(async (t)=>{
        return await Branch.findAll({raw: true}).then(data=>{
            res.render("branch.hbs", {
                branch: data
            })
        }).catch(err=>{console.log(err)})
    })
}

exports.lessons = function(req, res){
    let branchName = req.params["name"]
    sql.transaction(async (t)=>{
        return await sql.transaction(async(t1)=>{
            return await Branch.findOne({where: {name: branchName}}).then(branch=>{
                if(!branch) return console.log("Branch not found");
                let myLessons = [];
                return branch.getLessons().then(lessons=>{
                    class MyLesson {
                        constructor(date, mentor, id){
                            this.date = date;
                            this.mentor = mentor;
                            this.id = id
                        }
                    }
                    lessons.map(lesson=>{
                        lesson.getAttendances().then(attendances=>{
                            let set = new Set(attendances.map(attend=> attend.lessonsDateId));
                            for(let el of set){
                                LessonsDate.findOne({
                                    where: {id: el},
                                    transaction: t
                                }).then(d=>{
                                    let date = d.date
                                    let monday = new Date(Date.parse(date)).getDay()
                                    if(monday == 1){
                                        let lsn = new MyLesson(d.getWeek, lesson.mentor, lesson.id);
                                        myLessons.push(lsn)
                                    }
                                }).catch(err=>{console.log(err)})
                            }
                        })
                    })
                    res.render("lessons.hbs", {
                        lessons: myLessons
                    })
                }).catch(err=>{console.log(err)})
            }).catch(err=>{console.log(err)})
        })
                
    })
}

exports.attendance = function(req, res){
    let lessonId = req.params["id"];
    sql.transaction(async (t)=>{
        return await sql.transaction(async(t1)=>{
            return await Lesson.findByPk(lessonId).then(lesson=>{
                if(!lesson) return console.log("Lesson not found");
                let students = [];
                let attendance = [];
                let days = [];
                return lesson.getMainInfs({raw: true}).then(users=>{
                    console.log(users.length)
                })
            }).catch(err=>{console.log(err)})
        })
    })
}

exports.admin = function(req, res){
    sql.transaction(async(t)=>{
        return await UserInf.findAll({raw: true}).then(data=>{
            res.render("admin.hbs", {
                users: data
            })
        }).catch(err=>{console.log(err)})
    })
}

exports.listAdmins = function(req, res){
    sql.transaction(async(t)=>{
        return await UserInf.findAll({
            attributes: ["name", "surname"],
            include: [{
                model: MainInf,
                attributes: ["role"]
            }]
        }).then(users=>{
            let data = [];
            users.map(user =>{
                if(user.mainInf.role == "админ"){
                    data.push(user);
                }
            })
            console.log(data)
            res.render("admin.hbs", {
                users: data
            })
        }).catch(err=>{console.log(err)})
    })
}

exports.listUsers = function(req, res){
    sql.transaction(async(t)=>{
        return await UserInf.findAll({
            attributes: ["name", "surname"],
            include: [{
                model: MainInf,
                attributes: ["role"]
            }]
        }).then(users=>{
            let data = [];
            users.map(user=> {
                if(user.mainInf.role == "ученик"){
                    data.push(user);
                }
            })
            res.render("admin.hbs", {
                users: data
            })
        }).catch(err=>{console.log(err)})
    })
}

exports.listMentors = function(req, res){
    sql.transaction(async(t)=>{
        return await UserInf.findAll({
            attributes: ["name", "surname"],
            include: [{
                model: MainInf,
                attributes: ["role"]
            }]
        }).then(users=>{
            let data = [];
            users.map(user=> {
                if(user.mainInf.role == "ментор"){
                    data.push(user);
                }
            })
            res.render("admin.hbs", {
                users: data
            })
        }).catch(err=>{console.log(err)})
    })
}

exports.detailUser = function(req, res){
    sql.transaction(async(t)=>{
        return await UserInf.findByPk(req.params["id"]).then(inf=>{
            if(!inf) return console.log("User not found");
            return inf.getMainInf().then(mainInf=>{
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
    })
}

exports.edit = function(req, res){
    const userId = req.params.id;
    sql.transaction(async(t)=>{
        return await UserInf.findByPk(userId).then(user=>{
            if(!user) return console.log("Not faund")
            console.log(user)
            return user.getMainInf().then(mainInf=>{
                res.render("edit.hbs", {
                    data: user,
                    mainData: mainInf
                })
            })
        }).catch(err=>{console.log(err)})
    })
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
        sql.transaction(async(t)=>{
            return await sql.transaction(async(t1)=>{
                return await UserInf.create({
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
                    return MainInf.create({
                        login: req.body.name,
                        password: req.body.surname,
                        role: req.body.role
                    }, {transaction: t}).then(mainInf=>{
                        user.setMainInf(mainInf, {transaction: t}).catch(err=>{console.log(err)})
                        res.redirect("/admin");
                    });
                }).catch(err=>{console.log(err)})
            })
        })
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
        sql.transaction(async(t)=>{
            return await sql.transaction(async(t1)=>{
                return await UserInf.findByPk(userId).then(user=>{
                    if(!user) return console.log("User no faund");
                    return user.getMainInf().then(mainInf=>{
                        return UserInf.update({
                            name: req.body.name,
                            surname: req.body.surname,
                            parentsName: req.body.parentsName,
                            parentsNumber: req.body.parentsNumber,
                            usersNumber: req.body.usersNumber,
                            birthday: req.body.birthday,
                            dateStartTrialLesson: req.body.dateStartTrialLesson,
                            dateStartMainLesson: req.body.dateStartMainLesson,
                            payment: req.body.payment
                        }, {where: {id: userId}, transaction: t}).then(update=>{
                            return MainInf.update({
                                login: req.body.name,
                                password: req.body.password,
                                role: req.body.role
                            }, {where: {id: mainInf.id}, transaction: t}).then(mainUpdate=>{
                                res.redirect("/admin");
                            }).catch(err=>{console.log(err)});
                        }).catch(err=>{console.log(err)});
                    })
                }).catch(err=>{console.log(err)});
            })
        })
    }
}

exports.search = function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }else{
        sql.transaction(async(t)=>{
            return await UserInf.findAll({where: {name: req.body.user}, raw: true}).then(data=>{
                res.render("admin.hbs", {
                    users: data
                })
            })
        })
    }
}

exports.delete = function(req, res){
    sql.transaction(async(t)=>{
        return await UserInf.destroy({
            where: {
                id: req.params.id
            }
        }).then(resolve=>{
            res.redirect("/admin")
        })
    })
}