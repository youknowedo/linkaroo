import { pgTable, text } from "drizzle-orm/pg-core";
import { userTable } from "./auth";

export * from "./auth";
export * from "./pages";

export const sitesTable = pgTable("sites", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
	domain: text("domain").notNull().unique(),
	umamiId: text("umami_id").notNull().unique(),
	ownerId: text("owner_id")
		.notNull()
		.references(() => userTable.id)
});
