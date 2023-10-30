const connection = require('../database/database')
const User = require('../models/User')
class PasswordToken{
    async create(email){
          var result =  await User.findByEmail(email)
          if(result != undefined){
                var user = 
                {
                user_id:result.id,
                token:'nodkrnzimtoken'+Date.now(),
                used:0 
                }
                try {
                    await connection.insert(user).table("passtoken")
                    return {status:true,token:user.token}
                } catch (error) {
                    console.log('\u001b[35m'+error)
                    return {status:false,err:error}
                }
             
          }else{
            return {status:false,err:"O E-mail Não exite"}
          }
    }
    async validate(token){
        var result = await connection.select("*").where({token:token}).table("passtoken")
        if(result.length > 0){
           let token = result[0]
           if(token.used){
            return {status:false,token}
           }else{
             return {status:true,token}
           }
        }else{
            return false
        }
    }
    async setUsed(token){
        await connection.update({used:1}).where({token:token.token}).table('passtoken')
    }
}

module.exports = new PasswordToken