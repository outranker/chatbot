import { FastifyPluginCallback, onRequestHookHandler } from "fastify";
import { OpenAI } from "openai";

export interface SendResponse {
  (args: { code: number; data?: any; reason?: string }): any;
}
declare module "fastify" {
  interface FastifyReply {
    sendResponse: SendResponse;
    adminRefreshTokenJwtSign: FastifyReply["jwtSign"];
  }

  interface FastifyRequest {
    token: { id: number };
  }

  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "adminRefreshToken" }> {
    openai: OpenAI;
    getCache: <T>(key: string) => T;
    setCache(key: string, value: unknown, ttl: number): void;
    hashPassword(password: string): Promise<string>;
    comparePassword(storedPassword: string, suppliedPassword: string): Promise<boolean>;
    authenticate: onRequestMetaHookHandler;
    refreshTokenAuthenticate: onRequestMetaHookHandler;
    createExcel(
      data: Record<string, unknown>[],
      filename: string,
    ): {
      headers: Record<string, string>;
      body: Buffer;
    };
    pullDaily(url: string, id: number): Promise<void>;
    getGAData: () => Promise<unknown>;
  }
}
