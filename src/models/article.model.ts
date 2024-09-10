import { RowDataPacket } from "mysql2";

//output query types
export interface IArticle extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  slug: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
  cover: string;
}

// function parameters types & req.body types

export type articleTypes = {
  title: string;
  content: string;
  slug: string;
  author_id:number;
  cover?:string;
};
