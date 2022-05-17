const express = require('express');
const router = express.Router();
const {asyncErrorHandler, appError} = require('../util/tool.js')
const postAPI= require("../controller/postMethod.js")

/* GET home page. */
router.get('/',async function(req, res, next) {
  try {
    await postAPI.findPost({req,res});
  }catch(err){
    next(appError(404,err,next,res));
  }
});

router.post('/',async function(req, res, next) {
  try {
    await postAPI.createPost({req,res});    
  }catch(err){
    next(appError(404,err,next,res))
  }
});

router.delete('/:id',async function(req, res, next) {
  try {
    await postAPI.deleteByID({req,res})
  }catch(err){
    next(appError(404,err,next,res))
  }
});

router.delete('/',async function(req, res, next) {
  try {
    await postAPI.deleteAll({req,res})
  }catch(err){
    next(appError(404,err,next,res));
  }
});

router.patch('/:id',async function(req, res, next) {
  try {
    await postAPI.editPost({req,res})
  }catch(err){
    next(appError(404,err,next,res))
  }
});

module.exports = router;
