const Post = require("../model/postsModel.js")
const User = require("../model/userModel.js")

const {responseHandler,checkInput,appError} = require("../util/tool")

let postAPI = {
    findPost : async (req,res,next)=>{
        const timeSort = req.query.timeSort == "asc" ? "createAt":"-createAt"
        const key = req.query.key !== undefined ? {"content": new RegExp(req.query.key)} : {};    
        const data = await Post.find(key).populate({path:'user',select:'name photo'}).sort(timeSort);
        responseHandler(res,data,200);
    },
    createPost : async (req,res,next)=>{
            let addPost = req.body
            let userInfo = req.user;
            addPost.name = userInfo.name; // for checkInput
            checkInput(addPost,res,next)
            let resData = await Post.create(
                {
                    name: userInfo.name,
                    content: addPost.content,
                    likes: addPost.likes,
                    tags: addPost.tags,
                    type: addPost.type,
                    user: userInfo._id,
                    image : addPost.image
                }
            )
            responseHandler(res,resData,200);
    },
    deleteAll : async (req,res,next)=>{
        await Post.deleteMany();
        responseHandler(res,[],200);
    },
    deleteByID : async (req,res,next)=>{
        let {id} = req.params;
        let data = await Post.findByIdAndDelete(id);
        if(data !== null){
            responseHandler(res,data,200);
        }else{
            return next(appError("404","IdNotFound",next,res));
        }
    },
    editPost : async (req,res,next)=>{
            let {id} = req.params;
            let edit = req.body;
            checkInput(edit,res,next);
            let data = await Post.findByIdAndUpdate(id,edit,{ runValidators: true,new: true });
            if(data !== null){
                responseHandler(res,data,200);
            }else{
                return next(appError("404","IdNotFound",next,res));
            }
    }
}
module.exports= postAPI;