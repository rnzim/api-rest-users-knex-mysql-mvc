const express = require('express')
const router = express.Router()
const HomeControler = require('../controllers/HomeController.js')
const UserController = require('../controllers/UserController.js')
const adminAuth = require('../middleware/AdminAuth.js')

router.get('/',HomeControler.index)
router.get('/user',adminAuth,UserController.index)
router.get('/user/:id',adminAuth,UserController.findUser)
router.post('/',adminAuth,UserController.create)
router.post('/recovery',UserController.recoveryPass)
router.post('/cpass',UserController.chargePassword)
router.post('/login',UserController.login)
router.put('/user',adminAuth,UserController.edit)
router.delete('/user/:id',adminAuth,UserController.delete)

module.exports = router