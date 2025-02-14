import {
  boolean,
  decimal,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { messages } from "./messages.js";
import { relations } from "drizzle-orm";

export const items = mysqlTable("items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image_url: varchar("image_url", { length: 1000 }),
  category: varchar("category", { length: 100 }),
  condition: varchar("condition", { length: 100 }),
  min_acceptable_price: decimal("min_acceptable_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  is_out_of_stock: boolean("is_out_of_stock").notNull().default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const itemsRelations = relations(items, ({ many }) => ({
  messages: many(messages),
}));
