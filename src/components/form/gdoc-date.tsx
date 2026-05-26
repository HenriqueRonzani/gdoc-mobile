import { type TextInputProps } from 'react-native-paper'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { Masks } from 'react-native-mask-input'

type Props = TextInputProps & {
  field: ControllerRenderProps<FieldValues, string>
}

export function GdocDate ({...props}: Props) {
  return <GdocTextInput
    mask={Masks.DATE_DDMMYYYY}
    {...props}
  />
}
