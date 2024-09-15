import { Request, Response, NextFunction } from "express";
import articleSchema from "../validators/article";
import * as Article from "../repositories/articles";
import { IUser } from "../models/user.model";
import {
  IArticle,
  articleTypes,
  articleBodyTypes,
} from "../models/article.model";
import slugify from "slugify";

interface CustomRequest extends Request {
  user: IUser;
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author_id = (req as CustomRequest).user.id;

    let { title, content, slug, tags } = req.body as articleBodyTypes;

    slug = slugify(slug, { lower: true });

    await articleSchema.validate({ title, content, slug });

    if (!req.file?.filename) {
      return res.status(404).json({ message: "not found file" });
    }

    const cover = `images/articles/${req.file.filename}`;

    const article: IArticle = await Article.create({
      title,
      content,
      slug,
      author_id,
      cover,
    });

    tags?.forEach(async (tag) => {
      await Article.addTag(article.id, tag);
    });

    return res
      .status(201)
      .json({ message: "article created successfully", article });
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
    const articles: IArticle[] = await Article.getAll();
    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

export const getBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const articleId = parseInt(req.params.id, 10);
    if (isNaN(articleId) || articleId <= 0) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }

    await Article.remove(articleId);

    return res.status(200).json({ message: "article remove successfully" });
  } catch (error) {
    next(error);
  }
};
