const express = require('express')
const router = express.Router()
const HomeControler = require('../controllers/HomeController.js')
const UserController = require('../controllers/UserController.js')


router.get('/',HomeControler.index)
router.get('/user',UserController.index)
router.get('/user/:id',UserController.findUser)
router.post('/',UserController.create)
router.put('/user',UserController.edit)

module.exports = router