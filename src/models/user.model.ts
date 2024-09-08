import { RowDataPacket, ResultSetHeader } from "mysql2";

//output query types

export interface IUser extends RowDataPacket {
  id: number;
  name: string;
  avatar?: string;
  username: string;
  email: string;
  role: string;
  provider?: string;
  password: string;
}

export interface IUserCount extends ResultSetHeader {
  count: number;
}

//input function types
export type createUserTypes = {
  name: string;
  username: string;
  email: string;
  password: string;
};
