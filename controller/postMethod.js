const Post = require("../model/postsModel.js")
const {responseHandler,errorHandler,checkInput} = require("../util/tool")
let postAPI = {
    findPost : async ({req,res})=>{
        try{
            const data = await Post.find();
            responseHandler(res,data,200);
        }catch(error){
            errorHandler(res,error,404);
        }
    },
    createPost : async ({req,res})=>{
        try{
            let addPost = req.body
            checkInput(addPost)
            let resData = await Post.create(
                {
                    name: addPost.name,
                    content: addPost.content,
                    likes: addPost.likes
                }
            )
            responseHandler(res,resData,200);

        }catch(error){
            console.log(error.message);
            errorHandler(res,error,404);
        }
    },
    deleteAll : async ({req,res})=>{
        const data = await Post.deleteMany();
        responseHandler(200,[],res);
    },
    deleteByID : async ({req,res})=>{
        try{
            let {id} = req.params;
            let data = await Post.findByIdAndDelete(id);
            if(data !== null){
                responseHandler(res,data,200);
            }else{
                throw "id not found"
            }
        }catch(error){
            errorHandler(res,error,404);
        };
    },
    editPost : async ({req,res})=>{
        try{
            let {id} = req.params;
            let edit = req.body;
            checkInput(edit);
            let data = await Post.findByIdAndUpdate(id,edit,{ runValidators: true,new: true });
            if(data !== null){
                responseHandler(res,data,200);
            }else{
                throw "id not found"
            }
        
        }catch(error){
            errorHandler(res,error,404);
        };
    },
    notFound : ({err,res})=>{
        console.log(err)
        errorHandler(res,err,401);
    }
}
module.exports= postAPI;