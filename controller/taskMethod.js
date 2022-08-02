const TestUser = require('../model/testUserModel.js')
const Project = require('../model/projectModel.js')
const {tokenGenerator,appError,responseHandler} = require("../util/tool")

let taskService = {
    projectData: async(req,res,next)=>{
        let key = req.query.key !== undefined ? {"id": req.query.key} : {}; 
        const data = await Project.find(key)
        responseHandler(res,data,200)

    },
    testUser:async(req,res,next)=>{
        let key = req.query.key !== undefined ? {"personId": req.query.key} : {}; 
        const data = await TestUser.find(key)
        responseHandler(res,data,200)
    }
}

module.exports =  taskService