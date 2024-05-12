"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Process } from "./get_room.client";

interface StudentIdFormInput {
  studentId: string;
}

interface StudentIdProps {
  process: Process;
  back: () => void;
  next: () => void;
}

export default function StudentId({ process, back, next }: StudentIdProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentIdFormInput>({
    defaultValues: {
      studentId: "",
    },
  });

  const onSubmit: SubmitHandler<StudentIdFormInput> = (data) => {
    console.log(data);
    next();
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        className={cn(
          "rounded-lg border px-6 py-12 shadow-lg",
          process === "idle" && "border-slate-200 bg-white text-slate-700",
          process === "editing" && "bg-slate-700 text-white",
        )}
        onClick={() => {
          if (process === "done") back();
        }}
      >
        <div className="flex w-full items-center gap-2">
          <h2 className="text-5xl font-bold">01</h2>
          <h2 className="text-lg">กรอกเลขประจำตัวนักเรียน</h2>
        </div>
      </Button>

      {process === "editing" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg"
        >
          <Input
            {...register("studentId", {
              required: true,
              pattern: /^[5,6][0-9]{4}$/,
            })}
            type="text"
            placeholder="12345"
          />
          {errors.studentId && (
            <span className="text-sm text-red-500">
              กรุณากรอกเลขประจำตัวนักเรียนให้ถูกต้อง
            </span>
          )}

          <div className="flex flex-col items-end">
            <Button type="submit">ยืนยัน</Button>
          </div>
        </form>
      )}
    </div>
  );
}
