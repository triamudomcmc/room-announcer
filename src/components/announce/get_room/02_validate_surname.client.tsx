"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type StepProps } from "./get_room.client";
import { AnnounceHeading } from "./heading";
import { useEffect, useState } from "react";

interface SurnameFormInput {
  surname: string;
}

interface ValidateSurnameProps extends StepProps {
  studentId: string;
}

export default function ValidateSurname({
  process,
  back,
  next,
  saveInput,
  studentId,
}: ValidateSurnameProps) {
  const [firstNameLoading, setFirstNameLoading] = useState(false);
  const [firstName, setFirstName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (process === "editing") {
      setFirstNameLoading(true);
      setTimeout(() => {
        setFirstName("ปณิธิ");
        setFirstNameLoading(false);
      }, 1000);
    }
  }, [studentId, process]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SurnameFormInput>({
    defaultValues: {
      surname: "",
    },
  });

  const onSubmit: SubmitHandler<SurnameFormInput> = async (data) => {
    try {
      await saveInput(data.surname);
      next();
    } catch (error) {
      setError("surname", {
        type: "manual",
        message: "นามสกุลไม่ไม่ตรงกับชื่อ",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <AnnounceHeading
        process={process}
        step={2}
        label="กรอกนามสกุล"
        back={back}
      />

      {process === "editing" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg"
        >
          <Input
            disabled={true}
            type="text"
            value={firstNameLoading ? "กำลังโหลด..." : firstName}
          />
          <Input
            {...register("surname", {
              required: "กรุณากรอกนามสกุล",
              pattern: {
                value: /^[ก-๏\s]+$/,
                message: "นามสกุลไม่ถูกต้อง",
              },
            })}
            type="text"
            placeholder="นามสกุล"
            disabled={firstNameLoading}
          />
          {errors.surname && (
            <span className="text-sm text-red-500">
              {errors.surname.message}
            </span>
          )}

          <div className="flex flex-col items-end">
            <Button disabled={loading || firstNameLoading} type="submit">
              {loading || firstNameLoading ? "กำลังโหลด..." : "ยืนยัน"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
