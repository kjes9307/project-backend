const express = require('express');
const userService = require('../controller/userMethod')
const upload = require('../util/upload');
const {asyncErrorHandler} = require('../util/tool');
const isAuth = require("../util/auth")
const router = express.Router();

router.post('/register', asyncErrorHandler(async (req,res,next)=>{
    await userService.register({req,res,next});
}))

router.post('/login', asyncErrorHandler(async(req,res,next)=>{
    await userService.login({req,res,next})
}))

router.post('/reset', isAuth, asyncErrorHandler(async(req,res,next)=>{
    await userService.resetPassWord({req,res,next})
}))

router.get('/profile', isAuth, asyncErrorHandler(async(req,res,next)=>{
    await userService.getProfile({req,res,next})
}))
    
router.post('/uploadImg',isAuth,upload,asyncErrorHandler(async(req,res,next)=>{
    await userService.uploadImg({req,res,next})
}))

module.exports = router
