import React, { useEffect, useState } from 'react'
import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { GdocCep } from '@/components/form/gdoc-cep'
import { Masks } from 'react-native-mask-input'
import { AddressEditSchema, EmailEditSchema, PhoneEditSchema, ProfileEditSchema } from '@/schemas/profile-edit.schema'
import type { ProfileType } from '@/types/profile'
import api from '@/lib/axios'
import type { ItemType } from 'react-native-dropdown-picker'
import { getCities, getStates } from '@/services/cep.service'

type Props = {
  screen: string
  profile: ProfileType
  onSuccess?: () => void
}

export function ProfileModelScreens({ screen, profile, onSuccess}: Props) {
  const [states, setStates] = useState<ItemType<string>[]>([])
  const [cities, setCities] = useState<ItemType<string>[]>([])

  useEffect(() => {
    getStates().then((data) => {
      const formattedStates = data.map((state: { nome: string, sigla: string }) => ({
        label: state.nome,
        value: state.sigla
      }))
      setStates(formattedStates)
    })

    const profileState = profile.person.address?.state
    if (profileState) {
      getCities(profileState).then((data) => {
        const formattedCities = data.map((city: { nome: string }) => ({
          label: city.nome,
          value: city.nome
        }))
        setCities(formattedCities)
      })
    }
  }, [profile])

  async function updateProfile(data: object) {
    try {
      let payload: object

      if (screen === 'ENDERECO') {
        const updatedAddress = {
          ...profile.person.address,
          ...data
        }

        payload = {
          ...profile.person,
          address: updatedAddress
        }
      } else {
        payload = {
          ...profile.person,
          ...data
        }
      }

      await api.put('/user/me', payload)
      onSuccess?.()
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    }
  }

  const handleStateChange = (stateSigla: string) => {
    if (stateSigla) {
      getCities(stateSigla).then((data) => {
        const formattedCities = data.map((city: { nome: string }) => ({
          label: city.nome,
          value: city.nome
        }))
        setCities(formattedCities)
      })
    }
  }

  switch (screen) {
  case 'DADOS_PESSOAIS': {
    const initialValues = {
      name: profile.person.name || '',
      gender: profile.person.gender
    }
    const genreOptions = [
      { label: 'Masculino', value: 'male' },
      { label: 'Feminino', value: 'female' },
      { label: 'Outro', value: 'other' }
    ]

    return (
      <GdocForm schema={ProfileEditSchema} onSubmit={updateProfile} confirmLabel="Salvar" initial={initialValues}>
        <GdocFormItem name={'name'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Nome completo" placeholder="Nome completo" />
              <GdocFormError name={'name'} />
            </>
          )}
        </GdocFormItem>
        <GdocFormItem name={'gender'}>
          {field => (
            <>
              <GdocDropdown placeholder="Gênero" items={genreOptions} field={field} />
              <GdocFormError name={'gender'} />
            </>
          )}
        </GdocFormItem>
      </GdocForm>
    )
  }

  case 'EMAIL': {
    const initialValues = { email: profile.person.email }
    return (
      <GdocForm schema={EmailEditSchema} onSubmit={updateProfile} confirmLabel="Salvar" initial={initialValues}>
        <GdocFormItem name={'email'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Email" placeholder="Email" keyboardType={'email-address'}/>
              <GdocFormError name={'email'} />
            </>
          )}
        </GdocFormItem>
      </GdocForm>
    )
  }

  case 'TELEPHONE': {
    const initialValues = { cellphone: profile.person.cellphone }
    return (
      <GdocForm schema={PhoneEditSchema} onSubmit={updateProfile} confirmLabel="Salvar" initial={initialValues}>
        <GdocFormItem name={'cellphone'}>
          {field => (
            <>
              <GdocTextInput mask={Masks.BRL_PHONE} field={field} label="Telefone" placeholder="Telefone" keyboardType={'numeric'}/>
              <GdocFormError name={'cellphone'} />
            </>
          )}
        </GdocFormItem>
      </GdocForm>
    )
  }

  case 'ENDERECO': {
    const initialValues = {
      zip: profile.person.address?.zip ?? '',
      street: profile.person.address?.street ?? '',
      city: profile.person.address?.city ?? '',
      state: profile.person.address?.state ?? '',
      number: profile.person.address?.number ?? ''
    }

    return (
      <GdocForm schema={AddressEditSchema} confirmLabel='Salvar' initial={initialValues} onSubmit={updateProfile}>
        <GdocFormItem name={'zip'}>
          {field => (
            <>
              <GdocCep field={field} label="CEP" placeholder="CEP" />
              <GdocFormError name={'zip'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'state'}>
          {field => (
            <>
              <GdocDropdown
                placeholder="Estado"
                items={states}
                field={{
                  ...field,
                  onChange: (value) => {
                    field.onChange(value)
                    handleStateChange(value)
                  }
                }}
              />
              <GdocFormError name={'state'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'city'}>
          {field => (
            <>
              <GdocDropdown placeholder="Cidades" items={cities} field={field} />
              <GdocFormError name={'city'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'street'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Rua" placeholder="Rua" />
              <GdocFormError name={'street'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'number'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Número" placeholder="Número" />
              <GdocFormError name={'number'} />
            </>
          )}
        </GdocFormItem>
      </GdocForm>
    )
  }

  default:
    return null
  }
}
