import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { messages } from "./messages.js";

export const sessions = mysqlTable("sessions", {
  id: serial("id").primaryKey(),
  session_id: varchar("session_id", { length: 255 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const sessionsRelations = relations(sessions, ({ many }) => ({
  messages: many(messages),
}));
