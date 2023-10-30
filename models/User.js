const connection = require('../database/database')
const PasswordToken = require('../models/PasswordToken ')
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
  async findByEmail(email){
    try{
      var result = await connection.select("id","name","email","role","pass").table("users").where({email:email})
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
     var user = await this.findById(id);
     if (user == undefined) {
       return { status: false, err: 'User Not Exists', user: [] };
     } else {
       var editUser = {
         name: name == undefined ? user.name : name,
         email: email == undefined ? user.email : email,
         role: role == undefined ? user.role : role
       };
       if (user.email == email) {
         console.log('\u001b[33m Email duplo');
         return { status: false, err: 'Esse E-mail ja foi Utilizado' };
       } else {
         try {
           var result = await connection.update(editUser).where({ id: id }).table("users");
           console.log(result);
           return { status: true };
         } catch (error) {
           console.log(error);
           throw error; // Lança o erro para que o controlador possa tratá-lo.
         }
       }
     }
   } catch (error) {
     console.log(error);
     throw error; // Lança o erro para que o controlador possa tratá-lo.
   }
 }

 async delete(id){
   var result = await this.findById(id)
   if(result != undefined){
        try {
           await connection.delete().where({id:id}).table("users")
           return {status:true}
        } catch (error) {
            console.log(error)
            throw error
        }
   }else{
      return {status:false,err:'usuario Inexistente'}
   }
  }
  async alterpass(npass,id,token){
    var hash =  await bcrypt.hashSync(npass,11)
    try {
      await connection.update({pass:hash}).where({id:id}).table('users')
      await PasswordToken.setUsed(token)
    } catch (error) {
       console.log(error)
    }
   
  }
}

module.exports = new User