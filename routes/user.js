const express = require('express');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../models/userModel');
const {tokenGenerator,appError,asyncErrorHandler} = require('../util/tool');
const router = express.Router();

router.post('/register', asyncErrorHandler(async(req, res, next) =>{
  let { email, password,confirmPassword,name } = req.body;
  // 內容不可為空
  if(!email||!password||!confirmPassword||!name){
    return next(appError("400","欄位未填寫正確！",next));
  }
  // 密碼正確
  if(password!==confirmPassword){
    return next(appError("400","密碼不一致！",next));
  }
  // 密碼 8 碼以上
  if(!validator.isLength(password,{min:6})){
    return next(appError("400","密碼字數低於 6 碼",next));
  }
  // 是否為 Email
  if(!validator.isEmail(email)){
    return next(appError("400","Email 格式不正確",next));
  }
  
  // 加密密碼
  password = await bcrypt.hash(req.body.password,12);
  const createUser = await User.create({
    email,
    password,
    name
  });
  tokenGenerator(createUser,201,res);
}))

router.post('/login',asyncErrorHandler(async(req,res,next)=>{
  const { email, password } = req.body;
  if (!email || !password) {
    return next(appError( 400,'帳號密碼不可為空',next));
  }
  const user = await User.findOne({ email }).select('+password');
  const auth = await bcrypt.compare(password, user.password);
  if(!auth){
    return next(appError(400,'您的密碼不正確',next));
  }
  tokenGenerator(user,200,res);
}))
