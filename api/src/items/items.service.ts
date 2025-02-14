import { db } from "config";
import { items } from "@models";
import { asc, count, desc, eq, like, or, SQL } from "drizzle-orm";

export const getItems = async (args: {
  page: number;
  size: number;
  type: "all" | "in_stock" | "out_of_stock";
  search: string;
  sort: "asc" | "desc";
}) => {
  const { page, size, type, search, sort } = args;
  const offset = (page - 1) * size;
  const filter: SQL[] = [];
  if (type === "in_stock") {
    filter.push(eq(items.is_out_of_stock, false));
  }
  if (type === "out_of_stock") {
    filter.push(eq(items.is_out_of_stock, true));
  }
  if (search) {
    const orCond = or(
      like(items.name, `%${search}%`),
      like(items.description, `%${search}%`),
    )!;
    filter.push(orCond);
  }

  const listPromise = db
    .select()
    .from(items)
    .offset(offset)
    .limit(size)
    .orderBy(sort === "asc" ? asc(items.created_at) : desc(items.created_at));

  const countPromise = db.select({ count: count() }).from(items);

  const [list, _totalCount] = await Promise.all([listPromise, countPromise]);

  return list;
  // return { list, totalCount: totalCount[0].count };
};

export const getItem = async (itemId: number) => {
  const item = await db.select().from(items).where(eq(items.id, itemId));
  if (!item || item.length === 0) {
    return undefined;
  }
  return item[0];
};
