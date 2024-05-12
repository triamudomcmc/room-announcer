"use client";
import { useState } from "react";
import StudentId from "./01_student_id.client";

export type Process = "idle" | "editing" | "done";

export default function GetRoom() {
  const [process, setProcess] = useState<
    Record<"step_1" | "step_2" | "step_3", Process>
  >({
    step_1: "editing",
    step_2: "idle",
    step_3: "idle",
  });

  return (
    <section className="relative -top-8 flex w-full flex-col gap-8 rounded-t-xl bg-white px-4 py-16 text-lg">
      <div className="mx-auto w-full max-w-xs">
        <StudentId process={process.step_1} back={() => {}} next={() => {}} />
      </div>
    </section>
  );
}
