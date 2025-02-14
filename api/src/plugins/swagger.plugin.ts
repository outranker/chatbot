import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";

const swagger = async function (fastify: FastifyInstance) {
  fastify.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.3",
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      info: {
        title: "Antique Store",
        description: "Antique Store API documentation",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      servers: [
        {
          url: "http://localhost:3212",
          description: "Local server",
        },
      ],
      tags: [
        { name: "items", description: "endpoints for items" },
        { name: "chat", description: "endpoints for chat" },
      ],
    },
    hideUntagged: true,
  });
};

export const swaggerPlugin = fp(swagger);

export default swaggerPlugin;
