import { FastifyInstance } from "fastify";
import itemsController from "./items.controller.js";

export default async function (fastify: FastifyInstance) {
  fastify.register(itemsController);
}
