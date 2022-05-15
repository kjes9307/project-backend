var express = require('express');
var router = express.Router();
const {asyncErrorHandler, appError} = require('../util/tool.js')
const Post = require("../model/postsModel.js")
const postAPI= require("../controller/postMethod.js")

/* GET home page. */
router.get('/',async function(req, res, next) {
  try {
    await postAPI.findPost({req,res});
  }catch(err){
    next(appError(404,"Not Found",next,res));
  }
});

router.post('/',async function(req, res, next) {
  try {
    await postAPI.createPost({req,res});    
  }catch(err){
    next(appError(404,msg = err.name,next,res))
  }
});

router.delete('/:id',async function(req, res, next) {
  try {
    await postAPI.deleteByID({req,res})
  }catch(err){
    next(appError(404,msg = err.name,next,res))
  }
});

router.delete('/',async function(req, res, next) {
  try {
    await postAPI.deleteAll({req,res})
  }catch(err){
    console.log(err)
    next(appError(404,"Not Found",next,res));
  }
});

router.patch('/:id',async function(req, res, next) {
  try {
    await postAPI.editPost({req,res})
  }catch(err){
    next(appError(404,msg = err.name,next,res))
  }
});

module.exports = router;
