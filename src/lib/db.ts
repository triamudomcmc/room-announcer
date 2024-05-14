import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";

import * as schema from "../schema";
import { similarity } from "./compareStringDistance";
import { removeParenthesisPrefix } from "./utils";

const queryClient = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(queryClient, { schema });

export const getUniqueStudent = async (id: number) => {
  const student = await db
    .select()
    .from(schema.StudentsTable)
    .where(eq(schema.StudentsTable.id, id))
    .limit(1);

  return student[0];
};

export const getUniqueStudentFromExamId = async (id: number) => {
  // TODO fetch from admission id
  const student = await db
    .select()
    .from(schema.StudentsTable)
    .where(eq(schema.StudentsTable.examid, id))
    .limit(1);

  return student[0];
};

export const getStudentInformation = async (
  student: schema.student,
  lastname: string,
) => {
  if (similarity(removeParenthesisPrefix(student.lastname), lastname) > 0.8) {
    return student;
  }

  return null;
};

export const getStudentName = async (id: number) => {
  const student = await db
    .select({ firstname: schema.StudentsTable.name })
    .from(schema.StudentsTable)
    .where(eq(schema.StudentsTable.id, id))
    .limit(1);

  if (!student || student.length === 0) {
    return null;
  }

  return student[0].firstname;
};
