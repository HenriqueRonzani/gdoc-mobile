import { z } from 'zod'
import { View } from 'react-native'
import React from 'react'
import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { GdocVerificationCodeInput } from '@/components/form/gdoc-verification-code-input'

const initialForm = {code: ''}
const schema = z.object({
  code: z.string().min(6)
})

type Props = {
  onSubmit: (data: z.infer<typeof schema>) => void
  footer: React.ReactNode
}

export const TypeVerificationCodeForm = ({onSubmit, footer}: Props) => {
  return (
    <GdocForm
      initial={initialForm}
      schema={schema}
      onSubmit={onSubmit}
      confirmLabel={'Verificar Código'}
      footer={footer}
    >
      <View style={{width: '80%', alignSelf: 'center'}}>
        <GdocFormItem name={'code'}>
          {field => (
            <>
              <GdocVerificationCodeInput field={field} codeLength={6} onFinish={onSubmit} numberOnly={true}/>
              <GdocFormError name={'code'}/>
            </>
          )}
        </GdocFormItem>
      </View>
    </GdocForm>
  )
}
