"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const migration = async () => {
    const connection = await db_1.default.getConnection();
    const createUsersTableSql = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..", "..", "src/migrations", "./users-ddl.sql"), "utf-8");
    const createTagsTableSql = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..", "..", "src/migrations", "./tags-ddl.sql"), "utf-8");
    const createArticlesTableSql = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..", "..", "src/migrations", "./articles-ddl.sql"), "utf-8");
    const createArticlesTagsTableSql = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "..", "..", "src/migrations", "./articles-tags-ddl.sql"), "utf-8");
    await connection.beginTransaction();
    try {
        await connection.query(createUsersTableSql);
        await connection.query(createTagsTableSql);
        await connection.query(createArticlesTableSql);
        await connection.query(createArticlesTagsTableSql);
        await connection.commit();
    }
    catch (error) {
        console.log(error);
        await connection.rollback();
    }
};
migration()
    .then(() => console.log("Migrations ran successfully"))
    .catch(async (err) => {
    console.log(err);
    await db_1.default.end();
});
