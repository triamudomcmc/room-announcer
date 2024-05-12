"use client";
import { useCallback, useState } from "react";
import StudentId from "./01_student_id.client";
import ValidateSurname from "./02_validate_surname.client";

export type Process = "idle" | "editing" | "done";

export interface StepProps {
  process: Process;
  back: () => void;
  next: () => void;
  saveInput: (input: string) => void;
}

export interface StudentInput {
  studentId: string;
  surname: string;
}

export default function GetRoom() {
  const [studentInput, setStudentInput] = useState<StudentInput>({
    studentId: "",
    surname: "",
  });
  const [process, setProcess] = useState<
    Record<"step_1" | "step_2" | "step_3", Process>
  >({
    step_1: "editing",
    step_2: "idle",
    step_3: "idle",
  });

  const handleSaveStudentId = useCallback(async (studentId: string) => {
    const validateStudentId = await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(true), 1000),
    );

    if (!validateStudentId) {
      throw new Error("Invalid student ID");
    }

    setStudentInput({
      studentId: studentId,
      surname: "",
    });
  }, []);

  const handleSaveSurname = useCallback(async (surname: string) => {
    const validateSurname = await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(Boolean(Math.round(Math.random()))), 1000),
    );

    if (!validateSurname) {
      throw new Error("Invalid surname");
    }

    setStudentInput((prev) => ({
      ...prev,
      surname: surname,
    }));
  }, []);

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
          studentId={studentInput.studentId}
        />
      </div>
    </section>
  );
}
