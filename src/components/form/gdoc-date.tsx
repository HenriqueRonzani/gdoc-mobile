import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { GdocTextInput, GdocTextInputProps } from '@/components/form/gdoc-text-input'
import { Masks } from 'react-native-mask-input'

type Props = GdocTextInputProps & {
  field: ControllerRenderProps<FieldValues, string>
}

export function GdocDate ({...props}: Props) {
  return <GdocTextInput
    mask={Masks.DATE_DDMMYYYY}
    {...props}
  />
}
