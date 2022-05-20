const path = require('path');
const multer = require('multer');
const PathName=path.join(path.dirname(__dirname),'public','images')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let checkName = /[0-9a-zA-Z]+/ig;
        try{
            if(!checkName.test(file.originalname)){
                cb(new Error('上傳名稱只能是英文和數字的組合'))
            }
                cb(null, `${PathName}`)
        }catch(error){
            cb(new Error('上傳名稱只能是英文和數字的組合'))
        }
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix+"_"+file.originalname)
    }
})

const upload = multer({
    storage,
    limit: {
        // 限制上傳檔案的大小為 1MB
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // 只接受三種圖片格式
        let checkName = /[0-9a-zA-Z]+/ig;
        if (!file.originalname.toLocaleLowerCase().match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('只接受jpg,jpeg,png等格式'))
        }
        cb(null, true)
    }
})


module.exports = upload;
