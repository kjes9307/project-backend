const Proj = require('../model/testUserModel.js')
const userProject = require('../model/projectModel.js')
const {tokenGenerator,appError,responseHandler} = require("../util/tool")

let taskService = {
    projectData: async(req,res,next)=>{
        const idSort = "id"

        let name = req.query.name !== undefined ? {"name": new RegExp(req.query.name)} : {}; 
        let id = req.query.personId !== undefined ? {"personId": req.query.personId} : {}; 
        let obj = {...name,...id}
        const data = await Proj.find(obj).sort(idSort)
        console.log(data)
        responseHandler(res,data,200)

    },
    testUser:async(req,res,next)=>{
        const data = await userProject.find().sort("id")
        responseHandler(res,data,200)
    },
    addTask:async(req,res,next) =>{
        let addTask = req.body
        let resData = await Project.create(
            {
                name: addTask.name,
                id: addTask.id,

            }
        )
        responseHandler(res,resData,201);
    }
}

module.exports =  taskService