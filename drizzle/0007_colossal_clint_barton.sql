DO $$ BEGIN
 CREATE TYPE "public"."title_type" AS ENUM('siteOnly', 'pageOnly', 'both');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "title_type" "title_type" DEFAULT 'both' NOT NULL;