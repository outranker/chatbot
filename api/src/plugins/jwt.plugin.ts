import type {
  FastifyInstance,
  RouteOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fp from "fastify-plugin";
import { env } from "config";

const jwt = fp(async (fastify: FastifyInstance, opts: RouteOptions) => {
  fastify.register(await import("@fastify/jwt"), {
    secret: env.ACCESS_TOKEN_SECRET,
    decoratorName: "admin",
  });
  fastify.register(await import("@fastify/jwt"), {
    secret: env.REFRESH_TOKEN_SECRET,
    decoratorName: "adminRefreshToken",
    namespace: "adminRefreshToken",
  });

  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const t = request.headers.authorization
          ?.replace("Bearer", "")
          .replaceAll(" ", "");
        if (!t || ["undefined", "null", "[object Object]", "false"].includes(t)) {
          reply.statusCode = 401;
          return reply.send(reply.sendResponse({ code: 1004 }));
        }
        const token = await request.jwtVerify();
        request.log.info({ token }, "access token verified");
      } catch (err) {
        request.log.error(err);
        reply.statusCode = 401;
        return reply.send(reply.sendResponse({ code: 1009 }));
      }
    },
  );
});
const jwtPlugin = fp(jwt);

export default jwtPlugin;
