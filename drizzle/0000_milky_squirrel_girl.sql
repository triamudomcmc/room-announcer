CREATE TABLE IF NOT EXISTS "students" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"name" varchar NOT NULL,
	"lastname" varchar NOT NULL,
	"room" varchar NOT NULL,
	"number" integer NOT NULL,
	"program" varchar NOT NULL,
	"gmail" varchar,
	"outlook" varchar,
	"wifi" varchar,
	"password" varchar
);
