import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { ReactNode } from 'react'

export type DynamicFieldData = {
  id: string
  field_id: string | number
  value: any
};

interface Props {
  name: string
  children: (fields: DynamicFieldData[]) => ReactNode
}

export function GdocFormArray({name, children}: Props) {
  const {control} = useFormContext()
  const {fields} = useFieldArray({
    control,
    name
  })

  return children(fields as DynamicFieldData[])
}
