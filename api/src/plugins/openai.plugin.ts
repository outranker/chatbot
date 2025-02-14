import fp from "fastify-plugin";
import { OpenAI } from "openai";
import { FastifyInstance } from "fastify";
import { env } from "config";

const openaiClient = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const openaiPlugin = fp(async function (fastify: FastifyInstance) {
  fastify.decorate("openai", openaiClient);
});

export default openaiPlugin;
