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
        }else{
            res.send('peguei a requisiçao')
        }
       
    }
}
module.exports = new UserController