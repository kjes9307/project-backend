const Post = require("../model/postsModel.js")
const {responseHandler,errorHandler,checkInput} = require("../util/tool")
let postAPI = {
    findPost : async ({req,res})=>{
            const data = await Post.find().populate({path:'user',select:'name photo'});
            responseHandler(res,data,200);
    },
    createPost : async ({req,res})=>{
            let addPost = req.body
            checkInput(addPost)
            let resData = await Post.create(
                {
                    name: addPost.name,
                    content: addPost.content,
                    likes: addPost.likes,
                    tags: addPost.tags,
                    type: addPost.type,
                    user: addPost.user
                }
            )
            responseHandler(res,resData,200);
    },
    deleteAll : async ({req,res})=>{
        await Post.deleteMany();
        responseHandler(res,[],200);
    },
    deleteByID : async ({req,res})=>{
        let {id} = req.params;
        let data = await Post.findByIdAndDelete(id);
        if(data !== null){
            responseHandler(res,data,200);
        }else{
            let err = new Error()
            err.name = "IdNotFound"
            throw err;
        }
    },
    editPost : async ({req,res})=>{
            let {id} = req.params;
            let edit = req.body;
            checkInput(edit);
            let data = await Post.findByIdAndUpdate(id,edit,{ runValidators: true,new: true });
            if(data !== null){
                responseHandler(res,data,200);
            }else{
                let err = new Error()
                err.name = "IdNotFound"
                throw err;
            }
    }
}
module.exports= postAPI;