import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";

interface CustomRequest extends Request {
    user: IUser;
  }

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = (req as CustomRequest).user

        if(user.role !== 'admin'){
            return res.status(401).json({message:'access to this route is forbidden'})
        }

        next()
        
    } catch (error) {
        next(error)
    }

}

