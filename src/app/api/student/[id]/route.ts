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

  const studentInformation = await getStudentInformation(student, lastname);

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
