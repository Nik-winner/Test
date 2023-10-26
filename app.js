const exp = require("express");
const hbs = require("hbs");
const db = require("./database/pokolenie.js");
const signInRouter = require("./routes/signInRouter.js");
const indexRouter = require("./routes/indexRouter.js");
const adminRouter = require("./routes/adminRouter.js");

const app = exp();
app.set("view engine", "hbs");
app.use(exp.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(exp.urlencoded({ extended: false }));
app.use(exp.json());

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