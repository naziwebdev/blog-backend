import db from "../db";
import { ITag, createTagTypes } from "../models/tag.model";
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
