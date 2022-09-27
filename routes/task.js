const express = require('express');
const {asyncErrorHandler} = require('../util/tool');
const isAuth = require("../util/auth")
const router = express.Router();
const taskAPI = require('../controller/taskMethod')

router.get('/project', asyncErrorHandler(taskAPI.projectData))
router.get('/project/:id', asyncErrorHandler(taskAPI.getProjectDetail))
router.get('/users', asyncErrorHandler(taskAPI.testUser))

router.post('/addProject',asyncErrorHandler(taskAPI.addProj))
router.patch('/editProject/:id',asyncErrorHandler(taskAPI.editProj))
router.patch('/editPin/:id',asyncErrorHandler(taskAPI.editPin))

router.get('/getKanBan/:id/Event',asyncErrorHandler(taskAPI.getKanBan))
router.put('/statusSwitch',asyncErrorHandler(taskAPI.editStatus))
router.post('/addKanBan',isAuth,asyncErrorHandler(taskAPI.addKanBan))
router.delete('/deleteKanBan/:id',isAuth,asyncErrorHandler(taskAPI.deleteKanBan))

router.post('/addTask',isAuth,asyncErrorHandler(taskAPI.addTask))
router.patch('/editTask',isAuth,asyncErrorHandler(taskAPI.editTask))
router.delete('/deleteTask/:id',isAuth,asyncErrorHandler(taskAPI.deleteTask))
router.get('/getTask/:id',asyncErrorHandler(taskAPI.getTask))

router.post('/addTodo/:id',asyncErrorHandler(taskAPI.addList))

module.exports = router;