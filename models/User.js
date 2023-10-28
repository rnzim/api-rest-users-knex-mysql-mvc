const knex = require('knex')
const connection = require('../database/database')
const bcrypt = require('bcrypt')
const { findUser } = require('../controllers/UserController')

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
  async findAll(){
     try{
        var result = await connection.select("id","name","email","role").table("users")
        return result
     }
     catch(e){
        console.log(e)
        return []
     }
     
  }
  async findById(id){
      try{
        var result = await connection.select("id","name","email","role").table("users").where({id:id})
        if(result.length > 0){
            return result[0]
        }
        

      } catch(e){
         console.log(e)
         return []
      }    
  }
  async update(id, name, email, role = 0) {
    
     try {
        var user = await this.findById(id)
        if(user == undefined){
           return {status:false,err:'User Not Exists',user:[]}     
        }else{
            var editUser = {name,email,role}
            name == undefined ?editUser.name = user.name : editUser.name = name
            email == undefined ?editUser.email = user.email : editUser.email = email 
            role == undefined ?editUser.role = user.role : editUser.role = role
            
            var result = await connection.update(editUser).where({id:id}).table("users")
            return result
        }
     } catch (error) {
        console.log(error)
     }
    
  }
}

module.exports = new User