import { TextInputProps } from 'react-native-paper'
import { ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form'
import { GdocTextInput } from '@/components/gdoc-form/gdoc-text-input'
import { useEffect } from 'react'
import { getAddress } from '@/services/cep.service'
import { Masks } from 'react-native-mask-input'

type Props = TextInputProps & {
  field: ControllerRenderProps<FieldValues, string>
}

export function GdocCep ({field, ...rest}: Props) {
  const { setValue } = useFormContext()

  useEffect(() => {
    const cleanZip = field.value?.replace(/\D/g, '');

    if (cleanZip.length === 8) {
      getAddress(cleanZip).then(address => {
        if (address) {
          setValue('street', address.logradouro, { shouldValidate: true });
          setValue('neighborhood', address.bairro, { shouldValidate: true });
          setValue('state', address.uf, { shouldValidate: true });
          setValue('city', address.localidade, { shouldValidate: true });
        }
      });
    }
  }, [field.value, setValue])

  return <GdocTextInput
    field={field}
    mask={Masks.ZIP_CODE}
    placeholder="CEP"
    {...rest}
  />
}
