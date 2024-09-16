import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";
import * as User from "../repositories/users";
import { changePasswordSchema } from "../validators/user";
import bcrypt from "bcryptjs";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: IUser[] = await User.getAll();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
    
  const { id , password } = req.body as { password: string; id: number };

  await changePasswordSchema.validate({ id,password });

  const user = await User.findById(Number(id));
  if (!user) {
    return res.status(404).json({ message: "not found user" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.changePassword(hashedPassword, id);

  return res.status(200).json({ message: "password changed successfully" });


  } catch (error) {
    next(error);
  }
};
