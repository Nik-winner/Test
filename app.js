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

const userInf = sequelize.define("userInfs", {
    id: {
        type: sql.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sql.STRING,
        allowNull: true,
    },
    surname: {
        type: sql.STRING,
        allowNull: true
    },
    parentsName: {
        type: sql.STRING,
        allowNull: true
    },
    parentsNumber: {
        type: sql.INTEGER,
        allowNull: true
    },
    usersNumber: {
        type: sql.INTEGER,
        allowNull: true
    },
    birthday: {
        type: sql.INTEGER,
        allowNull: true
    },
    dateStartTrialLesson: {
        type: sql.INTEGER,
        allowNull: true
    },
    dateStartMainLesson: {
        type: sql.INTEGER,
        allowNull: true
    },
    payment: {
        type: sql.INTEGER,
        allowNull: false
    }
})

const mainUserInf = sequelize.define("mainUserInfs", {
    id: {
        type: sql.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    logIn: {
        type: sql.STRING,
        allowNull: true
    },
    password: {
        type: sql.STRING,
        allowNull: true
    },
    title: {
        type: sql.STRING,
        allowNull: true
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

sequelize.sync({alter: true}).then(()=>{
  app.listen(3306, function(){
    console.log("Сервер запущен");
  }); 
}).catch(err=>{console.log(err)})

app.get("/", indexRouter);
app.use("/sign_in",  signInRouter);
app.use("/admin", adminRouter)

app.use("/admin", function(req, res){
    userInf.findAll({raw: true}).then(data=>{
        res.render("admin.hbs", {
            users: data
        })
    })
})

app.post("/login", parser, function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }
    mainUserInf.findAll({raw: true}).then(data=>{
        data.forEach(item => {
            if(item.logIn == req.body.name && item.password == req.body.password){
                console.log(item);
                res.redirect("/admin");
            }
        });
    }).catch(err=>{console.log(err)})
})
app.post("/addUser", parser, function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }
    userInf.create({
        name: req.body.name,
        surname: req.body.surname,
        parentsName: req.body.parentsName,
        parentsNumber: req.body.parentsNumber,
        usersNumber: req.body.usersNumber,
        birthday: req.body.birthday,
        dateStartTrialLesson: req.body.dateStartTrialLesson,
        dateStartMainLesson: req.body.dateStartMainLesson,
        payment: req.body.payment
    }).then(resolve=>{
        console.log(resolve);
    }).catch(err=>{console.log(err)})
    res.redirect("/admin");
})

// userInf.create({
//     name: "Bob",
//     surname: "white",
//     parentsName: "Jack",
//     parentsNumber: "0555438843",
//     usersNumber: "0555909035",
//     birthday: "06042006",
//     dateStartTrialLesson: "28042020",
//     dateStartMainLesson: "30042020",
//     payment: "2000"
// }).then(res=>{
//     console.log(res);
// }).catch(err=>{console.log(err)})