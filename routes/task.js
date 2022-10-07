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
router.delete('/deleteProject/:id',asyncErrorHandler(taskAPI.deleteProj))
router.patch('/editPin/:id',asyncErrorHandler(taskAPI.editPin))

router.get('/getKanBan/:id/Event',asyncErrorHandler(taskAPI.getKanBan))
router.get('/getKanBanSingle/:id',asyncErrorHandler(taskAPI.getKanBanInfo))
router.put('/statusSwitch',asyncErrorHandler(taskAPI.editStatus))
router.post('/addKanBan',isAuth,asyncErrorHandler(taskAPI.addKanBan))
router.delete('/deleteKanBan/:id',isAuth,asyncErrorHandler(taskAPI.deleteKanBan))

router.post('/addTask',isAuth,asyncErrorHandler(taskAPI.addTask))
router.patch('/editTask',isAuth,asyncErrorHandler(taskAPI.editTask))
router.delete('/deleteTask/:id',isAuth,asyncErrorHandler(taskAPI.deleteTask))
router.get('/getTask/:id',asyncErrorHandler(taskAPI.getTask))

router.post('/addTodo/:id',asyncErrorHandler(taskAPI.addList))
router.patch('/editTodo',asyncErrorHandler(taskAPI.editList))
router.delete('/deleteTodo',asyncErrorHandler(taskAPI.delList))

router.patch('/editComment',isAuth,asyncErrorHandler(taskAPI.editComment))
router.post('/addComment',isAuth,asyncErrorHandler(taskAPI.addComment))
router.delete('/deleteComment',isAuth,asyncErrorHandler(taskAPI.deleteComment))

router.post('/addMember',asyncErrorHandler(taskAPI.addTaskMember))
router.get('/getMember/:id',asyncErrorHandler(taskAPI.getTaskMember))
router.delete('/delMember',asyncErrorHandler(taskAPI.delTaskMember))

router.post('/addPhoto',asyncErrorHandler(taskAPI.addPhoto))
router.get('/getPhoto/:id',asyncErrorHandler(taskAPI.getTaskPhoto))
router.delete('/delPhoto',asyncErrorHandler(taskAPI.delPhoto))


module.exports = router;