var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { default: axios } = require('axios');
const dotenv = require("dotenv");
const {errorResponse,appError,errorResponseDEV} = require('./util/tool')
require('./connect')
dotenv.config({path :"./config.env"});
var postRouter = require('./routes/posts');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./util/exceptionHandle')

// app.use('/', indexRouter);
app.use('/posts', postRouter);

app.use((req,res,next)=>{
    console.log("@404路由");
    appError(404,"URL Not Found",next,res)
})

app.use((err,req,res,next)=>{
    const {name,statusCode}=err;
    console.log("Error Reporter",name,statusCode)
    if(process.env.NODE_ENV==='dev'){
        return errorResponseDEV(err,res)
    }
    errorResponse(err,res);
})
module.exports = app;
