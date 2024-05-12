"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function StudentId() {
  const [studentId, setStudentId] = useState<string>("");
  const [process, setProcess] = useState<"idle" | "editing" | "done">("idle");

  return (
    <div className="flex flex-col gap-2">
      <Button
        className={cn(
          "rounded-lg border px-6 py-12 shadow-lg",
          process === "idle" && "border-slate-200 bg-white text-slate-700",
          process === "editing" && "bg-slate-700 text-white",
        )}
        onClick={() => {
          if (process === "idle") setProcess("editing");
          else if (process === "done") setProcess("editing");
        }}
      >
        <div className="flex w-full items-center gap-2">
          <h2 className="text-5xl font-bold">01</h2>
          <h2 className="text-lg">กรอกเลขประจำตัวนักเรียน</h2>
        </div>
      </Button>

      {process === "editing" && (
        <div className="flex w-full flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
          <Input type="text" placeholder="12345" />
          <div className="flex flex-col items-end">
            <Button type="submit">บืนยัน</Button>
          </div>
        </div>
      )}
    </div>
  );
}
