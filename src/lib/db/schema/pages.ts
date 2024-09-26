import type { Block } from "$lib/builder";
import { json, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const titleType = pgEnum("title_type", ["siteOnly", "pageOnly", "both"]);

export const pagesTable = pgTable("pages", {
	id: text("id").primaryKey(),
	siteId: text("site_id").notNull(),
	titleType: titleType("title_type").notNull().default("both"),
	name: text("name").notNull().unique(),
	slug: text("slug").notNull().unique(),
	blocks: json("blocks").notNull().default([]).$type<Block[]>()
});
