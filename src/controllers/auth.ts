import { Request, Response, NextFunction } from "express";
import { IUser, createUserTypes, loginBodyTypes } from "../models/user.model";
import registerSchema from "../validators/register";
import loginSchema from "../validators/login";
import * as User from "../repositories/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configs from "../configs";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user: IUser;
}

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
      maxAge: 9000000,
      sameSite: "strict",
    });

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 9000000,
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

  const user: IUser | null = await User.findByUsername(username);

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
    maxAge: 9000000,
    sameSite: "strict",
  });

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    maxAge: 9000000,
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
    const userId = (req as CustomRequest).user.id;

    const user = await User.findById(userId);

    return res.status(200).json(user);
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
    const refreshToken: string = req.cookies["refresh-token"];

    if (!refreshToken) {
      return res.status(404).json({ message: "token not found" });
    }

    const payload: JwtPayload = <JwtPayload>(
      jwt.verify(refreshToken, configs.auth.refreshTokenAccessKey!)
    );

    if (!payload) {
      return res.status(422).json({ message: "token is invaliad" });
    }

    const user:IUser = await User.findById(payload.id);

    if (!user) {
      return res.status(422).json({ message: "token is invaliad" });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      configs.auth.accessTokenSecretKey!,
      {
        expiresIn: configs.auth.accessTokenExpireIn,
      }
    );

    res.cookie("access-token", accessToken, {
      httpOnly: true,
      maxAge: 9000000,
      sameSite: "strict",
    });

    return res.json({message:'access token generate successfully'});
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
    res.clearCookie("access-token", { httpOnly: true });

    res.clearCookie("refresh-token", { httpOnly: true });

    return res.status(200).json({ message: "user logout successfully" });
  } catch (error) {
    next(error);
  }
};
