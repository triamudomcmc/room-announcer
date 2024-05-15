'use server'

import * as schema from '@/schema'
import { eq, or } from 'drizzle-orm'

import { similarity } from '@/lib/compareStringDistance'
import { db } from '@/lib/db'
import { removeParenthesisPrefix } from '@/lib/utils'

export const getStudentName = async (id: number) => {
  const student = await db
    .select({ firstname: schema.StudentsTable.name })
    .from(schema.StudentsTable)
    .where(
      or(eq(schema.StudentsTable.id, id), eq(schema.StudentsTable.examid, id)),
    )
    .limit(1)

  if (!student || student.length === 0) {
    return null
  }

  if (!student[0].firstname) {
    throw new Error('Student Not Found')
  }

  return student[0].firstname
}

export const getUniqueStudent = async (id: number, lastname: string) => {
  const student = await db
    .select()
    .from(schema.StudentsTable)
    .where(
      or(eq(schema.StudentsTable.id, id), eq(schema.StudentsTable.examid, id)),
    )
    .limit(1)

  if (
    similarity(removeParenthesisPrefix(student[0].lastname), lastname) > 0.8
  ) {
    return student[0]
  }

  return null
}
