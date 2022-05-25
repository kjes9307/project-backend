const validator = require('validator');
const bcrypt = require('bcryptjs');
const {ImgurClient} = require("imgur");
const User = require('../model/userModel.js')
const {tokenGenerator,appError,responseHandler} = require("../util/tool")
const userService = {
    register : async({req,res,next}) =>{
        let { email, password,confirmPassword,name } = req.body;
        let err = new Error()
        // 內容不可為空
        if(!email||!password||!confirmPassword||!name){
          err.name = "欄位未填寫正確！"
          return next(appError(400,err,next,res));
        }
        // 信箱已經被註冊
        const user = await User.findOne({ email }).select("+ email")
        if(user){
          err.name = "信箱已被註冊！"  
          return next(appError(400,"信箱已被註冊！",next,res));
        }
        // 密碼正確
        if(password!==confirmPassword){
          err.name = "密碼不一致！"  
          return next(appError(400,"密碼不一致！",next,res));
        }
        // 密碼 8 碼以上
        if(!validator.isLength(password,{min:6})){
          err.name = "密碼字數低於 6 碼" 
          return next(appError(400,err,next,res));
        }
        // 是否為 Email
        if(!validator.isEmail(email)){
          err.name = "Email 格式不正確" 
          return next(appError(400,err,next,res));
        }
        
        // 加密密碼
        password = await bcrypt.hash(req.body.password,12);
        const createUser = await User.create({
          email,
          password,
          name
        });
        tokenGenerator(createUser,201,res);
    },
    login : async({req,res,next})=>{
        const { email, password } = req.body;
        let err = new Error()
        if (!email || !password) {
          err.name = "帳號密碼不可為空" 
          return next(appError( 400,'帳號密碼不可為空',next,res));
        }
        const user = await User.findOne({ email }).select('+password');
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
          err.name = '您的密碼不正確'  
          return next(appError(400,err,next,res));
        }
        tokenGenerator(user,200,res);
    },
    resetPassWord : async ({req,res,next}) => {
      let {password,newPassword,email} = req.body;
      const id = req.user._id
      const user = await User.findOne({ _id: id }).select('+email');
      let err = new Error()
      if(user.email !== email){
        err.name = "人員信箱比對錯誤" 
        return next(appError( 400,err,next,res));
      }

      if (!password) {
        err.name = "密碼不可為空" 
        return next(appError( 400,err,next,res));
      }

      if(password!==newPassword){
        err.name = "密碼不一致！"  
        return next(appError(400,err,next,res));
      }
      if(!validator.isLength(newPassword,{min:6})){
        err.name = "密碼字數低於 6 碼" 
        return next(appError(400,err,next,res));
      }
      newPassword = await bcrypt.hash(newPassword,12);
 
      let data = await User.findByIdAndUpdate(id,{password: newPassword},{ runValidators: true,new: true });
      responseHandler(res,data,200);
    },
    getProfile : async ({req,res,next}) => {
      const id = req.user._id
      const user = await User.findOne({ _id: id });
      responseHandler(res,user,200);

    },
    updateProfile : async ({req,res,next}) => {
      const id = req.user._id
      const user = await User.findOne({ _id: id });
      let newEdit ={
        sex : req.body.sex,
        name : req.body.name,
        photo : req.body.photo
      }
      let data = await User.findByIdAndUpdate(user._id,newEdit,{ runValidators: true,new: true });
      responseHandler(res,data,200)

    },
    uploadImg: async({req,res,next})=>{
      if(req.files.length === 0){
        return next(appError(400,"檔案未上傳",next))
      }
    
      const client = new ImgurClient({
        clientId: process.env.imgur_client_id,
        clientSecret: process.env.imgur_secret,
        refreshToken: process.env.imgur_refresh_token,
      });

      const response = await client.upload({
        image: req.files[0].buffer.toString('base64'),
        type: 'base64',
        album: process.env.imgur_alubm_id
      });
      if(response.status === 200) {
        let url = response.data.link || ""
        return responseHandler(res,{url},200);
      }else{
        return next(appError(400,"檔案上傳發生錯誤",next))
      }
    }
}



module.exports = userService;