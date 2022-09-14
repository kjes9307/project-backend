const Proj = require('../model/testUserModel.js')
const userProject = require('../model/projectModel.js')
const {tokenGenerator,appError,responseHandler} = require("../util/tool")

let taskService = {
    projectData: async(req,res,next)=>{
        let name = req.query.name !== undefined ? {"name": new RegExp(req.query.name)} : {}; 
        let id = req.query.personId !== undefined ? {"personId": req.query.personId} : {}; 
        let obj = {...name,...id}
        const data = await Proj.find(obj).sort("_id")
        responseHandler(res,data,200)

    },
    getProjectDetail: async(req,res,next)=>{
        const editId = req.params.id;
        const data = await Proj.find({_id:editId})
        responseHandler(res,data,200)

    },
    testUser:async(req,res,next)=>{
        const data = await userProject.find().sort("id")
        responseHandler(res,data,200)
    },
    addTask:async(req,res,next) =>{
        let addTask = req.body
        console.log(addTask)
        let resData = await Proj.create({name:addTask.name})
        responseHandler(res,resData,201);
    },
    editTask : async (req,res,next) =>{
            let edit = req.body;
            let data = await Proj.findByIdAndUpdate(edit._id,{name: edit.name},{ runValidators: true,new: true });
            if(data !== null){
                responseHandler(res,data,200);
            }else{
                return next(appError("404","IdNotFound",next,res));
            }
    }
    ,deleteTask : async (req,res,next) =>{
        let {id} = req.params;
        let data = await Proj.findByIdAndDelete(id);
        if(data !== null){
            responseHandler(res,data,200);
        }else{
            return next(appError("404","IdNotFound",next,res));
        }
    },
    editPin : async (req,res,next)=>{
            let edit = req.body;
            let data = await Proj.findByIdAndUpdate(edit._id,{pin: edit.pin},{ runValidators: true,new: true });
            if(data !== null){
                responseHandler(res,data,200);
            }else{
                return next(appError("404","IdNotFound",next,res));
            }
    },
    getTaskDetail : async (req,res,next)=>{
        let {id: taskId } = req.body
        let data = await Proj.find(taskId)
        if(data !== null){
            responseHandler(res,data,200);
        }else{
            return next(appError("404","IdNotFound",next,res));
        }
    
    }
}

module.exports =  taskService