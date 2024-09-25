// import { Request, Response, NextFunction } from "express";
// import tagSchema from "../validators/tag";
// import * as Tag from "../repositories/tags";
// import { ITag, TagTypes, slugTypeParam } from "../models/tag.model";
// import { calculateRelativeTimeDifference } from "../utils/formatTime";

// export const create = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { title } = req.body as TagTypes;

//     await tagSchema.validate({ title });

//     const existTag: ITag | null = await Tag.findByTitle(title);

//     if (existTag) {
//       return res.status(409).json({ message: "this tag exist already" });
//     }

//     const tag: ITag | null = await Tag.create(title);

//     return res.status(201).json({ message: "tag created successfully", tag });
//   } catch (error) {
//     next(error);
//   }
// };

// export const findtagsArticles = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { slug } = req.params as slugTypeParam;

//     const tag = await Tag.findByTitle(slug);

//     const articles = await Tag.findTagsArticles(tag.id);

//     articles?.forEach((article: any) => {
//       article.created_at = calculateRelativeTimeDifference(article.created_at);
//     });

//     return res.status(200).json({ tag: tag.title, articles });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAll = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const tags: ITag[] | [] = await Tag.getAll();

//     return res.status(200).json(tags);
//   } catch (error) {
//     next(error);
//   }
// };

// export const edit = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { title } = req.body as TagTypes;

//     await tagSchema.validate({ title });

//     const tagId = parseInt(req.params.id, 10);

//     if (isNaN(tagId) || tagId <= 0) {
//       return res.status(400).json({ error: "Invalid tag ID" });
//     }

//     const existTagd:ITag | null = await Tag.findById(tagId)

//     if(!existTagd){
//       return res.status(404).json({message:'not found tag'})
//     }


//     await Tag.update(tagId, title);

//     return res.status(200).json({ message: "tag updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// export const remove = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const tagId = parseInt(req.params.id, 10);
//     if (isNaN(tagId) || tagId <= 0) {
//       return res.status(400).json({ error: "Invalid tag ID" });
//     }

//     await Tag.remove(tagId);

//     return res.status(200).json({ message: "tag removed successfully" });
//   } catch (error) {
//     next(error);
//   }
// };
