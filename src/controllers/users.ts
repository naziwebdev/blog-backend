import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";
import * as User from "../repositories/users";
import { changePasswordSchema } from "../validators/user";
import bcrypt from "bcryptjs";
import path from "path";
import sharp from "sharp";

interface CustomRequest extends Request {
  user: IUser;
}

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
    const userId = (req as CustomRequest).user.id;
    if (!req.file) {
      return res.status(404).json({ message: "not found file...!" });
    }

    const extFile = path.extname(req.file.originalname);
    const unique = Date.now() * Math.floor(Math.random() * 1e9);
    const bufferFile = req.file.buffer;
    const pathFile = `/images/avatars/${unique}${extFile}`;

    if (extFile === ".png") {
      sharp(bufferFile).png({ quality: 60 }).toFile(`./public${pathFile}`);
    } else if (extFile === ".jpeg") {
      sharp(bufferFile).jpeg({ quality: 60 }).toFile(`./public${pathFile}`);
    } else if (extFile === ".webp") {
      sharp(bufferFile).webp({ quality: 60 }).toFile(`./public${pathFile}`);
    } else {
      sharp(bufferFile).toFile(`./public${pathFile}`);
    }

    await User.uploadAvatar(pathFile, userId);

    return res.status(201).json({ message: "avatar uploaded successfully" });
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
    const { id, password } = req.body as { password: string; id: number };

    await changePasswordSchema.validate({ id, password });

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
