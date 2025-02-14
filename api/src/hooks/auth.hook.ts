import type { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

export interface Decode {
  id: number;
  iat: number;
  exp: number;
}

export async function authHook(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const token = request.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) return reply.sendResponse({ code: 1004 });

  const decode: Decode = this.jwt.verify(token.replace("Bearer ", ""));
  if (!decode) {
    this.log.error({ decode, msg: "JWT verify failed" });
    reply.statusCode = 401;
    return reply.sendResponse({ code: 1009 });
  }

  request.token = decode;
  return;
}
