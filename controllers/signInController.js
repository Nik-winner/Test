const MainInf = require('../models/mainInf.js');

exports.signIn = function(req, res){
    res.render("signIn.hbs");
};

exports.login = function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }else{
        MainInf.findAll({raw: true}).then(data=>{
            data.forEach(item => {
                if(item.login == req.body.login && item.password == req.body.password){
                    if(item.role == "админ"){
                        console.log(item);
                        // res.redirect(`/admin`);
                        res.json({user: true})
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
}