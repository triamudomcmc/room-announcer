import {
  getStudentInformation,
  getStudentName,
  getUniqueStudent,
  getUniqueStudentFromExamId,
} from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { lastname } = await request.json();

  // attempt to get data from student ID
  const student = await getUniqueStudent(parseInt(params.id));

  // if student is found, attempt to get student information
  if (student) {
    const studentInformation = await getStudentInformation(student, lastname);

    if (studentInformation === null) {
      return new Response("Wrong lastname", { status: 401 });
    }

    return Response.json(studentInformation);
  }

  // if student is not found, attempt to get data from exam ID
  else {
    const admissionStudent = await getUniqueStudentFromExamId(
      parseInt(params.id),
    );

    if (admissionStudent === null)
      return new Response("Not found", { status: 404 });

    return Response.json(admissionStudent);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const firstname = await getStudentName(parseInt(params.id));

  if (firstname === null) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json({ firstname });
}
