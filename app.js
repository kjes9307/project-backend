var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./connect')
var postRouter = require('./routes/posts');
const { default: axios } = require('axios');
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
    res.status(404).json({
        status:"false",
        message:"您的路由不存在"
    })
})

app.use((err,req,res,next)=>{
    console.log(err.name);
    res.status(500).json({
        "err": err.name
    })
})
module.exports = app;
