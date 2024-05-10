import { drizzle } from "drizzle-orm/postgres-js"
import { eq } from "drizzle-orm"
import postgres from "postgres"

import * as schema from "../schema"

const queryClient = postgres(process.env.DATABASE_URL as string)

export const db = drizzle(queryClient, { schema })

export const getUniqueStudent = async (id: number) => {
  const student = await db
    .select()
    .from(schema.StudentsTable)
    .where(eq(schema.StudentsTable.id, id))
    .limit(1)

  return student[0] ?? null
}
