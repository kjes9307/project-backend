const defineStatus = {
    200 : "success",
    404 : "error",
    401 : "data not found"
}
// express status code 預設200
const responseHandler = (res,data,statusCode) => {
    if(data !== null) {
        res.status(statusCode).json({
            "statu" : defineStatus[statusCode],
            "data" : data
        })
    }else{
        res.status(401).json({
            "statu" : "id not match any result",
            "data" : []
        })
    }
}

const errorHandler = (res,msg,statusCode) => {
        res.status(statusCode).json({
            "statu" : defineStatus[statusCode],
            "msg" : msg,
            "data" : []
        })
}
const checkInput = (body) => {
    if(Object.keys(body).length === 0){  
        throw "Input Error"
    }else{
        let element = ["name","content","tags","type"];
        for(let i = 0 ; i< element.length;i++){
            let key = element[i]
            if(body[key] === "" || !body[key] === true){
                console.log(`${key} is required`)
                throw `${key} is required`
            }
        }
    }
}

// async error handle
const asyncErrorHandler = async(func) => {
    return (req,res,next)=>{
        try{
            func(req,res,next)
        }catch(error){
            console.log(error);
        }
    }
}

const appError = (httpStatus,errMessage,next)=>{
    const error = new Error(errMessage);
    error.statusCode = httpStatus;
    error.isOperational = true;
    next(error);
}

module.exports = {asyncErrorHandler,responseHandler,errorHandler,checkInput};