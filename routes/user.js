const express = require('express');
const userService = require('../controller/userMethod')
const upload = require('../util/upload');
const {asyncErrorHandler} = require('../util/tool');
const router = express.Router();

router.post('/register', asyncErrorHandler(async (req,res,next)=>{
    console.log("@user 葉面")
    await userService.register({req,res,next});
}))

router.post('/login', asyncErrorHandler(async(req,res,next)=>{
    await userService.login({req,res,next})
}))

router.post('/uploadImg',upload,((req,res,next)=>{
    userService.uploadImg({req,res,next})
}))

module.exports = router
