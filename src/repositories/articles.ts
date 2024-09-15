import db from "../db";
import { RowDataPacket } from "mysql2";
import { IArticle, articleTypes } from "../models/article.model";
import { calculateRelativeTimeDifference } from "../utils/formatTime";
import { ITag } from "../models/tag.model";

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
    const query = `SELECT articles.id,articles.title,articles.content,articles.slug,articles.created_at,users.name,users.username,users.avatar
         FROM articles
         JOIN users ON
         articles.author_id = users.id
         ORDER BY articles.id DESC`;
    const [articles] = await db.execute<IArticle[]>(query);


    const formattedArticles = []

    for(const article of articles){

      const [tags] = await db.execute<ITag[]>(`SELECT tags.* FROM articles_tags
        JOIN tags ON
      articles_tags.tag_id = tags.id
      WHERE articles_tags.article_id = ?`,[article.id]);

      (article as any).created_at = calculateRelativeTimeDifference(article.created_at)

       formattedArticles.push({

        id:article.id,
        title:article.title,
        content:article.content,
        slug:article.slug,
        cover:article.cover,
        author:{
          name:article.name,
          username:article.username,
          avatar:article.avatar
        },
        tags:tags.map((tag) => tag.title),
        createdAt:article.created_at
       })
      

      
    }

    return formattedArticles;
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

export const addTag = async (articleId: number, tagId: number) => {
  try {
    const query = "INSERT INTO articles_tags VALUES(NULL,?,?)";

    await db.execute(query, [articleId, tagId]);

    return true;
  } catch (error) {
    throw error;
  }
};
