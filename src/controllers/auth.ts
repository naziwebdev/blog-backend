import { Request, Response, NextFunction } from "express";
import { IUser, createUserTypes, loginBodyTypes } from "../models/user.model";
import registerSchema from "../validators/register";
import loginSchema from "../validators/login";
import * as User from "../repositories/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configs from "../configs";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, email, password } = req.body as createUserTypes;

    await registerSchema.validate({ name, username, email, password });

    const existUser: IUser | null = await User.findByUsername(username);

    if (existUser) {
      return res.status(409).json({ message: "user exist already" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user: IUser | null = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { id: user.id },
      configs.auth.accessTokenSecretKey!,
      {
        expiresIn: configs.auth.accessTokenExpireIn + "s",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      configs.auth.refreshTokenAccessKey!,
      {
        expiresIn: configs.auth.refreshTokenExpireIn + "s",
      }
    );

    res.cookie("access-token", accessToken, {
      httpOnly: true,
      maxAge: 500000,
      sameSite: "strict",
    });

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "strict",
    });

    return res.status(201).json({ message: "user register successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as loginBodyTypes;

  await loginSchema.validate({ username, password });

  const user:IUser | null = await User.findByUsername(username);

  if (!user) {
    return res
      .status(409)
      .json({ message: "username or password is incorrrect" });
  }

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res
      .status(409)
      .json({ message: "username or password is incorrrect" });
  }

  const accessToken = jwt.sign(
    { id: user.id },
    configs.auth.accessTokenSecretKey!,
    {
      expiresIn: configs.auth.accessTokenExpireIn + "s",
    }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    configs.auth.refreshTokenAccessKey!,
    {
      expiresIn: configs.auth.refreshTokenExpireIn + "s",
    }
  );

  res.cookie("access-token", accessToken, {
    httpOnly: true,
    maxAge: 500000,
    sameSite: "strict",
  });

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    maxAge: 900000,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "user login successfully" });

  try {
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
