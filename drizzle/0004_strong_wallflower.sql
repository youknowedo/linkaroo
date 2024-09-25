CREATE TABLE IF NOT EXISTS "pages" (
	"id" text PRIMARY KEY NOT NULL,
	"site_id" text NOT NULL,
	"name" text NOT NULL,
	"blocks" json DEFAULT '[]'::json NOT NULL,
	CONSTRAINT "pages_name_unique" UNIQUE("name")
);
