import type { ControllerRenderProps, FieldValues} from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'
import React from 'react'

type Props = {
  name: string
  children: (field: ControllerRenderProps<FieldValues, string>) => React.ReactElement
}

export function GdocFormItem ({name, children}: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => children(field)}
    />
  )
}
