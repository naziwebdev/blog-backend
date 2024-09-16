import db from "../db";
import { ITag } from "../models/tag.model";
import { RowDataPacket } from "mysql2";

export const create = async (title: string) => {
  try {
    const query = "INSERT INTO tags (title) VALUES (?)";
    const [tag] = await db.execute<RowDataPacket[]>(query, [title]);

    const getTagQuery = "SELECT * FROM tags WHERE id=?";
    const [mainTag] = await db.execute<ITag[]>(getTagQuery, [
      (tag as any).insertId,
    ]);

    return mainTag[0];
  } catch (error) {
    throw error;
  }
};

export const getAll = async () => {
  try {
    const query = "SELECT * FROM tags";
    const [tags] = await db.execute<ITag[]>(query);

    return tags;
  } catch (error) {
    throw error;
  }
};

export const findByTitle = async (title: string) => {
  try {
    const query = "SELECT * FROM tags WHERE title=?";
    const [tag] = await db.execute<ITag[]>(query, [title]);

    return tag[0];
  } catch (error) {
    throw error;
  }
};

export const findTagsArticles = async (tagId: number) => {
  try {
    const query = `SELECT articles.title,articles.content,articles.slug,articles.cover,articles.created_at,articles.updated_at,
               users.name As author,tags.title As tag FROM articles_tags
               JOIN articles ON
               articles_tags.article_id = articles.id
               JOIN users ON
               users.id = articles.author_id
              JOIN tags ON
              articles_tags.tag_id = tags.id
              WHERE tags.id = ?`;

    const [articles] = await db.execute<ITag[]>(query, [tagId]);

    return articles;
  } catch (error) {
    throw error;
  }
};

export const findById = async (tagId:number) => {
  try {

    const query = `SELECT * FROM tags WHERE id=?`

    const [tag] = await db.execute<ITag[]>(query,[tagId])

    return tag[0]
    
  } catch (error) {
    throw error
  }
}

export const update = async (id: number, title: string) => {
  try {
    const query = "UPDATE tags SET title=? WHERE id=?";
    await db.execute<RowDataPacket[]>(query, [title, id]);

    return true;
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: number) => {
  try {
    const query = "DELETE FROM tags WHERE id=?";
    await db.execute<ITag[]>(query, [id]);

    return true;
  } catch (error) {
    throw error;
  }
};
