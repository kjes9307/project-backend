
const defineStatus = {
    200 : "success",
    404 : "error",
    401 : "data not found"
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
        res.status(401).json({
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
                err.name = `${key} is required`
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
            console.log("@",err)
            next(appError(404,msg = err.name,next,res))
        }
    }
}

const appError = (httpStatus,errorInfo,next,res)=>{
    const error = new Error();
    error.name = errorInfo.name;
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

module.exports = {asyncErrorHandler,responseHandler,errorResponse,errorResponseDEV,checkInput,appError};