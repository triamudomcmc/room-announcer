import { InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const StudentsTable = pgTable('students', {
  id: integer('id').primaryKey(),
  examid: integer('examid'),
  title: varchar('title').notNull(),
  name: varchar('name').notNull(),
  lastname: varchar('lastname').notNull(),
  room: varchar('room').notNull(),
  number: integer('number'),
  program: varchar('program').notNull(),
  gmail: varchar('gmail'),
  outlook: varchar('outlook'),
  wifi: varchar('wifi'),
  password: varchar('password'),
  level: integer('level').notNull(),
  advisor: varchar('advisor').notNull(),
})

export const emptyStudent = {
  id: 0,
  examid: 0,
  title: '',
  name: '',
  lastname: '',
  room: '',
  number: 0,
  program: '',
  gmail: '',
  outlook: '',
  wifi: '',
  password: '',
  level: 0,
  advisor: '',
}

export type student = InferSelectModel<typeof StudentsTable>
