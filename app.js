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
    payment: {
        type: sql.INTEGER,
        allowNull: false
    },
    dateStartMainLesson: {
        type: sql.INTEGER,
        allowNull: true
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
    console.log(req.body);
    mainUserInf.findAll({raw: true}).then(data=>{
        data.forEach(item => {
            if(item.logIn == req.body.name){
                console.log(item);
                res.redirect("/admin");
            }
        });
    }).catch(err=>{console.log(err)})
})

// userInf.create({
//     name: "Bob",
//     surname: "white",
//     parentsName: "Jack",
//     parentsPhone: "0555438843",
//     usersPhone: "0555909035",
//     birthday: "06042006",
//     dateStartTrialLesson: "28042020",
//     payment: "2000",
//     dateStartMainLesson: "30042020"
// }).then(res=>{
//     console.log(res);
// }).catch(err=>{console.log(err)})