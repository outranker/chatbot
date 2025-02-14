import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

async function serveStatic(fastify: FastifyInstance) {
  const imagesDir = path.join(__dirname, "../../static");
  fastify.register(fastifyStatic, {
    root: imagesDir,
    prefix: "/static",
    logLevel: "silent",
  });
  // fastify.setNotFoundHandler((request, reply) => {
  //   let redirectUrl = `https://${env.MINIO_ENDPOINT}/notFound.png`;
  //   reply.redirect(302, redirectUrl);
  // });
}

const serveStaticPlugin = fp(serveStatic);
export default serveStaticPlugin;
