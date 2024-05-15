'use client'

import { useCallback, useState } from 'react'
import { emptyStudent, student as StudentData } from '@/schema'
import { sendGAEvent } from '@next/third-parties/google'

import { getStudentName, getUniqueStudent } from './action'

export type Process = 'idle' | 'editing' | 'done'

export interface StudentInput {
  studentId: string
  firstNameCheck: string
}

export function useGetRoom() {
  const [studentInput, setStudentInput] = useState<StudentInput>({
    studentId: '',
    firstNameCheck: '',
  })
  const [studentData, setStudentData] = useState<StudentData>(emptyStudent)

  const [process, setProcess] = useState<
    Record<'step_1' | 'step_2' | 'step_3', Process>
  >({
    step_1: 'editing',
    step_2: 'idle',
    step_3: 'idle',
  })

  const handleSaveStudentId = useCallback(async (studentId: string) => {
    sendGAEvent({
      event: 'verify_student_id',
      action: 'student_id',
    })

    const studentName = await getStudentName(parseInt(studentId))

    if (!studentName) {
      throw new Error('Student Not Found')
    }

    setStudentInput({
      studentId: studentId,
      firstNameCheck: studentName,
    })
  }, [])

  const handleSaveSurname = useCallback(
    async (surname: string) => {
      const student = await getUniqueStudent(
        parseInt(studentInput.studentId),
        surname,
      )

      if (!student) {
        throw new Error('Wrong lastname')
      }

      sendGAEvent({
        event: 'get_student_data',
        action: 'student_data',
      })

      setStudentData(student)
    },
    [studentInput.studentId],
  )

  return {
    process,
    setProcess,
    studentInput,
    studentData,
    handleSaveStudentId,
    handleSaveSurname,
  }
}
