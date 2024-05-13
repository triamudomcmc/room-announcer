import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";

import * as schema from "../schema";
import { similarity } from "./compareStringDistance";

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

export const getStudentInformation = async (
  student: schema.student,
  lastname: string,
) => {
  if (similarity(student.lastname, lastname) > 0.8) {
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

  if (!student) {
    return null;
  }

  return student[0].firstname;
};
