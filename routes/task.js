const express = require('express');
const {asyncErrorHandler} = require('../util/tool');
// const isAuth = require("../util/auth")
const router = express.Router();
const taskAPI = require('../controller/taskMethod')

router.get('/project', asyncErrorHandler(taskAPI.projectData))
router.get('/project/:id', asyncErrorHandler(taskAPI.getProjectDetail))
router.get('/users', asyncErrorHandler(taskAPI.testUser))

router.post('/addProject',asyncErrorHandler(taskAPI.addProj))
router.patch('/editProject/:id',asyncErrorHandler(taskAPI.editProj))
router.patch('/editPin/:id',asyncErrorHandler(taskAPI.editPin))

router.get('/getKanBan',asyncErrorHandler(taskAPI.getKanBan))
module.exports = router;