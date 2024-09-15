import multer from "multer";
import { Request } from "express";


 export const multerStorage = ( validFormat = /png|jpeg|jpg|webp/) => {


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
    limits:{fileSize:512_000_000},
    fileFilter 
})

return uploader

}