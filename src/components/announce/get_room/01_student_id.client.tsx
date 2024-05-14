"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type SubmitHandler, useForm, set } from "react-hook-form";
import { type StepProps } from "./get_room.client";
import { useState } from "react";
import { AnnounceHeading } from "./heading";

interface StudentIdFormInput {
  studentId: string;
}

export default function StudentId({
  process,
  back,
  next,
  saveInput,
}: StepProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<StudentIdFormInput>({
    defaultValues: {
      studentId: "",
    },
  });

  const onSubmit: SubmitHandler<StudentIdFormInput> = async (data) => {
    setLoading(true);
    try {
      await saveInput(data.studentId);
      next();
    } catch (error) {
      setError("studentId", {
        type: "manual",
        message: "เลขประจำตัวนักเรียนไม่ถูกต้อง",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <AnnounceHeading
        process={process}
        step={1}
        label="กรอกเลขประจำตัวนักเรียน"
        back={back}
      />

      {process === "editing" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg"
        >
          <Input
            {...register("studentId", {
              required: "กรุณากรอกเลขประจำตัวนักเรียน หรือรหัสประจำตัวผู้สอบ",
              pattern: {
                value: /^[1,23,6][0-9]{4}$/,
                message: "เลขประจำตัวนักเรียนไม่ถูกต้อง",
              },
            })}
            type="text"
            placeholder="12345"
          />
          {errors.studentId && (
            <span className="text-sm text-red-500">
              {errors.studentId.message}
            </span>
          )}

          <div className="flex flex-col items-end">
            <Button type="submit" disabled={loading}>
              {loading ? "กำลังโหลด..." : "ยืนยัน"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
