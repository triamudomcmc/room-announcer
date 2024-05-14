"use client";
import { sendGAEvent } from "@next/third-parties/google";
import { student as StudentData, emptyStudent } from "@/schema";
import { useCallback, useState } from "react";

export type Process = "idle" | "editing" | "done";

export interface StudentInput {
  studentId: string;
  firstNameCheck: string;
}

export function useGetRoom() {
  const [studentInput, setStudentInput] = useState<StudentInput>({
    studentId: "",
    firstNameCheck: "",
  });
  const [studentData, setStudentData] = useState<StudentData>(emptyStudent);

  const [process, setProcess] = useState<
    Record<"step_1" | "step_2" | "step_3", Process>
  >({
    step_1: "editing",
    step_2: "idle",
    step_3: "idle",
  });

  const handleSaveStudentId = useCallback(async (studentId: string) => {
    const res = await fetch(`/api/student/${studentId}`, {
      method: "GET",
    });

    if (res.status !== 200) {
      throw new Error("Invalid student ID");
    }

    const studentName = await res.json();

    sendGAEvent({
      event: "verify_student_id",
      action: "student_id",
    });

    setStudentInput({
      studentId: studentId,
      firstNameCheck: studentName.firstname,
    });
  }, []);

  const handleSaveSurname = useCallback(
    async (surname: string) => {
      const validateSurname = await fetch(
        `/api/student/${studentInput.studentId}`,
        {
          method: "POST",
          body: JSON.stringify({ lastname: surname }),
        },
      );

      if (validateSurname.status === 404) {
        throw new Error("Student Not Found");
      }

      if (validateSurname.status === 401) {
        throw new Error("Invalid Surname");
      }

      sendGAEvent({
        event: "get_student_data",
        action: "student_data",
      });

      const studentData = await validateSurname.json();
      setStudentData(studentData);
    },
    [studentInput.studentId],
  );

  return {
    process,
    setProcess,
    studentInput,
    studentData,
    handleSaveStudentId,
    handleSaveSurname,
  };
}
