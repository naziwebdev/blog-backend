import multer from "multer";
import path from 'path'
import { Request } from "express";


 export const multerStorage = (destination:string , validFormat = /png|jpeg|jpg|webp/) => {


const storage = multer.diskStorage({


    destination: function (req,file,cb) {

        cb(null,destination)

    },

    filename:function(req,file,cb){

        const unique = Date.now() * Math.floor(Math.random()*1e9)

        const ext = path.extname(file.originalname)

        cb(null,`${unique}${ext}`)
    }
})


const fileFilter = function(req: Request,
    file: Express.Multer.File,
    cb:any) {

    if(validFormat.test(file.mimetype)){
        cb(null,true)
    }else{
      cb(new Error('the file format in invalid'),false)
    }

}

const uploader = multer({
    storage,
    limits:{fileSize:512_000_000},
    fileFilter 
})

return uploader

}