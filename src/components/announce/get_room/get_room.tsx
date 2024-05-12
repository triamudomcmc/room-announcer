import StudentId from "./01_student_id.client";

export default function GetRoom() {
  return (
    <section className="relative -top-8 flex w-full flex-col gap-8 rounded-t-xl bg-white px-4 py-16 text-lg">
      <div className="mx-auto w-full max-w-xs">
        <StudentId />
      </div>
    </section>
  );
}
