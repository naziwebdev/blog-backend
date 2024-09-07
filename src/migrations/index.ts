import db from "../db";
import fs from "fs";
import path from "path";

const migration = async () => {
  const connection = await db.getConnection();

  const createUsersTableSql = fs.readFileSync(
    path.resolve(__dirname,"..","..","src/migrations", "./users-ddl.sql"),
    "utf-8"
  );

  const createTagsTableSql = fs.readFileSync(
    path.resolve(__dirname, "..","..","src/migrations","./tags-ddl.sql"),
    "utf-8"
  );

  const createArticlesTableSql = fs.readFileSync(
    path.resolve(__dirname,"..","..","src/migrations", "./articles-ddl.sql"),
    "utf-8"
  );

  const createArticlesTagsTableSql = fs.readFileSync(
    path.resolve(__dirname, "..","..","src/migrations","./articles-tags-ddl.sql"),
    "utf-8"
  );

  await connection.beginTransaction();

  try {
    await connection.query(createUsersTableSql);
    await connection.query(createTagsTableSql);
    await connection.query(createArticlesTableSql);
    await connection.query(createArticlesTagsTableSql);

    await connection.commit();
  } catch (error) {
    console.log(error)
    await connection.rollback();
  }
};

migration()
  .then(() => console.log("Migrations ran successfully"))
  .catch(async (err) => {
    console.log(err)
    await db.end();
  });
