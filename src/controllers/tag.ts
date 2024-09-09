import { Request, Response, NextFunction } from "express";
import tagSchema from "../validators/tag";
import * as Tag from "../repositories/tags";
import { ITag, TagTypes } from "../models/tag.model";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body as TagTypes;

    await tagSchema.validate({ title });

    const existTag = await Tag.findByTitle(title);

    if (existTag) {
      return res.status(409).json({ message: "this tag exist already" });
    }

    const tag = await Tag.create(title);

    return res.status(201).json({ message: "tag created successfully", tag });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await Tag.getAll();

    return res.status(200).json(tags);
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

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tagId = parseInt(req.params.id, 10);
    if (isNaN(tagId) || tagId <= 0) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }

    await Tag.remove(tagId);

    return res.status(200).json({ message: "tag removed successfully" });
  } catch (error) {
    next(error);
  }
};

export const findtagsArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
