const express = require('express');
const router = express.Router();
const isAuth = require("../util/auth")
const {asyncErrorHandler, appError} = require('../util/tool.js')
const chatAPI = require("../controller/chatMethod")
router.get('/getMsg',isAuth,asyncErrorHandler(async(req,res,next)=>{
    await chatAPI.getMsg(req,res,next);
}))

router.post('/sendMsg',isAuth,asyncErrorHandler(async(req,res,next)=>{
    await chatAPI.sendMsg({req,res,next});
}))

module.exports = router