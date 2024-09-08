import db from "../db";
import { ITag, TagTypes } from "../models/tag.model";
import { RowDataPacket } from "mysql2";

export const create = async (title: TagTypes) => {
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

    return tags[0];
  } catch (error) {
    throw error;
  }
};

export const findByTitle = async (title: TagTypes) => {
  try {
    const query = "SELECT * FROM tags WHERE title=?";
    const [tag] = await db.execute<ITag[]>(query, [title]);

    return tag[0];
  } catch (error) {
    throw error;
  }
};
