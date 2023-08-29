const exp = require("express");
const sql = require("sequelize");
const hbs = require("hbs");
const db = require("./database/pokolenie.js");
const signInRouter = require("./routes/signInRouter.js");
const indexRouter = require("./routes/indexRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const MainInf = require("./models/mainInf.js");

const app = exp();
app.set("view engine", "hbs");
app.use(exp.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
const parser = exp.urlencoded({extended: false});

db.authenticate().then(res=>{
    console.log("Соединение с БД было успешно установлено")
}).catch(err=>{console.log("Невозможно выполнить подключение к БД: ", err)});

db.sync({alter: true}).then(()=>{
  app.listen(3306, function(){
    console.log("Сервер запущен");
  }); 
}).catch(err=>{console.log(err)})

app.get("/", indexRouter);
app.use("/sign_in", signInRouter);
app.use("/admin", adminRouter);

app.post('/login', parser, function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }else{
        MainInf.findAll({raw: true}).then(data=>{
            data.forEach(item => {
                if(item.login == req.body.name && item.password == req.body.password){
                    if(item.role == "админ"){
                        console.log(item);
                        uid = item.id;
                        res.redirect(`/admin`);
                    }else if(item.role == "ментор"){
                        console.log(item);
                        res.redirect("/mentor")
                    }else{
                        console.log(item);
                        res.redirect("/user")
                    }
                }
            });
        }).catch(err=>{console.log(err)})
    }
})
app.post("/edit", parser, function(req, res){
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
})

app.post("/delete/:id", function(req, res){
    UserInf.destroy({
        where: {
            id: req.params.id
        }
    }).then(resolve=>{
        console.log(resolve)
        res.redirect("/admin")
    })
})