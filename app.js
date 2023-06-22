const exp = require("express");
const sql = require("sequelize");
const signInRouter = require("./routes/signInRouter.js");
const indexRouter = require("./routes/indexRouter.js");
const adminRouter = require("./routes/adminRouter.js");

const app = exp();

app.set("view engine", "hbs");
app.use(exp.static(__dirname + "/public"));
const parser = exp.urlencoded({extended: false});

const sequelize = new sql("pokolenie", "root", "Flower_Nerlin", {
    dialect: "mysql",
    host: "localhost"
})

const userInf = sequelize.define("userInf", {
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
    parentsPhone: {
        type: sql.INTEGER,
        allowNull: true
    },
    usersPhone: {
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

const mainUserInf = sequelize.define("mainUserInf", {
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
    console.log("Сервер запущен")
  }); 
}).catch(err=>{console.log(err)})

app.use("/sign_in",  signInRouter);
app.use("/", indexRouter);
// app.use("/admin", adminRouter);

app.post("/", parser, function(req, res){
    if(req.body) return res.sendStatus(400);
    console.log(req.body);
    app.use("/admin", function(req, res){
        mainUserInf.findAll({raw: true}).then(data=>{
            res.render("admin.hbs");
            
        }).catch(err=>{console.log(err)})
    });
})

// mainUserInf.create({
//     logIn: "Bob",
//     password: "bob",
//     title: "admin"
// }).then(res=>{
//     console.log(res);
// }).catch(err=>{console.log(err)})