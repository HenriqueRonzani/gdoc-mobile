import type { TextInputProps } from 'react-native-paper'
import type { ControllerRenderProps, FieldValues} from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { useEffect } from 'react'
import { getAddress } from '@/services/cep.service'
import { Masks } from 'react-native-mask-input'

type Props = TextInputProps & {
  field: ControllerRenderProps<FieldValues, string>
  nestedPath?: string
}

export function GdocCep ({field, nestedPath = '', ...rest}: Props) {
  const { setValue } = useFormContext()

  useEffect(() => {
    const cleanZip = field.value?.replace(/\D/g, '')
    if (cleanZip.length === 8) {
      getAddress(cleanZip).then((address) => {
        if (address) {
          setValue(`${nestedPath}street`, address.logradouro, { shouldValidate: true })
          setValue(`${nestedPath}neighborhood`, address.bairro, { shouldValidate: true })
          setValue(`${nestedPath}state`, address.uf, { shouldValidate: true })
          setValue(`${nestedPath}city`, address.localidade, { shouldValidate: true })
        }
      })
    }
  }, [field.value, setValue])

  return <GdocTextInput
    field={field}
    mask={Masks.ZIP_CODE}
    placeholder="CEP"
    {...rest}
  />
}
