const express = require('express');
const router = express.Router();
const {asyncErrorHandler, appError} = require('../util/tool.js')
const isAuth = require("../util/auth")
const postAPI= require("../controller/postMethod.js")

/* GET home page. */
router.get('/',isAuth,asyncErrorHandler(async function(req, res, next) {
    await postAPI.findPost({req,res,next});
}));

router.post('/',isAuth,asyncErrorHandler(async function(req, res, next) {
    await postAPI.createPost({req,res,next});    
}));

router.delete('/:id',asyncErrorHandler(async function(req, res, next) {
    await postAPI.deleteByID({req,res,next})
}));

router.delete('/',asyncErrorHandler(async function(req, res, next) {
    await postAPI.deleteAll({req,res,next})
}));

router.patch('/:id',asyncErrorHandler(async function(req, res, next) {
    await postAPI.editPost({req,res,next})
}));

module.exports = router;
