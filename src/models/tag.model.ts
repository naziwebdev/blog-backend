import { RowDataPacket } from "mysql2";

//output query types

export interface ITag extends RowDataPacket {
  id: number;
  title: string;
  created_at: Date;
}

// function parameters types & req.body types

export type TagTypes = {
  title: string;
};


export type slugTypeParam = {
  slug:string
}