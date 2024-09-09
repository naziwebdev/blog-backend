import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { findById } from "../repositories/users";
import configs from "../configs";

interface CustomRequest extends Request {
  user: IUser;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["access-token"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "access to this route is forbidden" });
    }

    const payload: JwtPayload = <JwtPayload>(
      jwt.verify(token, configs.auth.accessTokenSecretKey!)
    );

    if (!payload) {
      return res
        .status(401)
        .json({ message: "access to this route is forbidden" });
    }

    const user: IUser | null = await findById(payload.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "access to this route is forbidden" });
    }

    (req as CustomRequest).user = user;

    next();
  } catch (error) {
    next(error);
  }
};
