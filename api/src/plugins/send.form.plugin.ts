import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { responseForm } from "@utils";

export default fp(async function (fastify: FastifyInstance) {
  fastify.decorateReply("sendResponse", responseForm.send);
  fastify.decorateReply("sendValidate", responseForm.validationError);
});
