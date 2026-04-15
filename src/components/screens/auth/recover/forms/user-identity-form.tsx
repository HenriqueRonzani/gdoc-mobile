import { GdocForm } from '@/components/form/gdoc-form.js'
import { z } from 'zod'
import { GdocFormItem } from '@/components/form/gdoc-form-item.js'
import { GdocTextInput } from '@/components/form/gdoc-text-input.js'
import { GdocFormError } from '@/components/form/gdoc-form-error.js'

const initialForm = {cpf_cnpj: ''}
const schema = z.object({
  cpf_cnpj: z.string()
})

type Props = {
  onSubmit: (data: z.infer<typeof schema>) => void
}

export function UserIdentityForm ({onSubmit}: Props) {
  return (
    <GdocForm
      initial={initialForm}
      schema={schema}
      onSubmit={onSubmit}
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
