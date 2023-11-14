const sql = require("../database/pokolenie.js");
const MainInf = require('../models/mainInf.js');
const associations = require("../models/associations.js");

exports.signIn = function(req, res){
    res.render("signIn.hbs");
};

exports.login = function(req, res){
    if(!req.body){
        res.sendStatus(400);
    }else{
        sql.transaction(async(t)=>{
            return await MainInf.findAll({raw: true}).then(data=>{
                data.forEach(item => {
                    if(item.login == req.body.login && item.password == req.body.password){
                        res.json({user: item.role, uid: item.id});
                    }
                });
            }).catch(err=>{console.log(err)})
        })
    }
}