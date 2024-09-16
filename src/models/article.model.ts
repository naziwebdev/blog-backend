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

export interface IArticlePopulate extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  slug: string;
  cover: string;
  username: string;
  avatar:string;
  name: string;
  created_at:Date;
};


// function parameters types & req.body types



export type articlesFormattedTypes = {
  id: number;
  title: string;
  content: string;
  slug: string;
  cover: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  tags: string[];
  createdAt: Date;
};

export type articleTypes = {
  title: string;
  content: string;
  slug: string;
  author_id: number;
  cover?: string;
};

export type articleBodyTypes = {
  title: string;
  content: string;
  slug: string;
  tags?: number[];
};

