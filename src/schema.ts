import { InferSelectModel } from "drizzle-orm";
import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const StudentsTable = pgTable("students", {
  id: integer("id").primaryKey(),
  title: varchar("title").notNull(),
  name: varchar("name").notNull(),
  lastname: varchar("lastname").notNull(),
  room: varchar("room").notNull(),
  number: integer("number").notNull(),
  program: varchar("program").notNull(),
  gmail: varchar("gmail"),
  outlook: varchar("outlook"),
  wifi: varchar("wifi"),
  password: varchar("password"),
  level: integer("level").notNull(),
});

export const emptyStudent = {
  id: 0,
  title: "",
  name: "",
  lastname: "",
  room: "",
  number: 0,
  program: "",
  gmail: "",
  outlook: "",
  wifi: "",
  password: "",
  level: 0,
};

export type student = InferSelectModel<typeof StudentsTable>;
