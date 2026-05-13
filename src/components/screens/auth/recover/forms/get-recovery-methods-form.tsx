import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import React from 'react'
import { Masks } from 'react-native-mask-input'
import { GetRecoveryMethodsFormData, GetRecoveryMethodsFormSchema } from '@/schemas/auth/recover.schema'
import { useRecover } from '@/providers/recover-context-provider'

const initialForm = {cpfCnpj: ''}

type Props = {
  onSubmit: (data: GetRecoveryMethodsFormData) => void
  footer: React.ReactNode
  loading: boolean
}

export function GetRecoveryMethodsForm ({onSubmit, footer, loading}: Props) {
  const {recoverParams} = useRecover()
  return (
    <GdocForm
      initial={{...initialForm, ...recoverParams}}
      schema={GetRecoveryMethodsFormSchema}
      onSubmit={onSubmit}
      footer={footer}
      isLoading={loading}
      confirmLabel={"Próximo"}
    >
      <GdocFormItem name={'cpfCnpj'}>
        {field => (
          <>
            <GdocTextInput field={field} label="CPF/CNPJ" placeholder="CPF/CNPJ" mask={Masks.BRL_CPF_CNPJ}/>
            <GdocFormError name={'cpfCnpj'}/>
          </>
        )}
      </GdocFormItem>
    </GdocForm>
  )
}
