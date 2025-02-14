import { FastifyInstance, FastifyPluginOptions } from "fastify";
import chatController from "./chat.controller.js";

export default async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.register(chatController);
}
