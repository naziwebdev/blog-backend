import db from "../db";
import { RowDataPacket } from "mysql2";
import {
  IArticle,
  articleTypes,
  articlesFormattedTypes,
  IArticlePopulate,
} from "../models/article.model";
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
    const [articles] = await db.execute<IArticlePopulate[]>(query);

    const formattedArticles: articlesFormattedTypes[] = [];

    for (const article of articles) {
      const [tags] = await db.execute<ITag[]>(
        `SELECT tags.* FROM articles_tags
        JOIN tags ON
      articles_tags.tag_id = tags.id
      WHERE articles_tags.article_id = ?`,
        [article.id]
      );

      (article as any).created_at = calculateRelativeTimeDifference(
        article.created_at
      );

      formattedArticles.push({
        id: article.id,
        title: article.title,
        content: article.content,
        slug: article.slug,
        cover: article.cover,
        author: {
          name: article.name,
          username: article.username,
          avatar: article.avatar,
        },
        tags: tags.map((tag) => tag.title),
        createdAt: article.created_at,
      });
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

    await db.execute<RowDataPacket[]>(query, [articleId, tagId]);

    return true;
  } catch (error) {
    throw error;
  }
};

export const findById = async (articleId:number) => {
  try {

    const query = `SELECT * FROM articles WHERE id=?`

    const [article] = await db.execute<IArticle[]>(query,[articleId])

    return article[0]
    
  } catch (error) {
    throw error
  }
}

export const searchArticles = async (searchValue: string) => {
  try {
    const query = `  SELECT articles.id,articles.title,articles.content,articles.slug,articles.cover,users.username,users.avatar,users.name,
   articles.created_at,tags.title FROM articles
   JOIN articles_tags ON
   articles_tags.article_id = articles.id
   JOIN tags ON
   articles_tags.tag_id = tags.id
   JOIN users ON
   users.id = articles.author_id
   WHERE articles.title LIKE ? OR articles.content LIKE ? OR tags.title LIKE ?
   GROUP BY articles.id`;
    const [articles] = await db.execute<IArticlePopulate[]>(query, [
      `%${searchValue}%`,
      `%${searchValue}%`,
      `%${searchValue}%`,
    ]);

    return articles;
  } catch (error) {
    throw error;
  }
};

export const findBySlug = async (slug: string) => {
  try {
    const query = `SELECT articles.id,articles.title,articles.content,articles.slug,articles.cover,users.username,users.avatar,users.name,
     articles.created_at FROM articles 
     JOIN users ON
     articles.author_id = users.id
     WHERE articles.slug LIKE ?`;

    const [article] = await db.execute<IArticlePopulate[]>(query, [slug]);

    const tagQuery = `
    SELECT tags.title FROM tags
    JOIN articles_tags ON
    tags.id = articles_tags.tag_id
    JOIN articles ON
   articles_tags.article_id = articles.id
   WHERE articles_tags.article_id = ?
    `;

    const [tags] = await db.execute<ITag[]>(tagQuery, [article[0].id]);

    return { article: article[0], tags };
  } catch (error) {
    throw error;
  }
};

export const edit = async (
  articleId: number,
  title: string,
  content: string,
  slug: string,
  cover: string | null
) => {
  try {
    const query = `UPDATE articles SET title=?,content=?,slug=?,
    cover=? WHERE id=?`;

    await db.execute<RowDataPacket[]>(query,[title,content,slug,cover,articleId])

    return true  
  } catch (error) {
    throw error
  }
};


