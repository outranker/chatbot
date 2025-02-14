import { db } from "config";
import { sql } from "drizzle-orm";
import fp from "fastify-plugin";

const healthcheckPlugin = fp(async function (fastify) {
  fastify.get(
    "/livez",
    {
      logLevel: "silent",
    },
    async () => {
      return { status: "ok" };
    },
  );
  fastify.get(
    "/readyz",
    {
      logLevel: "silent",
    },
    async () => {
      const statement = sql.raw(`select 1+1`);
      const result = await db.execute(statement);
      if (!result) {
        throw new Error("Database is not ready");
      }
      return { status: "ok" };
    },
  );
});

export default healthcheckPlugin;
