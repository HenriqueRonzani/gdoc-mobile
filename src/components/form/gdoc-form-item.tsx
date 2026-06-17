import type { ControllerRenderProps, FieldValues, UseFormSetValue} from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'

type Props = {
  name: string
  children: (
    field: ControllerRenderProps<FieldValues, string>,
    setValue: UseFormSetValue<FieldValues>
  ) => React.ReactElement
}

export function GdocFormItem ({name, children}: Props) {
  const { control, setValue } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => children(field, setValue)}
    />
  )
}
