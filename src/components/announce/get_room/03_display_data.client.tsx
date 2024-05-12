"use client";
import { useEffect, useState } from "react";
import { type Process } from "./get_room.client";
import { AnnounceHeading } from "./heading";
import { Skeleton } from "@/components/ui/skeleton";

interface DisplayDataProps {
  process: Process;
  studentId: string;
}

/*
ex.
ชื่อ  นางสาวสุทธิชา  สีผาย
เลขประจำตัว  63012
แผนการเรียน  วิทย์ - คณิต
ชั้น  ม.5
ตึก  คุณหญิงหรั่ง กันตารัติ
ห้อง  833
เลขที่  20
ครูที่ปรึกษา  เรียนเด่น เล่นดี
                   เรียนเด่น เล่นดี
*/

// to be replaced with actual type
interface StudentData {
  name: string;
  studentId: string;
  academicProgram: string;
  grade: string;
  building: string;
  room: string;
  number: string;
  advisor: string[];
}

const ClipboardIcon = () => (
  <svg
    width="13"
    height="16"
    viewBox="0 0 13 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.65971 0C3.37297 0 2.32986 1.04311 2.32986 2.32986V2.33039C1.492 2.33404 1.03254 2.36295 0.690305 2.59162C0.520707 2.70495 0.37509 2.85056 0.261768 3.02016C0 3.41193 0 3.95729 0 5.04802V12.4259C0 13.8903 0 14.6225 0.454933 15.0774C0.909866 15.5324 1.64207 15.5324 3.10648 15.5324H9.31943C10.7838 15.5324 11.516 15.5324 11.971 15.0774C12.4259 14.6225 12.4259 13.8903 12.4259 12.4259V5.04802C12.4259 3.95729 12.4259 3.41193 12.1641 3.02016C12.0508 2.85056 11.9052 2.70495 11.7356 2.59162C11.3934 2.36295 10.9339 2.33404 10.096 2.33039V2.32986C10.096 1.04311 9.05294 0 7.76619 0H4.65971ZM4.65975 2.32977C4.65975 1.90085 5.00745 1.55315 5.43637 1.55315H6.98961C7.41852 1.55315 7.76623 1.90085 7.76623 2.32977C7.76623 2.75868 7.41852 3.10638 6.98961 3.10638H5.43637C5.00745 3.10638 4.65975 2.75868 4.65975 2.32977ZM3.88317 6.98931C3.45425 6.98931 3.10655 7.33702 3.10655 7.76593C3.10655 8.19485 3.45425 8.54255 3.88317 8.54255H8.54288C8.9718 8.54255 9.3195 8.19485 9.3195 7.76593C9.3195 7.33702 8.9718 6.98931 8.54288 6.98931H3.88317ZM3.88317 10.0958C3.45425 10.0958 3.10655 10.4435 3.10655 10.8724C3.10655 11.3013 3.45425 11.649 3.88317 11.649L6.98964 11.649C7.41856 11.649 7.76626 11.3013 7.76626 10.8724C7.76626 10.4435 7.41856 10.0958 6.98964 10.0958L3.88317 10.0958Z"
      fill="currentColor"
    />
  </svg>
);

const StudentLoadingSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-2">
    <div className="flex gap-2">
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[75px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[100px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[75px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-4 w-[50px]" />
      <Skeleton className="h-4 w-[50px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-4 w-[50px]" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  </div>
);

const StudentDataPanel = ({ studentData }: { studentData: StudentData }) => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      <h2 className="text-slate-600">ชื่อ</h2>
      <h2 className="text-slate-800">{studentData.name}</h2>
    </div>
    <div className="flex gap-2">
      <h2 className="text-slate-600">เลขประจำตัว</h2>
      <h2 className="text-slate-800">{studentData.studentId}</h2>
    </div>
    <div className="flex gap-2">
      <h2 className="text-slate-600">แผนการเรียน</h2>
      <h2 className="text-slate-800">{studentData.academicProgram}</h2>
    </div>
    <div className="flex gap-2">
      <h2 className="text-slate-600">ชั้น</h2>
      <h2 className="text-slate-800">{studentData.grade}</h2>
    </div>
    <div className="flex gap-2">
      <h2 className="text-slate-600">ตึก</h2>
      <h2 className="text-slate-800">{studentData.building}</h2>
    </div>
    <div className="flex gap-2">
      <h2 className="text-slate-600">ห้อง</h2>
      <h2 className="text-slate-800">{studentData.room}</h2>
    </div>
    <div className="flex gap-2">
      <h2 className="text-slate-600">เลขที่</h2>
      <h2 className="text-slate-800">{studentData.number}</h2>
    </div>
    <div className="flex gap-2">
      <h2 className="text-slate-600">ครูที่ปรึกษา</h2>
      <div className="flex flex-col gap-1">
        {studentData.advisor.map((advisor, index) => (
          <h2 key={index} className="text-slate-800">
            {advisor}
          </h2>
        ))}
      </div>
    </div>
  </div>
);

export default function DisplayData({ studentId, process }: DisplayDataProps) {
  const [studentData, setStudentData] = useState<StudentData>({
    name: "",
    studentId: "",
    academicProgram: "",
    grade: "",
    building: "",
    room: "",
    number: "",
    advisor: [],
  });

  const [studentDataLoading, setStudentDataLoading] = useState(false);

  useEffect(() => {
    if (process === "editing") {
      setStudentDataLoading(true);
      setTimeout(() => {
        setStudentData({
          name: "นางสาวสุทธิชา สีผาย",
          studentId: "63012",
          academicProgram: "วิทย์ - คณิต",
          grade: "ม.5",
          building: "คุณหญิงหรั่ง กันตารัติ",
          room: "833",
          number: "20",
          advisor: ["เรียนเด่น เล่นดี", "เรียนเด่น เล่นดี"],
        });
        setStudentDataLoading(false);
      }, 1000);
    }
  }, [studentId, process]);

  return (
    <div className="flex flex-col gap-2">
      <AnnounceHeading
        process={process}
        step={3}
        label="ตรวจสอบข้อมูล และ บันทึกภาพหน้าจอไว้เป็นหลักฐาน"
      />

      {process === "editing" && (
        <div className="flex w-full flex-col gap-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex items-center gap-2 text-slate-600">
            <ClipboardIcon />
            <h2 className="text-lg font-bold">ข้อมูลนักเรียน</h2>
          </div>

          {/* student data */}
          {studentDataLoading ? (
            <StudentLoadingSkeleton />
          ) : (
            <StudentDataPanel studentData={studentData} />
          )}
        </div>
      )}
    </div>
  );
}
