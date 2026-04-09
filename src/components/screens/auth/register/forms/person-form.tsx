import { RegisterFormPersonSchema, RegisterPersonFormData } from '@/schemas/auth.schema'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { Masks } from 'react-native-mask-input'
import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { GdocForm } from '@/components/form/gdoc-form'
import React from 'react'
import { useRegister } from '@/providers/register-context-provider'

const initialForm = {
  name: '',
  email: '',
  cpfCnpj: '',
  dateOfBirth: '',
  gender: '',
  cellphone: ''
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
      initial={{...initialForm, ...registerParams, ...registerParams.person}}
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
      <GdocFormItem name={'cpfCnpj'}>
        {(field) => (
          <>
            <GdocTextInput
              mask={Masks.BRL_CPF}
              field={field}
              label="CPF"
              placeholder="CPF"
              keyboardType={'number-pad'}
            />
            <GdocFormError name={'cpfCnpj'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'dateOfBirth'}>
        {(field) => (
          <>
            <GdocTextInput
              mask={Masks.DATE_DDMMYYYY}
              field={field}
              label="Data de nascimento"
              placeholder="Data de nascimento"
              keyboardType="number-pad"
            />
            <GdocFormError name={'dateOfBirth'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'gender'}>
        {(field) => (
          <>
            <GdocDropdown placeholder="Gênero" items={genreOptions} field={field}/>
            <GdocFormError name={'gender'}/>
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
    </GdocForm>
  )
}
