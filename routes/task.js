const express = require('express');
const {asyncErrorHandler} = require('../util/tool');
// const isAuth = require("../util/auth")
const router = express.Router();
const taskAPI = require('../controller/taskMethod')

router.get('/project', asyncErrorHandler(taskAPI.projectData))
router.get('/users', asyncErrorHandler(taskAPI.testUser))
router.post('/addTask',asyncErrorHandler(taskAPI.addTask))
module.exports = router;