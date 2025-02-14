import "./init.js";
import "./config/env.js";
import { build } from "./app.js";
import { signals } from "@utils";
import { env } from "config";

try {
  const fastify = await build();
  await fastify.listen({ port: env.PORT, host: "0.0.0.0" });

  for (const signal of signals) {
    process.on(signal, async (error: unknown) => {
      fastify.log.fatal(`close application on ${signal}`);
      fastify.log.fatal(error);
      try {
        await fastify.close();
        console.log("fastify server closed successfully");
      } catch (error) {
        console.error(error);
        process.exit(1);
      } finally {
        if (["SIGTERM", "SIGINT", "SIGHUP", "SIGUSR2"].includes(signal)) process.exit(0);
        process.exit(1);
      }
    });
  }
} catch (err: unknown) {
  console.error("TOP LEVEL CATCH", err);
  process.exit(1);
}
