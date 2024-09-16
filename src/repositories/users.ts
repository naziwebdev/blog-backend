import db from "../db";
import { RowDataPacket } from "mysql2";
import {
  createUserTypes,
  IUserCount,
  IUser,
  IUserRole,
} from "../models/user.model";

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
    const query =
      "SELECT id,name,username,email,role,avatar,provider FROM users WHERE id=?";

    const [user] = await db.execute<IUser[]>(query, [id]);

    return user[0];
  } catch (error) {
    throw error;
  }
};

export const getAll = async () => {
  try {
    const query =
      "SELECT id,name,username,email,role,avatar,provider FROM users";

    const [user] = await db.execute<IUser[]>(query);

    return user;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (password: string, userId: number) => {
  try {
    const query = `UPDATE users SET password=? WHERE id=?`;
    await db.execute<RowDataPacket[]>(query, [password, userId]);
    return true;
  } catch (error) {
    throw error;
  }
};

export const uploadAvatar = async (avatar: string, userId: number) => {
  try {
    const query = `UPDATE users SET avatar=? WHERE id=?`;
    await db.execute<RowDataPacket[]>(query, [avatar, userId]);
    return true;
  } catch (error) {
    throw error;
  }
};

export const edit = async (
  name: string,
  username: string,
  email: string,
  userId: number
) => {
  try {
    const query = `UPDATE users SET name=?,username=?,email=? WHERE id=?`;
    await db.execute<RowDataPacket[]>(query, [name, username, email, userId]);
    return true;
  } catch (error) {
    throw error;
  }
};

export const changeRole = async (userId: number) => {
  try {
    const getUserRoleQuery = `SELECT role FROM users WHERE id=?`;
    const [role] = await db.execute<IUserRole[]>(getUserRoleQuery, [userId]);

    const detectedRole = (role[0].role = "user" ? "admin" : "user");

    const query = `UPDATE users SET role=? WHERE id=?`;
    await db.execute<RowDataPacket[]>(query, [detectedRole, userId]);

    return true;
  } catch (error) {}
};
