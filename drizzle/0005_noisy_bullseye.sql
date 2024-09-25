ALTER TABLE "pages" ADD COLUMN "path" text NOT NULL;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_path_unique" UNIQUE("path");