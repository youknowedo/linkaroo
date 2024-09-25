ALTER TABLE "pages" RENAME COLUMN "path" TO "slug";--> statement-breakpoint
ALTER TABLE "pages" DROP CONSTRAINT "pages_path_unique";--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_slug_unique" UNIQUE("slug");