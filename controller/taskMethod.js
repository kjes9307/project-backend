const Proj = require('../model/testUserModel.js')
const userProject = require('../model/projectModel.js')
const Task = require('../model/taskModel.js')
const Kanban = require('../model/kanbanModel.js')
const {appError,responseHandler} = require("../util/tool")

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
        let {id} = req.params;
        let searchParam = req.query ? {match : req.query}: {};
        let baseConfig = {path:'alltask',select:'taskName type status taskCreator'}
        let config_1 = {...baseConfig,...searchParam}
        let data = await Kanban.find({projectId:id}).populate(config_1).populate({
            path: 'creator',
            select: 'name'
        })
        .sort("createAt")
        if(data !== null){
            responseHandler(res,data,200);
        }else{
            return next(appError("404","IdNotFound",next,res));
        }
    },
    addKanBan : async (req,res,next) =>{
        let addKanban = req.body;
        let creator = req.user._id;
        let newKanban = {...addKanban,creator}
        let data = await Kanban.create(newKanban)
        responseHandler(res,data,200);

    },
    editKanBan : async (req,res,next) =>{
        let newTaskInfo = req.body;
        let creator = req.user._id;
        let newTask = {...newTaskInfo,creator}
        let data = await Kanban.findByIdAndUpdate(newTask)
        responseHandler(res,data,200);

    },
    addTask : async (req,res,next) =>{
        let {kanbanId,projectId,taskName} = req.body;
        let addTask ={
            status: "idle",
            taskName,
            projectId,
            taskCreator: req.user._id
        }
        let data = await Task.create({...addTask})

        await Kanban.findOneAndUpdate(
            { _id:kanbanId},
            { $addToSet: { alltask: data._id } },
            { runValidators: true,new: true }
        )
        responseHandler(res,data,200);

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