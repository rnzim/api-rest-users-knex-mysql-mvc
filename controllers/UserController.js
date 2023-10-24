const { connect } = require('http2')
const User = require('../models/User')
class UserController{
    async index(req,res){
        res.send('oi user controller')
    }
    async create(req,res){
        console.log(req.body)
        var {name,email,pass} = req.body

        if(email == undefined){
            res.status(400)
            res.json({err:'E mail invalido'})
            return
        }else{
            var findEmail = await User.findEmail(email)
            if(findEmail){
                res.status(409)
                res.send('Esse Email Ja foi cadastrado')
                
            }else{
                await User.new(name,email,pass)
                res.status(200)
                res.send('Ok')
                
            }
           
            
        }  
    }
}
module.exports = new UserController