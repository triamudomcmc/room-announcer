import {
  getStudentInformation,
  getStudentName,
  getUniqueStudent,
} from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { lastname } = await request.json();
  const student = await getUniqueStudent(parseInt(params.id));

  if (student === null) {
    return new Response("Not found", { status: 404 });
  }

  const studentInformation = await getStudentInformation(student, lastname);

  if (studentInformation === null) {
    return new Response("Wrong lastname", { status: 401 });
  }

  return Response.json(studentInformation);
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
