import { Request, Response, NextFunction } from "express";
import { IUser, editUserTypes } from "../models/user.model";
import * as User from "../repositories/users";
import { changePasswordSchema, editUserSchema } from "../validators/user";
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
    const { name, username, email } = req.body as editUserTypes;

    await editUserSchema.validate({ name, username, email });

    const userId = parseInt(req.params.id, 10) as number;

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }

    const existUser = await User.findById(userId);
    if (!existUser) {
      return res.status(422).json({ message: "userID is invalid" });
    }

    await User.edit(name, username, email, userId);

    return res.status(200).json({ message: "user updated successfully" });
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
    const userId: number = (req as CustomRequest).user.id;
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

    const user: IUser = await User.findById(Number(id));
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

export const changeRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id, 10) as number;

    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }

    const existUser:IUser = await User.findById(userId);
    if (!existUser) {
      return res.status(422).json({ message: "userID is invalid" });
    }

    await User.changeRole(userId);

    return res.status(200).json({ message: "user-role updated successfully" });
  } catch (error) {
    next(error);
  }
};
