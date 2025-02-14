import type { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import * as chatService from "./chat.service.js";
import * as itemService from "../items/items.service.js";
import * as sessionService from "./session.service.js";
import { items, messages, sessions } from "@models";
import { OpenAI } from "openai";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { pipeline } from "stream/promises";

const systemMessage = (item: typeof items.$inferSelect) => {
  const basePrice = item.price;
  const minAcceptablePrice = item.min_acceptable_price;
  const name = item.name;

  return `You are a chatbot for an antique store. 
The item for sale is "${name}" priced at ${basePrice}. 
The lowest acceptable price is ${minAcceptablePrice}.
These are the details of the item: ${JSON.stringify(item)}
You should encourage the user to negotiate but not go below the minimum acceptable price.`;
};

type ChatList = {
  item: typeof items.$inferSelect;
  messages: (typeof messages.$inferSelect)[];
  session: typeof sessions.$inferSelect;
};

export default async function chatController(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      summary: "Interact with the chatbot",
      description:
        "Interact with the chatbot. This endpoint will create a new conversation and return the response from the chatbot.",
      tags: ["chat"],
      body: {
        type: "object",
        properties: {
          sessionId: { type: "string" },
          itemId: { type: "number" },
          message: { type: "string" },
          file: {
            type: "object",
            properties: {
              fileUrl: { type: "string" },
              fileName: { type: "string" },
            },
          },
        },
        required: ["sessionId", "message", "itemId"],
      },
    },
    handler: async (
      request: FastifyRequest<{
        Body: {
          sessionId: string;
          itemId: number;
          message: string;
          file?: { fileUrl: string; fileName: string };
        };
      }>,
      reply: FastifyReply,
    ) => {
      const { sessionId, itemId, message, file } = request.body;
      const item = await itemService.getItem(itemId);
      const chatHistory = await chatService.getChatHistory(sessionId, itemId);

      if (!item) {
        return reply.sendResponse({ code: 1005 });
      }

      // download the file from the fileUrl in base64 format
      let base64 = "";
      if (file?.fileUrl) {
        const pathParts = file.fileUrl.split("/static/");
        const filePath = path.join(process.cwd(), `static/${pathParts[1]}`);
        base64 = fs.readFileSync(filePath, "base64");
      }

      const msgs = [
        {
          role: "developer",
          content: systemMessage(item),
        },
        ...chatHistory,
        {
          role: "user",
          content: message,
        },
        ...(file
          ? [
              {
                role: "user",
                content: [
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:image/${file.fileName.split(".").at(-1)};base64,${base64}`,
                    },
                  },
                ],
              },
            ]
          : []),
      ];

      await chatService.createMessage({
        sessionId,
        itemId,
        message: message,
        role: "user",
      });
      if (file) {
        await chatService.createMessage({
          sessionId,
          itemId,
          message: file.fileName,
          role: "user",
          image_url: file.fileUrl,
        });
      }

      const responseText = await fastify.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: msgs.map((msg) => ({
          role: msg.role === "developer" ? "system" : msg.role,
          content: msg.content,
        })) as OpenAI.Chat.ChatCompletionMessageParam[],
      });

      console.log(JSON.stringify(responseText, null, 2));

      await chatService.createMessage({
        sessionId,
        itemId,
        message: responseText.choices[0].message.content || "",
        role: "assistant",
      });

      return reply.sendResponse({ code: 1000, data: responseText });
    },
  });
  fastify.route({
    method: "GET",
    url: "/:sessionId/:itemId",
    schema: {
      summary: "Get all conversations by sessionId",
      description:
        "Get all conversations by sessionId. Retrieves message history for each chat as well as the item details.",
      tags: ["chat"],
      params: {
        type: "object",
        properties: {
          sessionId: { type: "string" },
          itemId: { type: "number" },
        },
        required: ["sessionId", "itemId"],
      },
    },
    handler: async (
      request: FastifyRequest<{
        Params: { sessionId: string; itemId: number };
      }>,
      reply,
    ) => {
      const { sessionId, itemId } = request.params;
      const itemChat = await chatService.getChatHistory(sessionId, itemId);
      if (itemChat.length === 0) {
        const session = await sessionService.getSessionBySessionId(sessionId);
        if (session.length === 0) {
          await sessionService.createSession(sessionId);
        }
        await chatService.createMessage({
          sessionId,
          itemId,
          message: "Hello, how can I help you today?",
          role: "assistant",
        });
      }
      const msgList = await chatService.getMessages(sessionId);
      const map = new Map<number, ChatList>();

      for (const msg of msgList) {
        if (map.has(msg.messages.item_id)) {
          map.get(msg.messages.item_id)!.messages.push(msg.messages);
        } else {
          map.set(msg.messages.item_id, {
            item: msg.items,
            messages: [msg.messages],
            session: msg.sessions,
          });
        }
      }
      const list: ChatList[] = [];
      map.forEach((value, key) => {
        list.push(value);
      });

      return reply.sendResponse({ code: 1000, data: list });
    },
  });
  fastify.post("/upload", async function (req, reply) {
    const data = (await req.file())!;
    const staticDir = path.join(process.cwd(), "static");
    const rand = randomUUID();
    const filePath = path.join(staticDir, rand + data.filename);
    await pipeline(data.file, fs.createWriteStream(filePath));
    const imageUrl = `http://localhost:3212/static/${rand}${data.filename}`;

    reply.send({ imageUrl, fileName: data.filename });
  });
}
