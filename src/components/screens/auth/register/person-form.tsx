import { RegisterFormPersonSchema, RegisterPersonFormData } from '@/schemas/auth.schema'
import { GdocFormItem } from '@/components/gdoc-form/gdoc-form-item'
import { GdocTextInput } from '@/components/gdoc-form/gdoc-text-input'
import { GdocFormError } from '@/components/gdoc-form/gdoc-form-error'
import { Masks } from 'react-native-mask-input'
import { GdocDropdown } from '@/components/gdoc-form/gdoc-dropdown'
import { GdocForm } from '@/components/gdoc-form/gdoc-form'
import React from 'react'
import { useRegister } from '@/providers/register-context-provider'

const initialForm = {
  name: '',
  cpf_cnpj: '',
  birthday: '',
  genre: '',
  email: '',
  telephone: ''
}

const genreOptions = [
  {label: 'Masculino', value: 'male'},
  {label: 'Feminino', value: 'female'},
  {label: 'Outro', value: 'other'}
]

type Props = {
  onSubmit: (data: RegisterPersonFormData) => void
  footer: React.ReactNode
}

export function PersonForm({onSubmit, footer}: Props) {
  const {registerParams} = useRegister()
  return (
    <GdocForm
      initial={{...initialForm, ...registerParams}}
      onSubmit={onSubmit}
      schema={RegisterFormPersonSchema}
      confirmLabel="Próximo"
      footer={footer}
    >
      <GdocFormItem name={'name'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label="Nome completo" placeholder="Nome completo"/>
            <GdocFormError name={'name'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'cpf_cnpj'}>
        {(field) => (
          <>
            <GdocTextInput mask={Masks.BRL_CPF} field={field} label="CPF" placeholder="CPF"/>
            <GdocFormError name={'cpf_cnpj'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'birthday'}>
        {(field) => (
          <>
            <GdocTextInput mask={Masks.DATE_DDMMYYYY} field={field} label="Data de nascimento"
                           placeholder="Data de nascimento"/>
            <GdocFormError name={'birthday'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'genre'}>
        {(field) => (
          <>
            <GdocDropdown placeholder="Gênero" items={genreOptions} field={field}/>
            <GdocFormError name={'genre'}/>
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
    </GdocForm>
  )
}
