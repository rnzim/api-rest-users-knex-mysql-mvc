const knex = require('knex')
const connection = require('../database/database')
const bcrypt = require('bcrypt')

class User{

    async new(name,email,pass,role=0){
        try {
            var hash =  await bcrypt.hashSync(pass,12)
            await connection.insert({name,pass:hash,email,role}).table('users')
            
        } catch (error) {
            console.log(error)
        }
       
    }
    async findEmail(email){
        var email =  await connection.select("email").where({email:email}).table('users')
        if(email.length === 0){
           return false
        }else{
            return true
        }
        
   }
  async findUser(){
     try{
        
     }
     catch(e){
        return []
     }
     
  }
}

module.exports = new User