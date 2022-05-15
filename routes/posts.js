var express = require('express');
var router = express.Router();
const {asyncErrorHandler} = require('../util/tool.js')
const Post = require("../model/postsModel.js")
const postAPI= require("../controller/postMethod.js")

/* GET home page. */
router.get('/',async function(req, res, next) {
  try {
    await postAPI.findPost({req,res});
  }catch(err){
    postAPI.notFound({err,res})
  }
});

router.post('/',async function(req, res, next) {
  try {
    await postAPI.createPost({req,res});    
  }catch(err){
    postAPI.notFound({err,res})
  }
});

router.delete('/:id',async function(req, res, next) {
  try {
    await postAPI.deleteByID({req,res})
  }catch(err){
    postAPI.notFound({err,res})
  }
});

router.delete('/',async function(req, res, next) {
  try {
    await postAPI.deleteAll({req,res})
  }catch(err){
    postAPI.notFound({err,res})
  }
});

router.patch('/:id',async function(req, res, next) {
  try {
    let {id} = req.params;
    let edit = req.body;
    let data = await Post.findByIdAndUpdate(id,edit,{ runValidators: true,new: true });
    responseHandler(res,data,200);
  }catch(err){
    postAPI.notFound({err,res})
  }
});

module.exports = router;
