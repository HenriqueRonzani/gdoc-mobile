import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { useFormContext } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { ItemType } from 'react-native-dropdown-picker'
import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { getCities, getStates } from '@/services/cep.service'
import { GdocCep } from '@/components/form/gdoc-cep'
import { View } from 'react-native'

export function AddressForm() {
  const {watch} = useFormContext()

  const [states, setStates] = useState<ItemType<string>[]>([])
  const [cities, setCities] = useState<ItemType<string>[]>([])
  const selectedState = watch('state')

  useEffect(() => {
    getStates().then(data => {
      const formattedStates = data.map((state: any) => ({
        label: state.nome,
        value: state.sigla
      }))
      setStates(formattedStates)
    })
  }, [])

  useEffect(() => {
    if (selectedState) {
      getCities(selectedState).then(data => {
        const formattedCities = data.map((city: any) => ({
          label: city.nome,
          value: city.nome
        }))
        setCities(formattedCities)
      })
    } else {
      setCities([])
    }
  }, [selectedState])

  return (
    <View style={{flex: 1, gap: 10}}>
      <GdocFormItem name={'zip'}>
        {(field) => (
          <>
            <GdocCep field={field} label="CEP" placeholder="CEP"/>
            <GdocFormError name={'zip'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'state'}>
        {(field) => (
          <>
            <GdocDropdown
              placeholder="Estado"
              items={states}
              field={field}
            />
            <GdocFormError name={'state'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'city'}>
        {(field) => (
          <>
            <GdocDropdown
              placeholder="Cidades"
              items={cities}
              field={field}
            />
            <GdocFormError name={'city'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'street'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label="Rua" placeholder="Rua"/>
            <GdocFormError name={'street'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'number'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label="Número" placeholder="Número"/>
            <GdocFormError name={'number'}/>
          </>
        )}
      </GdocFormItem>
      <GdocFormItem name={'complement'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label="Complemento" placeholder="Complemento"/>
            <GdocFormError name={'complement'}/>
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
      <GdocFormItem name={'confirm_password'}>
        {(field) => (
          <>
            <GdocTextInput field={field} label={'Confirme a senha'} placeholder={'Confirme a senha'}
                           secureTextEntry={true}/>
            <GdocFormError name={'confirm_password'}/>
          </>
        )}
      </GdocFormItem>
    </View>
  )
}
