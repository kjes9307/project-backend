const express = require('express');
const userService = require('../controller/userMethod')
const upload = require('../util/upload');
const {asyncErrorHandler} = require('../util/tool');
const isAuth = require("../util/auth")
const router = express.Router();

router.post('/register', asyncErrorHandler(userService.register))

router.post('/login', asyncErrorHandler(userService.login))

router.post('/reset', isAuth, asyncErrorHandler(userService.resetPassWord))

router.get('/profile', isAuth, asyncErrorHandler(userService.getProfile))

router.patch('/updateUser', isAuth, asyncErrorHandler(userService.updateProfile))
    
router.post('/uploadImg',isAuth,upload,asyncErrorHandler(userService.uploadImg))

module.exports = router
