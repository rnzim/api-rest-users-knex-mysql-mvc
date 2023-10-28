const User = require('../models/User')
class UserController{
    async index(req,res){
        var users = await User.findAll()
        res.json(users)
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
    async findUser(req,res){
        var id = req.params.id
        var result = await User.findById(id)
        if(result == undefined){
            res.status(404)
            res.json({})
        }else{
            res.json(result)
        }
        
    }
    async edit(req,res){
        var {id,name,email,role} = req.body

        var result = await User.update(id,name,email,role) 

        if(result.status == false){
            res.status(404)
            res.send('not found')
        }else{
            res.status(200)
            res.json({result,status:true})
        }
       
    }
}
module.exports = new UserController