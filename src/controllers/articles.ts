import { Request, Response, NextFunction } from "express";
import articleSchema from "../validators/article";
import * as Article from "../repositories/articles";
import sharp from "sharp";
import { IUser } from "../models/user.model";
import {
  IArticle,
  IArticlePopulate,
  articleBodyTypes,
} from "../models/article.model";
import slugify from "slugify";
import path from "path";

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

    await articleSchema.validate({ title, content, slug, tags });

    if (!req.file) {
      return res.status(404).json({ message: "not found file...!" });
    }

    const extFile = path.extname(req.file.originalname);
    const unique = Date.now() * Math.floor(Math.random() * 1e9);
    const bufferFile = req.file.buffer;
    const pathFile = `/images/articles/${unique}${extFile}`;

    if (extFile === ".png") {
      sharp(bufferFile).png({ quality: 60 }).toFile(`./public${pathFile}`);
    } else if (extFile === ".jpeg") {
      sharp(bufferFile).jpeg({ quality: 60 }).toFile(`./public${pathFile}`);
    } else if (extFile === ".webp") {
      sharp(bufferFile).webp({ quality: 60 }).toFile(`./public${pathFile}`);
    } else {
      sharp(bufferFile).toFile(`./public${pathFile}`);
    }

    const article: IArticle = await Article.create({
      title,
      content,
      slug,
      author_id,
      cover: pathFile,
    });

    tags?.forEach(async (tag) => {
      await Article.addTag(article.id, tag);
    });

    return res.status(201).json({ message: "article created successfully" });
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
    //pagination
    const page = parseInt(req.query.page as any) || 1;
    const limit = parseInt(req.query.limit as any) || 2;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const articles = await Article.getAll();
    const results = articles.slice(startIndex, endIndex);

    return res.status(200).json({ page, limit, results });
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
    const { slug } = req.params as { slug: string };

    if (!slug.trim()) {
      return res.status(404).json({ messsage: "not found slug" });
    }

    const article = await Article.findBySlug(slug);

    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

export const searchArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //pagination

    const search = req.query.q as string;

    const articles: IArticlePopulate[] = await Article.searchArticles(search);

    return res.status(200).json({ searchValue: search, articles });
  } catch (error) {
    next(error);
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { title, content, slug, tags } = req.body as articleBodyTypes;

    await articleSchema.validate({ title, content, slug, tags });

    slug = slugify(slug, { lower: true });

    const articleId = parseInt(req.params.id, 10);

    if (isNaN(articleId) || articleId <= 0) {
      return res.status(400).json({ error: "Invalid article ID" });
    }

    const existArticle: IArticle | null = await Article.findById(articleId);

    if (!existArticle) {
      return res.status(404).json({ message: "not found article" });
    }

    let pathFile = null;

    if (req.file) {
      const extFile = path.extname(req.file.originalname);
      const unique = Date.now() * Math.floor(Math.random() * 1e9);
      const bufferFile = req.file.buffer;
      pathFile = `/images/articles/${unique}${extFile}`;

      if (extFile === ".png") {
        sharp(bufferFile).png({ quality: 60 }).toFile(`./public${pathFile}`);
      } else if (extFile === ".jpeg") {
        sharp(bufferFile).jpeg({ quality: 60 }).toFile(`./public${pathFile}`);
      } else if (extFile === ".webp") {
        sharp(bufferFile).webp({ quality: 60 }).toFile(`./public${pathFile}`);
      } else {
        sharp(bufferFile).toFile(`./public${pathFile}`);
      }
    }

    await Article.edit(articleId, title, content, slug, pathFile);

    tags?.forEach(async (tag) => {
      await Article.addTag(articleId, tag);
    });

    return res.status(200).json({ message: "article updated successfully" });
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
