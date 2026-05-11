import { View } from 'react-native'
import React from 'react'
import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { GdocVerificationCodeInput } from '@/components/form/gdoc-verification-code-input'
import { VerifyRecoveryCodeFormData, VerifyRecoveryCodeFormSchema } from '@/schemas/recover.schema'

const initialForm = {verification_code: ''}

type Props = {
  onSubmit: (data: VerifyRecoveryCodeFormData) => void
  footer: React.ReactNode
}

export const TypeVerificationCodeForm = ({onSubmit, footer}: Props) => {
  return (
    <GdocForm
      initial={initialForm}
      schema={VerifyRecoveryCodeFormSchema}
      onSubmit={onSubmit}
      confirmLabel={'Verificar Código'}
      footer={footer}
    >
      <View style={{width: '80%', alignSelf: 'center'}}>
        <GdocFormItem name={'verification_code'}>
          {field => (
            <>
              <GdocVerificationCodeInput field={field} codeLength={6} onFinish={onSubmit} numberOnly={true}/>
              <GdocFormError name={'verification_code'}/>
            </>
          )}
        </GdocFormItem>
      </View>
    </GdocForm>
  )
}
