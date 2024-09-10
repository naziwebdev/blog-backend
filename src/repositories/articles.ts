import db from "../db";
import { RowDataPacket } from "mysql2";
import { IArticle, articleTypes } from "../models/article.model";

export const create = async ({
  title,
  content,
  slug,
  author_id,
  cover,
}: articleTypes) => {
  try {
    const query =
      "INSERT INTO articles (title,content,slug,author_id,cover) VALUES (?,?,?,?,?)";

    const [article] = await db.execute<RowDataPacket[]>(query, [
      title,
      content,
      slug,
      author_id,
      cover,
    ]);

    const selectArticleQuery = "SELECT * FROM articles WHERE id=?";

    const [mainArticle] = await db.execute<IArticle[]>(selectArticleQuery, [
      (article as any).insertId,
    ]);

    return mainArticle[0];
  } catch (error) {
    throw error;
  }
};
