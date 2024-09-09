import db from "../db";
import { ITag} from "../models/tag.model";
import { RowDataPacket } from "mysql2";

export const create = async (title:string) => {
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

export const findByTitle = async (title:string) => {
  try {
    const query = "SELECT * FROM tags WHERE title=?";
    const [tag] = await db.execute<ITag[]>(query, [title]);

    return tag[0];
  } catch (error) {
    throw error;
  }
};

export const remove = async (id: number) => {
  try {
    const query = "DELETE FROM tags WHERE id=?";
    const [tag] = await db.execute<ITag[]>(query, [id]);

    return true;
  } catch (error) {
    throw error;
  }
};
