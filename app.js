const exp = require("express");
const sql = require("sequelize");
const hbs = require("hbs");
const signInRouter = require("./routes/signInRouter.js");
const indexRouter = require("./routes/indexRouter.js");
const adminRouter = require("./routes/adminRouter.js");


const app = exp();

app.set("view engine", "hbs");
app.use(exp.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
const parser = exp.urlencoded({extended: false});

const sequelize = new sql("pokolenie", "root", "Flower_Nerlin", {
    dialect: "mysql",
    host: "localhost"
})

const UserInf = sequelize.define("userInfs", {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sql.STRING,
        allowNull: false
    },
    surname: {
        type: sql.STRING,
        allowNull: false
    },
    parentsName: {
        type: sql.STRING,
        allowNull: true
    },
    parentsNumber: {
        type: sql.DECIMAL(11, 0),
        allowNull: true
    },
    usersNumber: {
        type: sql.DECIMAL(11, 0),
        allowNull: true
    },
    birthday: {
        type: sql.DATEONLY,
        allowNull: true
    },
    dateStartTrialLesson: {
        type: sql.DATEONLY,
        allowNull: true
    },
    dateStartMainLesson: {
        type: sql.DATEONLY,
        allowNull: true
    },
    payment: {
        type: sql.INTEGER,
        allowNull: true
    }
})

const MainInf = sequelize.define("mainInfs", {
    id: {
        type: sql.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: sql.STRING,
        allowNull: false
    },
    password: {
        type: sql.STRING,
        allowNull: false
    },
    role: {
        type: sql.STRING,
        allowNull: false
    }
})

const Courses = sequelize.define("courses", {
    id: {
        type: sql.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    course: {
        type: sql.STRING,
        allowNull: true
    }
})

UserInf.hasOne(MainInf, {onDelete: "cascade"})

sequelize.sync({alter: true}).then(()=>{
  app.listen(3306, function(){
    console.log("Сервер запущен");
  }); 
}).catch(err=>{console.log(err)})

app.get("/", indexRouter);
app.use("/sign_in",  signInRouter);
app.use("/admin", adminRouter)

app.use("/admin", function(req, res){
    UserInf.findAll({raw: true}).then(data=>{
        res.render("admin.hbs", {
            users: data
        })
    }).catch(err=>{console.log(err)})
})

app.post("/login", parser, function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }
    MainInf.findAll({raw: true}).then(data=>{
        data.forEach(item => {
            if(item.login == req.body.name && item.password == req.body.password){
                if(item.role == "admin"){
                    console.log(item);
                    res.redirect("/admin");
                }else if(item.role == "mentor"){
                    console.log(item);
                    res.redirect("/mentor")
                }else{
                    console.log(item);
                    res.redirect("/user")
                }
            }
        });
    }).catch(err=>{console.log(err)})
})
app.post("/addUser", parser, function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }
    console.log(req)
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
    }).catch(err=>{console.log(err)})
    res.redirect("/admin");
})

app.post("/delete/:id", function(req, res){
    UserInf.destroy({
        where: {
            id: req.params.id
        }
    }).then(res=>{
        console.log(res);
        req.redirect("/admin");
    })
})

// userInf.create({
//     name: "Bob",
//     surname: "white",
//     parentsName: "Jack",
//     parentsNumber: "0555438843",
//     usersNumber: "0555909035",
//     birthday: "2006-04-06",
//     dateStartTrialLesson: "2020-04-06",
//     dateStartMainLesson: "2020-04-06",
//     payment: "2000"
// }).then(res=>{
//     console.log(res);
// }).catch(err=>{console.log(err)})