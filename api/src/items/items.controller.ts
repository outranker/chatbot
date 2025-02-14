import { FastifyRequest, type FastifyInstance } from "fastify";
import * as itemsService from "./items.service.js";

export default async function getItems(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      summary: "Get all items",
      description: "Get all items",
      tags: ["items"],
      querystring: {
        type: "object",
        properties: {
          page: { type: "number", default: 1 },
          size: { type: "number", default: 10 },
          type: {
            type: "string",
            enum: ["all", "in_stock", "out_of_stock"],
            default: "all",
          },
          search: { type: "string", default: "" },
          sort: { type: "string", enum: ["asc", "desc"], default: "desc" },
        },
        required: ["page", "size", "type"],
      },
    },
    handler: async (
      request: FastifyRequest<{
        Querystring: {
          page: number;
          size: number;
          type: "all" | "in_stock" | "out_of_stock";
          search: string;
          sort: "asc" | "desc";
        };
      }>,
      reply,
    ) => {
      const { page, size, type, search, sort } = request.query;
      const items = await itemsService.getItems({ page, size, type, search, sort });
      return reply.sendResponse({ code: 1000, data: items });
    },
  });
  fastify.route({
    method: "GET",
    url: "/:itemId",
    schema: {
      summary: "Get item by id",
      description: "Get item by id",
      tags: ["items"],
      params: {
        type: "object",
        properties: {
          itemId: { type: "number" },
        },
        required: ["itemId"],
      },
    },
    handler: async (
      request: FastifyRequest<{
        Params: {
          itemId: number;
        };
      }>,
      reply,
    ) => {
      const { itemId } = request.params;
      const item = await itemsService.getItem(itemId);
      return reply.sendResponse({ code: 1000, data: item });
    },
  });
}
