import { InferSelectModel } from "drizzle-orm"
import { pgTable, integer, varchar } from "drizzle-orm/pg-core"

export const StudentsTable = pgTable("students", {
  id: integer("id").primaryKey(),
  title: varchar("title").notNull(),
  name: varchar("name").notNull(),
  lastname: varchar("lastname").notNull(),
  room: varchar("room").notNull(),
  number: integer("number").notNull(),
  program: varchar("program").notNull(),
})

export type student = InferSelectModel<typeof StudentsTable>
