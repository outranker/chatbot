import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifySwaggerUi from "@fastify/swagger-ui";

const swaggerUi = async function (fastify: FastifyInstance) {
  fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    initOAuth: {},
    uiConfig: {
      docExpansion: "none",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
};

const swaggerUiPlugin = fp(swaggerUi);

export default swaggerUiPlugin;
