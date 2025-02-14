import { db } from "config";
import { items, messages, sessions } from "@models";
import { and, asc, desc, eq } from "drizzle-orm";
import { type Role } from "@utils";

type CreateMessage = {
  sessionId: string;
  message: string;
  itemId: number;
  role: Role;
  image_url?: string;
};

export const createMessage = async (args: CreateMessage) => {
  const { sessionId, message, itemId, role, image_url } = args;
  await db.insert(messages).values({
    session_id: sessionId,
    role,
    content: message,
    item_id: itemId,
    image_url: image_url,
  });
};

export const getMessages = async (sessionId: string) => {
  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.session_id, sessionId))
    .innerJoin(items, eq(messages.item_id, items.id))
    .innerJoin(sessions, eq(messages.session_id, sessions.session_id))
    .orderBy(desc(messages.created_at));

  return msgs;
};

export const getChatHistory = async (sessionId: string, itemId: number) => {
  const msgs = await db
    .select()
    .from(messages)
    .where(and(eq(messages.session_id, sessionId), eq(messages.item_id, itemId)))
    .orderBy(asc(messages.created_at));
  return msgs;
};
