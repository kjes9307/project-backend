const express = require('express');
const router = express.Router();
const {asyncErrorHandler, appError} = require('../util/tool.js')
const isAuth = require("../util/auth")
const postAPI= require("../controller/postMethod.js")

/* GET home page. */
router.get('/',isAuth,asyncErrorHandler(async function(req, res, next) {
    /**
     * #swagger.tags=['Post'] 
     * #swagger.description = '取得貼文'
     * #swagger.security = [{
        'apiAuth' : [] 
       }]
     * #swagger.parameters['body'] = {
     
       }
     * #swagger.responses[200] = {
            description : 'some api info',
            schema: {
                'status' : true,
                'data': [
                    {
                        '_id': '628dbcf49adbd24a2c962de1',
                        'name': '大帥哥中的大帥哥',
                        'user': {
                            '_id': '6283a064261ad96649ea9d05',
                            'name': '大帥哥中的大帥哥',
                            'photo': 'https://i.imgur.com/JhstGJB.png'
                        },
                        'tags': '["心情"]',
                        'type': 'group',
                        'image': 'https://i.imgur.com/q3NHdNn.jpg',
                        'content': 'test',
                        'likes': 0,
                        'comments': 0,
                        'createAt': '2022-05-25T05:21:56.851Z'
                    }
                ]
            }
        }
     */
    await postAPI.findPost({req,res,next});
}));

router.post('/',isAuth,asyncErrorHandler(async function(req, res, next) {
    /**
     * #swagger.tags=['Post'] 
     * #swagger.description = '新增貼文'
     * #swagger.security = [{
        'apiAuth' : [] 
       }]
     * #swagger.parameters['body'] = {
            in : 'body',
            type: 'object',
            required : true,
            description: '格式',
            schema : {
            '$content': '你的小老虎上限拉',
            '$tags' : '心情',
            '$type' : 'group'
            }
       }
     * #swagger.responses[200] = {
            description : 'add',
            schema: {
                'status' : true,
                'data': [
                    {
                        '_id': '628dbcf49adbd24a2c962de1',
                        'name': '大帥哥中的大帥哥',
                        'user': {
                            '_id': '6283a064261ad96649ea9d05',
                            'name': '大帥哥中的大帥哥',
                            'photo': 'https://i.imgur.com/JhstGJB.png'
                        },
                        'tags': '["心情"]',
                        'type': 'group',
                        'image': 'https://i.imgur.com/q3NHdNn.jpg',
                        'content': 'test',
                        'likes': 0,
                        'comments': 0,
                        'createAt': '2022-05-25T05:21:56.851Z'
                    }
                ]
            }
        }
     */
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
