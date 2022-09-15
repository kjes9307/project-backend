const Proj = require('../model/testUserModel.js')
const userProject = require('../model/projectModel.js')
const Task = require('../model/taskModel.js')
const Kanban = require('../model/kanbanModel.js')
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
    addProj:async(req,res,next) =>{
        let addTask = req.body
        console.log(addTask)
        let resData = await Proj.create({name:addTask.name})
        responseHandler(res,resData,201);
    },
    editProj : async (req,res,next) =>{
            let edit = req.body;
            let data = await Proj.findByIdAndUpdate(edit._id,{name: edit.name},{ runValidators: true,new: true });
            if(data !== null){
                responseHandler(res,data,200);
            }else{
                return next(appError("404","IdNotFound",next,res));
            }
    }
    ,deleteProj : async (req,res,next) =>{
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
    getKanBan : async (req,res,next) =>{
        let {id} = req.body;
        let data = await Kanban.find({projectId:id}).populate({
            path:'alltask',
            select:'taskName type status'
        })
        if(data !== null){
            responseHandler(res,data,200);
        }else{
            return next(appError("404","IdNotFound",next,res));
        }
    },
    editStatus : async (req,res,next) =>{
        let {id,newStatus} = req.body;
        let data = await Task.findByIdAndUpdate({_id:id},{status: newStatus},{ runValidators: true,new: true });
        if(data !== null){
            responseHandler(res,data,200);
        }else{
            return next(appError("404","IdNotFound",next,res));
        }
    }
}

module.exports =  taskService