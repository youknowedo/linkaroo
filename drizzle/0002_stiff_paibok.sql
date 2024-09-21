CREATE TABLE IF NOT EXISTS "sites" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"domain" text NOT NULL,
	"umami_id" text NOT NULL,
	CONSTRAINT "sites_name_unique" UNIQUE("name"),
	CONSTRAINT "sites_domain_unique" UNIQUE("domain"),
	CONSTRAINT "sites_umami_id_unique" UNIQUE("umami_id")
);
