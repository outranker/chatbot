import { env } from "./src/config/env";
// @ts-ignore
import { readdirSync } from "fs";
import { defineConfig } from "drizzle-kit";

// read all files from models directory and create an array of file paths

const models = readdirSync("./src/models")
  .map((file) => {
    if (file === "index.ts") return;
    return `./src/models/${file}`.replace(".ts", ".js").replace("/src/", "/dist/");
  })
  .filter(Boolean) as string[];
console.log(models);

export default defineConfig({
  schema: models,
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: env.MYSQL_HOST,
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    port: env.MYSQL_PORT,
  },
});
