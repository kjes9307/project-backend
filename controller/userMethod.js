const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {ImgurClient} = require("imgur");
const User = require('../model/userModel.js')
const Post = require('../model/postsModel.js')
const Track = require('../model/trackModel.js')
const Follow = require('../model/followModel.js')
const {tokenGenerator,appError,responseHandler} = require("../util/tool")
const userService = {
    register : async(req,res,next) =>{
        let { email, password,confirmPassword,name } = req.body;
        // 內容不可為空
        if(!email||!password||!confirmPassword||!name){
          return next(appError(400,"欄位未填寫正確！",next,res));
        }
        // 信箱已經被註冊
        const user = await User.findOne({ email }).select("+ email")
        if(user){
          return next(appError(400,"信箱已被註冊！",next,res));
        }
        // 密碼正確
        if(password!==confirmPassword){
          return next(appError(400,"密碼不一致！",next,res));
        }
        // 密碼 6 碼以上
        if(!validator.isLength(name,{min:2})){ 
          return next(appError(400,"暱稱必須包含兩個字元",next,res));
        }
        // 密碼 6 碼以上
        if(!validator.isLength(password,{min:6})){
          return next(appError(400,"密碼字數低於 6 碼",next,res));
        }
        // 密碼只能是英文OR數字
        if(!validator.isAlphanumeric(password)){
          return next(appError(400,"密碼只能包含英文或數字",next,res));
        }
        // 是否為 Email
        if(!validator.isEmail(email)){
          return next(appError(400,"Email 格式不正確" ,next,res));
        }
        
        // 加密密碼
        password = await bcrypt.hash(req.body.password,12);
        const createUser = await User.create({
          email,
          password,
          name
        });
        let resData = {
          name: createUser.name,
          sex: "",
          photo: ""
        }
        responseHandler(res,resData,201)
    },
    login : async(req,res,next)=>{
        const { email, password } = req.body;
        if (!email.trim()) {
          return next(appError( 400,'帳號不可為空',next,res));
        }
        if (!email || !password) {
          return next(appError( 400,'帳號密碼不可為空',next,res));
        }
        const user = await User.findOne({ email }).select('+password');
        if(!user){
          return next(appError(400,'使用者信箱不存在',next,res));
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth){
          return next(appError(400,'您的密碼不正確',next,res));
        }
        tokenGenerator(user,200,res);
    },
    resetPassWord : async (req,res,next) => {
      let {password,newPassword,email} = req.body;
      const confirmPassword = newPassword;
      const id = req.user._id
      const user = await User.findOne({ _id: id }).select('+email');
      if(user.email !== email){
        return next(appError( 400,"人員信箱比對錯誤",next,res));
      }
      if (!password) {
        return next(appError( 400,"密碼不可為空",next,res));
      }
      // 密碼只能是英文OR數字
      if(!validator.isAlphanumeric(password)){
        return next(appError(400,"密碼只能包含英文或數字",next,res));
      }
      if(password!==confirmPassword){
        return next(appError(400,"密碼不一致！",next,res));
      }
      if(!validator.isLength(confirmPassword,{min:6})){
        return next(appError(400,"密碼字數低於 6 碼",next,res));
      }
      confirmPassword = await bcrypt.hash(confirmPassword,12);
 
      let data = await User.findByIdAndUpdate(id,{password: confirmPassword},{ runValidators: true,new: true });
      responseHandler(res,data,200);
    },
    getProfile : async (req,res,next) => {
      const id = req.user._id
      const user = await User.findOne({ _id: id });
      responseHandler(res,user,200);

    },
    updateProfile : async (req,res,next) => {
      const id = req.user._id
      const user = await User.findOne({ _id: id });
      if(!req.body.name.trim()){
        return next(appError(400,"暱稱不得為空",next,res));
      }
      if(!validator.isLength(req.body.name,{min:2})){ 
        return next(appError(400,"暱稱必須包含兩個字元",next,res));
      }
      let newEdit ={
        sex : req.body.sex,
        name : req.body.name,
        photo : req.body.photo
      }
      let data = await User.findByIdAndUpdate(user._id,newEdit,{ runValidators: true,new: true });
      responseHandler(res,data,200)

    },
    uploadImg: async(req,res,next)=>{
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
    },
    getLikeList : async (req,res,next)=>{
      // 按讚紀錄顯示
      const data = await Post.find({
        likes: { $in: [req.user._id] }
      }).select("_id user createAt").populate({
        path:"user",
        select:"name _id photo likes"
      });
      if(data.length===0) return responseHandler(res,data,200)
      responseHandler(res,data,200)
    },
    getUserPost : async (req,res,next)=>{
      const timeSort = req.query.timeSort == "asc" ? "createAt":"-createAt"
      let obj = {};
      obj['user'] = { _id: req.query._id}
      if(req.query.key !== undefined) obj['content'] = new RegExp(req.query.key); 

      const data = await Post.find(obj).populate({
        path:"user",
        select:"name _id photo likes"
      }).populate({
        path: 'comments',
        select: 'userComment user createTime -post'
      }).sort(timeSort);
      if(data.length===0) return responseHandler(res,data,200)
      responseHandler(res,data,200)
    },
    addTrack : async (req,res,next)=>{
      let reqData = req.body.followID;
      let isTrackExist = await Track.find({user:req.user._id});
      let data;
      let User = req.user._id
      if(isTrackExist.length ===0){
        data = await Track.create({
          followList: [reqData],
          user: User
        })
      }else{
        data = await Track.findOneAndUpdate(
          { user: User},
          { $addToSet: { followList: reqData } },
          { runValidators: true,new: true }
        )
      }
      responseHandler(res,data,200)
    },
    cancelTrack : async (req,res,next)=>{
      let reqData = req.body.unfollowID;
      let User = req.user._id
      data = await Track.findOneAndUpdate(
        { user: User},
        { $pull: { followList: reqData } },
        { runValidators: true,new: true }
      )
      responseHandler(res,data,200)
    },
    getTrackList : async(req,res,next)=>{
      let User = req.user._id
      let data = await Track.find({user:User}).populate({
        path:"followList",
        populate: {
           path: '_id', 
           select: "name _id photo"
        }
      });
      responseHandler(res,data,200)

    },
    addFollwer : async(req,res,next) =>{
      let reqData = req.body.followID;
      let followerID = req.user._id

      // 被追蹤 表示+1
      let data;
      let isFollowCreated = await Follow.find({user:reqData._id});
      if(isFollowCreated.length ===0){
        data = await Follow.create({
          follower: followerID,
          user: reqData._id
        })
      }else{
        data = await Follow.findOneAndUpdate(
          { user: reqData._id},
          { $addToSet: { follower: followerID } },
          { runValidators: true,new: true }
        )
      }
      responseHandler(res,data,200)
    },
    minusFollower : async(req,res,next) =>{
      let reqData = req.body.unfollowID;
      let followerID = req.user._id
      let data = await Follow.findOneAndUpdate(
        { user: reqData._id},
        { $pull: { follower: followerID } },
        { runValidators: true,new: true }
      )
      responseHandler(res,data,200)
    },
    getFollower : async(req,res,next) =>{
      let data = 
        await Follow.find({user :req.query._id})
        .populate({
          path: 'user',
          select:'name'
        }).populate({
          path: 'follower',
          select: 'name'
        });
      responseHandler(res,data,200);
    },
    checkToken : async (req,res,next) =>{
      const {email} = req.body
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }
      if (!token) {
        return next(appError(401,'你尚未登入！',next,res));
      }
  
    // 驗證 token 正確性
      const decoded = await new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
          if(err){
            reject(err)
          }else{
            resolve(payload)
          }
        })
      })
      const currentUserEmail = await User.findById(decoded.id).select("email")
      if(currentUserEmail!==email){
        return next(appError(401,'用戶信息不一致',next,res))
      }
      let data = {"isTokenValid" : true}
      
    responseHandler(res,data,200);
    }
}



module.exports = userService;