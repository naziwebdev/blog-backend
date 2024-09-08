import db from "../db";
import { RowDataPacket } from "mysql2";
import { createUserTypes, IUserCount, IUser } from "../models/user.model";

export const create = async ({
  name,
  username,
  email,
  password,
}: createUserTypes) => {
  try {
    const userExistQuery = "SELECT COUNT(*) AS count FROM users";

    const [userCount] = await db.execute<IUserCount[]>(userExistQuery);

    const mainRole = userCount[0].count > 0 ? "user" : "admin";

    const query =
      "INSERT INTO users (name,username,email,password,role) VALUES(?,?,?,?,?)";

    const [user] = await db.execute<RowDataPacket[]>(query, [
      name,
      username,
      email,
      password,
      mainRole,
    ]);

    const mainUserQuery = "SELECT * FROM users WHERE id=?";

    const [mainUser] = await db.execute<IUser[]>(mainUserQuery, [
      (user as any).insertId,
    ]);

    return mainUser[0];
  } catch (error) {
    throw error;
  }
};

export const findByUsername = async (username: string) => {
  try {
    const query = "SELECT * FROM users WHERE username=?";

    const [user] = await db.execute<IUser[]>(query, [username]);

    return user[0];
  } catch (error) {
    throw error;
  }
};

export const findById = async (id: number) => {
  try {
    const query = "SELECT * FROM users WHERE id=?";

    const [user] = await db.execute<IUser[]>(query, [id]);

    return user[0];
  } catch (error) {
    throw error;
  }
};
