import { GdocForm } from "@/components/gdoc-form/gdoc-form";
import { GdocFormItem } from "@/components/gdoc-form/gdoc-form-item";
import { GdocTextInput } from "@/components/gdoc-form/gdoc-text-input";
import { GdocFormError } from "@/components/gdoc-form/gdoc-form-error";
import { LoginFormData, LoginFormSchema } from "@/schemas/auth.schema";
import React from "react";
import { Masks } from 'react-native-mask-input'

const initialForm = {cpf_cnpj: '', password: ''}

type Props = {
  children: React.ReactNode
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
  footer: React.ReactNode
}

export function LoginForm({children, onSubmit, isLoading, footer}: Props) {
  return (
    <GdocForm
      initial={initialForm}
      schema={LoginFormSchema}
      onSubmit={onSubmit}
      isLoading={isLoading}
      confirmLabel={'ACESSAR CONTA G-DOC'}
      footer={footer}
    >
      <GdocFormItem name={'cpf_cnpj'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label={'CPF'} placeholder={'CPF'} mask={Masks.BRL_CPF}/>
            <GdocFormError name={'cpf_cnpj'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'password'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label={'Senha'} placeholder={'Senha'} secureTextEntry={true}/>
            <GdocFormError name={'password'}/>
          </>
        )}
      </GdocFormItem>
      {children}
    </GdocForm>
  )
}