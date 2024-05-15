'use client'

import StudentId from './01_student_id.client'
import ValidateSurname from './02_validate_surname.client'
import DisplayData from './03_display_data.client'
import { Process, useGetRoom } from './useGetRoom'

export interface StepProps {
  process: Process
  back: () => void
  next: () => void
  saveInput: (input: string) => Promise<void>
}

export default function GetRoom() {
  const {
    studentInput,
    studentData,
    process,
    setProcess,
    handleSaveStudentId,
    handleSaveSurname,
  } = useGetRoom()

  return (
    <section className="relative -top-8 flex w-full flex-col rounded-t-xl bg-white px-4 py-16 text-lg">
      <div className="mx-auto flex w-full max-w-xs flex-col gap-y-8">
        <StudentId
          process={process.step_1}
          back={() => {
            setProcess({
              step_1: 'editing',
              step_2: 'idle',
              step_3: 'idle',
            })
          }}
          next={() => {
            setProcess({
              step_1: 'done',
              step_2: 'editing',
              step_3: 'idle',
            })
          }}
          saveInput={handleSaveStudentId}
        />
        <ValidateSurname
          process={process.step_2}
          back={() => {
            setProcess({
              step_1: 'done',
              step_2: 'editing',
              step_3: 'idle',
            })
          }}
          next={() => {
            setProcess({
              step_1: 'done',
              step_2: 'done',
              step_3: 'editing',
            })
          }}
          saveInput={handleSaveSurname}
          firstNameCheck={studentInput.firstNameCheck}
        />
        <DisplayData process={process.step_3} studentData={studentData} />
      </div>
    </section>
  )
}
