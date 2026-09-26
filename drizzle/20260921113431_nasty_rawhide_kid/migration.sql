CREATE TABLE "links" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"short_code" text NOT NULL UNIQUE,
	"url" text NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
