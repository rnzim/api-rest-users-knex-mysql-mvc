class HomeControler{

    async index(req,res){
        res.send('home')
    }

}


module.exports = new HomeControler