import { GdocForm } from '@/components/form/gdoc-form'
import { RegisterOrganizationFormData, RegisterFormOrganizationSchema } from '@/schemas/auth.schema'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { Masks } from 'react-native-mask-input'
import React from 'react'
import { useRegister } from '@/providers/register-context-provider'

const initialForm = {
  name: '',
  cpfCnpj: '',
  email: '',
  cellphone: '',
  secondary_name: '',
  secondary_cpf_cnpj: ''
}

type Props = {
  onSubmit: (data: RegisterOrganizationFormData) => void
  footer: React.ReactNode
}

export function OrganizationForm({onSubmit, footer}: Props) {
  const {registerParams} = useRegister()
  return (
    <GdocForm
      initial={{...initialForm, ...registerParams}}
      onSubmit={onSubmit}
      schema={RegisterFormOrganizationSchema}
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
      <GdocFormItem name={'cpfCnpj'}>
        {(field) => (
          <>
            <GdocTextInput
              mask={Masks.BRL_CNPJ}
              field={field}
              label="CNPJ"
              placeholder="CNPJ"
              keyboardType={'numeric'}
            />
            <GdocFormError name={'cpfCnpj'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'email'}>
        {(field) => (
          <>
            <GdocTextInput
              field={field}
              label="Email"
              placeholder="Email"
              keyboardType={'email-address'}
            />
            <GdocFormError name={'email'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'cellphone'}>
        {(field) => (
          <>
            <GdocTextInput
              mask={Masks.BRL_PHONE}
              field={field}
              label="Telefone"
              placeholder="Telefone"
              keyboardType={'numeric'}
            />
            <GdocFormError name={'cellphone'}/>
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
      <GdocFormItem name={'secondary_cpf_cnpj'}>
        {(field) => (
          <>
            <GdocTextInput
              mask={Masks.BRL_CPF}
              field={field}
              label="Cpf do responsavel"
              placeholder="CPF do responsável"
              keyboardType={'numeric'}
            />
            <GdocFormError name={'secondary_cpf_cnpj'}/>
          </>
        )}
      </GdocFormItem>
    </GdocForm>
  )
}
