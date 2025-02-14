import { db } from "config";
import { sessions } from "@models";
import { eq } from "drizzle-orm";

export const createSession = async (sessionId: string) => {
  await db.insert(sessions).values({ session_id: sessionId });
  return sessionId;
};

export const getSessionBySessionId = async (sessionId: string) => {
  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.session_id, sessionId));
  return session;
};

export const getSessionById = async (id: number) => {
  const session = await db.select().from(sessions).where(eq(sessions.id, id));
  return session;
};
