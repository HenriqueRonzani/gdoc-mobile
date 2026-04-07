import { GdocForm } from '@/components/gdoc-form/gdoc-form'
import { RegisterCompanyFormData, RegisterFormCompanySchema } from '@/schemas/auth.schema'
import { GdocFormItem } from '@/components/gdoc-form/gdoc-form-item'
import { GdocTextInput } from '@/components/gdoc-form/gdoc-text-input'
import { GdocFormError } from '@/components/gdoc-form/gdoc-form-error'
import { Masks } from 'react-native-mask-input'
import React from 'react'
import { useRegister } from '@/providers/register-context-provider'

const initialForm = {
  name: '',
  cpf_cnpj: '',
  email: '',
  telephone: '',
  secondary_name: '',
  secondary_cpf: ''
}

type Props = {
  onSubmit: (data: RegisterCompanyFormData) => void
  footer: React.ReactNode
}

export function CompanyForm({onSubmit, footer}: Props) {
  const {registerParams} = useRegister()
  return (
    <GdocForm
      initial={{...initialForm, ...registerParams}}
      onSubmit={onSubmit}
      schema={RegisterFormCompanySchema}
      confirmLabel="Próximo"
      footer={footer}
    >
      <GdocFormItem name={'name'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label="Nome da organização" placeholder="Nome da organização"/>
            <GdocFormError name={'name'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'cpf_cnpj'}>
        {(field) => (
          <>
            <GdocTextInput mask={Masks.BRL_CNPJ} field={field} label="CNPJ" placeholder="CNPJ"/>
            <GdocFormError name={'cpf_cnpj'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'email'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label="Email" placeholder="Email"/>
            <GdocFormError name={'email'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'telephone'}>
        {(field) => (
          <>
            <GdocTextInput mask={Masks.BRL_PHONE} field={field} label="Telefone" placeholder="Telefone"/>
            <GdocFormError name={'telephone'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'secondary_name'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label="Nome completo" placeholder="Nome completo"/>
            <GdocFormError name={'secondary_name'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'secondary_cpf'}>
        {(field) => (
          <>
            <GdocTextInput mask={Masks.BRL_CPF} field={field} label="Cpf do responsavel"
                           placeholder="CPF do responsável"/>
            <GdocFormError name={'secondary_cpf'}/>
          </>
        )}
      </GdocFormItem>
    </GdocForm>
  )
}
