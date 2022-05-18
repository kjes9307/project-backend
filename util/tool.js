const jwt = require('jsonwebtoken');

const defineStatus = {
    200 : "success",
    404 : "error",
    401 : "Data not found",
    400 : "Input Error"
}
// express status code 預設200
const responseHandler = (res,data,statusCode) => {
    if(data !== null) {
        res.status(statusCode).json({
            status : statusCode,
            data : data,
            msg: defineStatus[statusCode]
        })
    }else{
        res.status(statusCode).json({
            status : statusCode,
            data : [],
            msg: defineStatus[statusCode]
        })
    }
}

const checkInput = (body) => {
    let err = new Error()
    if(Object.keys(body).length === 0){  
        err.name = "Clinet Input Error"
        throw err;
    }else{
        let element = ["name","content","tags","type"];
        for(let i = 0 ; i< element.length;i++){
            let key = element[i]
            if(body[key] === "" || !body[key] === true){
                console.log(`${key} is required`)
                err.name = `${key} is required, Check Input Error`
                throw err;
            }
        }
    }
}

// async error handle
const asyncErrorHandler = (func) => {
    return async(req,res,next)=>{
        try{
            await func(req,res,next)
        }catch(err){
            console.log("@asyncErrorHandler",err)
            next(appError(404,msg = err.name,next,res))
        }
    }
}

const appError = (httpStatus,errorInfo,next,res)=>{
    const error = new Error();
    error.name = errorInfo.name || errorInfo;
    error.message = errorInfo.message;
    error.statusCode = httpStatus;
    error.isDefineError = true;
    next(error,res);
}

const errorResponse = (error,res) => {
    let {isDefineError,statusCode,name} = error;
    statusCode = statusCode || 500;
    if(isDefineError){
        res.status(statusCode).json({
            status : statusCode,
            msg : name
        })
    }else{
        res.json({
            "msg":"undefined error, please contact admin"
        })
    }
}

const errorResponseDEV = (error,res) => {
    let {isDefineError,statusCode,name,message,stack} = error;
    statusCode = statusCode || 500;
    res.status(statusCode).json({
        stack,
        msg: message,
        name,
        isDefineError
    })
}
const tokenGenerator= (user,statusCode,res)=>{
    // 產生 JWT token
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRES_DAY
    });
    user.password = undefined; // pw 不要丟到前台
    let resData = {
        token,
        name: user.name
    }
    responseHandler(res,resData,statusCode)
  }

module.exports = {
    asyncErrorHandler,
    responseHandler,
    errorResponse,
    errorResponseDEV,
    checkInput,
    appError,
    tokenGenerator
};