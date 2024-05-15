'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { type StepProps } from './get_room.client'
import { AnnounceHeading } from './heading'

interface SurnameFormInput {
  surname: string
}

interface ValidateSurnameProps extends StepProps {
  firstNameCheck: string
}

const mock = false

export default function ValidateSurname({
  process,
  back,
  next,
  saveInput,
  firstNameCheck,
}: ValidateSurnameProps) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SurnameFormInput>({
    defaultValues: {
      surname: '',
    },
  })

  const onSubmit: SubmitHandler<SurnameFormInput> = async (data) => {
    setLoading(true)
    try {
      await saveInput(data.surname)
      next()
      reset()
    } catch (error) {
      setError('surname', {
        type: 'manual',
        message: 'นามสกุลไม่ตรงกับชื่อ',
      })
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <AnnounceHeading
        process={process}
        step={2}
        label="กรอกนามสกุล"
        back={back}
      />

      {process === 'editing' && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-lg"
        >
          <Input disabled={true} type="text" value={firstNameCheck} />
          <Input
            {...register('surname', {
              required: 'กรุณากรอกนามสกุล',
            })}
            type="text"
            placeholder="นามสกุล"
            disabled={loading}
          />
          {errors.surname && (
            <span className="text-sm text-red-500">
              {errors.surname.message}
            </span>
          )}

          <div className="flex flex-col items-end">
            <Button disabled={loading} type="submit">
              {loading ? 'กำลังโหลด...' : 'ยืนยัน'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
