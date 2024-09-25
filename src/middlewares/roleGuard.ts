import { Request, Response, NextFunction } from "express";
import { IUser } from "../tsTypes/user";

interface CustomRequest extends Request {
  user: IUser;
}

export const roleGurad = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user;

    if (user.role !== role) {
      return res.status(403).json({ message: "forbidden route" });
    }
    next();
  };
};
