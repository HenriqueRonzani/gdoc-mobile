import { GdocCep } from '@/components/form/gdoc-cep'
import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocModal } from '@/components/gdoc-modal'
import { useProfile } from '@/providers/profile-provider'
import { UpdateUserProfileSchema, type UpdateUserProfileFormData } from '@/schemas/profile-edit.schema'
import { getCities, getStates } from '@/services/cep.service'
import { useEffect, useState } from 'react'
import type { ItemType } from 'react-native-dropdown-picker'

type Props = {
  open: boolean
  loading: boolean
  onSave: (data: UpdateUserProfileFormData) => void
  onClose: () => void
}

export function AddressModal ({open, loading, onSave, onClose}: Props) {
  const {profile} = useProfile()

  const [states, setStates] = useState<ItemType<string>[]>([])
  const [cities, setCities] = useState<ItemType<string>[]>([])

  const initialValues = {
    address: {
      zip: profile.person.address?.zip ?? '',
      street: profile.person.address?.street ?? '',
      city: profile.person.address?.city ?? '',
      state: profile.person.address?.state ?? '',
      number: profile.person.address?.number ?? ''
    }
  } as UpdateUserProfileFormData

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

  return (
    <GdocModal open={open} onClose={onClose} headerTitle='Editar endereço'>
      <GdocForm schema={UpdateUserProfileSchema} confirmLabel='Salvar' initial={initialValues} onSubmit={onSave} isLoading={loading}>
        <GdocFormItem name={'address.zip'}>
          {field => (
            <>
              <GdocCep nestedPath='address.' field={field} label="CEP" placeholder="CEP" />
              <GdocFormError name={'address.zip'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'address.state'}>
          {(field, setValue) => (
            <>
              <GdocDropdown
                placeholder="Estado"
                items={states}
                listMode='MODAL'
                field={{
                  ...field,
                  onChange: (value) => {
                    field.onChange(value)
                    handleStateChange(value)
                    setValue('address.city', '')
                  }
                }}
              />
              <GdocFormError name={'address.state'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'address.city'}>
          {field => (
            <>
              <GdocDropdown listMode='MODAL' placeholder="Cidades" items={cities} field={field} />
              <GdocFormError name={'address.city'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'address.street'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Rua" placeholder="Rua" />
              <GdocFormError name={'address.street'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'address.number'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Número" placeholder="Número" />
              <GdocFormError name={'address.number'} />
            </>
          )}
        </GdocFormItem>
      </GdocForm>
    </GdocModal>
  )
}
