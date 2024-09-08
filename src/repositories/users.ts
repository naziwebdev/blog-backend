import db from "../db";
import { RowDataPacket, FieldPacket } from "mysql2";
import {
  createUserTypes,
  IUserCount,
  IUser,
  findByUsernameType,
} from "../models/user.model";

export const create = async ({
  name,
  username,
  email,
  password,
}: createUserTypes) => {
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
};

export const findByUsername = async ({ username }: findByUsernameType) => {
  const query = "SELECT * FROM users WHERE username=?";

  const [user] = await db.execute<IUser[]>(query, [username]);

  return user[0];
};
