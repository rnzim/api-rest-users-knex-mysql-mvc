const express = require('express')
const router = express.Router()
const HomeControler = require('../controllers/HomeController.js')
const UserController = require('../controllers/UserController.js')


router.get('/',HomeControler.index)
router.post('/',UserController.create)

module.exports = router