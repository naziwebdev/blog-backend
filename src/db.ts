import mysql, { PoolOptions } from "mysql2";
import configs from "./configs";

const access: PoolOptions = {
  uri: configs.db.uri,
  connectionLimit: configs.db.poolSize as any,
  waitForConnections: true,
};

const connection = mysql.createPool(access);

export default connection;
