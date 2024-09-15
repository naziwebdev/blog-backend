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

export const getAll = async () => {
  try {
    const query = "SELECT * FROM articles ORDER BY id DESC";
    const [articles] = await db.execute<IArticle[]>(query);

    return articles;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: number) => {
  try {
    const query = "DELETE FROM articles WHERE id=?";
    await db.execute<RowDataPacket[]>(query, [id]);

    return true;
  } catch (error) {
    throw error;
  }
};

export const addTag = async (articleId: number,tagId:number) => {
  try {
    const query = "INSERT INTO articles_tags VALUES(NULL,?,?)";

    await db.execute(query, [articleId,tagId]);

    return true;
  } catch (error) {
    throw error;
  }
};
