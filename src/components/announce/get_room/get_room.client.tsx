"use client";
import { useCallback, useState } from "react";
import StudentId from "./01_student_id.client";
import ValidateSurname from "./02_validate_surname.client";
import DisplayData from "./03_display_data.client";
import { httpFetch, mockFetch } from "@/lib/fetch";

export type Process = "idle" | "editing" | "done";

export interface StepProps {
  process: Process;
  back: () => void;
  next: () => void;
  saveInput: (input: string) => Promise<void>;
}

export interface StudentInput {
  studentId: string;
  firstNameCheck: string;
}

export default function GetRoom() {
  const [studentInput, setStudentInput] = useState<StudentInput>({
    studentId: "",
    firstNameCheck: "",
  });

  const [process, setProcess] = useState<
    Record<"step_1" | "step_2" | "step_3", Process>
  >({
    step_1: "editing",
    step_2: "idle",
    step_3: "idle",
  });

  const handleSaveStudentId = async (studentId: string) => {
    const res = await fetch(`/api/student/${studentId}`, {
      method: "GET",
    });

    console.log(res);

    const studentName = await res.json();

    console.log(studentName);

    if (!studentName) {
      throw new Error("Invalid student ID");
    }

    setStudentInput({
      studentId: studentId,
      firstNameCheck: studentName.firstname,
    });
  };

  const handleSaveSurname = async (surname: string) => {
    const validateSurname = await fetch(
      `/api/student/${studentInput.studentId}`,
      {
        method: "POST",
        body: JSON.stringify({ lastname: surname }),
      },
    );

    if (validateSurname.status === 404) {
      throw new Error("Invalid surname");
    }
  };

  return (
    <section className="relative -top-8 flex w-full flex-col rounded-t-xl bg-white px-4 py-16 text-lg">
      <div className="mx-auto flex w-full max-w-xs flex-col gap-y-8">
        <StudentId
          process={process.step_1}
          back={() => {
            setProcess({
              step_1: "editing",
              step_2: "idle",
              step_3: "idle",
            });
          }}
          next={() => {
            setProcess({
              step_1: "done",
              step_2: "editing",
              step_3: "idle",
            });
          }}
          saveInput={handleSaveStudentId}
        />
        <ValidateSurname
          process={process.step_2}
          back={() => {
            setProcess({
              step_1: "done",
              step_2: "editing",
              step_3: "idle",
            });
          }}
          next={() => {
            setProcess({
              step_1: "done",
              step_2: "done",
              step_3: "editing",
            });
          }}
          saveInput={handleSaveSurname}
          firstNameCheck={studentInput.firstNameCheck}
        />
        <DisplayData
          process={process.step_3}
          studentId={studentInput.studentId}
        />
      </div>
    </section>
  );
}
