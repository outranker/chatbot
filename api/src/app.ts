import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import http from "node:http";
import f from "fastify";
import { db, env, logger } from "config";
import mp from "@fastify/multipart";
import fc from "@fastify/cors";
import al from "@fastify/autoload";
import pino from "pino";
import { generalHeaderSchema } from "schemas";

import itemsController from "./items/index.js";
import chatController from "./chat/index.js";
import { sql } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = f<http.Server, http.IncomingMessage, http.ServerResponse, pino.Logger>({
  logger: logger,
  pluginTimeout: 20000,
  trustProxy: true,
  genReqId: () => randomUUID(),
  exposeHeadRoutes: false,
  bodyLimit: 100 * 1024 * 1024,
});

export const build = async function () {
  fastify.register(fc, { origin: "*" });
  fastify.register(mp, {
    attachFieldsToBody: false,
    limits: {
      fileSize: 20 * 1024 * 1024, // 20 MB
      files: 12,
    },
  });

  fastify.register(al, {
    dir: join(__dirname, "plugins"),
    //  ignoreFilter: (path) => path.includes("static")
  });
  fastify.register(itemsController, { prefix: "/items" });
  fastify.register(chatController, { prefix: "/chats" });

  fastify.addSchema(generalHeaderSchema);
  fastify.after((err) => {
    if (err) fastify.log.error(err);
    else fastify.log.info("all plugins loaded!");
  });

  const testPgConn = await db.execute<{ now: string }>(sql`SELECT CURRENT_TIME() AS now`);

  fastify.log.info(testPgConn.at(0), "PG query:");

  fastify.ready((err) => {
    if (err) {
      fastify.log.error({ err: err });
    } else fastify.log.info("Server is ready to accept incoming requests");
  });
  return fastify;
};
