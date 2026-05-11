import React from 'react'
import { z } from 'zod'
import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { FinishResetPasswordFormData, FinishResetPasswordFormSchema } from '@/schemas/recover.schema'

const initialForm = {password: '', confirm_password: ''}

type Props = {
  onSubmit: (data: FinishResetPasswordFormData) => void
  footer: React.ReactNode
}

export function SetNewPasswordForm({onSubmit, footer}: Props) {
  return (
    <GdocForm
      initial={initialForm}
      schema={FinishResetPasswordFormSchema}
      onSubmit={onSubmit}
      footer={footer}
      confirmLabel={'Próximo'}
    >
      <GdocFormItem name={'password'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label={'Senha'} placeholder={'Senha'} secureTextEntry={true}/>
            <GdocFormError name={'password'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'confirm_password'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label={'Confirme a senha'} placeholder={'Confirme a senha'}
                           secureTextEntry={true}/>
            <GdocFormError name={'confirm_password'}/>
          </>
        )}
      </GdocFormItem>
    </GdocForm>
  )
}
