import { relations } from "drizzle-orm";
import {
  bigint,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { sessions } from "./sessions.js";
import { items } from "./items.js";

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  session_id: varchar("session_id", { length: 255 }).notNull(),
  item_id: bigint("item_id", { mode: "number", unsigned: true })
    .references(() => items.id)
    .notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  content: text("content").notNull(),
  image_url: varchar("image_url", { length: 1000 }),
  created_at: timestamp("created_at").defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(sessions, {
    fields: [messages.session_id],
    references: [sessions.session_id],
  }),
  item: one(items, {
    fields: [messages.item_id],
    references: [items.id],
  }),
}));
