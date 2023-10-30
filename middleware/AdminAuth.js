const jwt = require('jsonwebtoken')
const secret = 'miznr'
module.exports = (req,res,next)=>{

    const auth = req.headers['authorization']
    if(auth != undefined){
        const bearer = auth.split(" ")
        var token = bearer[1]
        try {
            var result = jwt.verify(token,secret)
            if(result == undefined){
                res.status(401).send('token inexistente')
                return
            }else{
                if(result.role == 1){
                    next()
                }else{
                    res.status(403).send('Voce nao tem permisao para acessar essa rota')
                    return
                }
               
            }
            
        } catch (error) {
            console.log(error)
            res.status(400).send('token inexistente ou invalido')
            return
        }
       
       
    }else{
        res.status(403).send('Nao esta authenticado')
        return
    }

}