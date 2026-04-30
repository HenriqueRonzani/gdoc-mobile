import { GdocForm } from '@/components/form/gdoc-form'
import { z } from 'zod'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import React from 'react'

const initialForm = {cpf_cnpj: ''}
const schema = z.object({
  cpf_cnpj: z.string()
})

type Props = {
  onSubmit: (data: z.infer<typeof schema>) => void
  footer: React.ReactNode
}

export function UserIdentityForm ({onSubmit, footer}: Props) {
  return (
    <GdocForm
      initial={initialForm}
      schema={schema}
      onSubmit={onSubmit}
      footer={footer}
      confirmLabel={"Próximo"}
    >
      <GdocFormItem name={'cpf_cnpj'}>
        {field => (
          <>
            <GdocTextInput field={field} label="CPF/CNPJ" placeholder="CPF/CNPJ"/>
            <GdocFormError name={'cpf_cnpj'}/>
          </>
        )}
      </GdocFormItem>
    </GdocForm>
  )
}
