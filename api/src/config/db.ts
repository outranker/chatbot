import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "./env.js";
import { SqlLogger } from "./drizzle.logger.js";
import { logger } from "./logger.js";
import type { Logger, LogFn } from "pino";
import { items, messages, sessions } from "@models";

const sqlLogger = new SqlLogger(logger as Logger & { drizzle: LogFn });
const poolConnection = mysql.createPool({
  host: env.MYSQL_HOST,
  port: env.MYSQL_PORT,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
});

export const db = drizzle(poolConnection, {
  schema: {
    items,
    messages,
    sessions,
  },
  mode: "default",
  logger: sqlLogger,
});

let drzlConn: ReturnType<typeof drizzle>;

export const singleConnection = async () => {
  const connection = await mysql.createConnection({
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: "root",
    password: env.MYSQL_ROOT_PASSWORD,
    database: env.MYSQL_DATABASE,
  });
  if (!drzlConn) {
    drzlConn = drizzle(connection, {
      schema: {
        items,
        messages,
        sessions,
      },
      mode: "default",
    });
  }
  return { db: drzlConn, connection };
};
