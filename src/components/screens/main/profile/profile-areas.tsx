import type { RenderConfig } from '@/components/gdoc-data-renderer'
import { GdocDataRenderer } from '@/components/gdoc-data-renderer'
import { GENDER_ENUM } from '@/enum/gender.enum'
import type { ProfileType } from '@/types/profile'
import { StyleSheet, View } from 'react-native'
import {useState} from 'react'
import { updateProfile } from '@/services/api/profile.service'
import { handleRequestError } from '@/services/request-error.helper'
import { useSnackbar } from '@/providers/snackbar-provider'
import { AddressModal } from './edit/address-modal'
import { PersonModal } from './edit/person-modal'
import type { UpdateUserProfileFormData } from '@/schemas/profile-edit.schema'
import dayjs from 'dayjs'

type Props = {
    profile: ProfileType
    reload: () => void
}

export function ProfileAreas({ profile, reload }: Props) {
  const {toastError} = useSnackbar()
  const [addressOpen, setAddressOpen] = useState<boolean>(false)
  const [personOpen, setPersonOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const personData: RenderConfig = [
    {
      title: 'Nome',
      value: profile.person.name
    },
    {
      title: 'CPF',
      value: profile.person.cpfCnpj
    },
    {
      title: 'Data de Nascimento',
      value: dayjs(profile.person.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    {
      title: 'Gênero',
      value: GENDER_ENUM[profile.person.gender]
    },
    {
      title: 'Nacionalidade',
      value: profile.person.nationality
    },
    {
      title: 'Naturalidade',
      value: profile.person.place_of_birth
    },
    {
      title: 'Nome da Mãe',
      value: profile.person.mother_name
    }
  ]

  const contactData: RenderConfig = [
    {
      title: 'E-mails',
      value: profile.person.email
    },
    {
      title: 'Telefone',
      value: profile.person.cellphone
    }
  ]

  const addressData: RenderConfig = [
    {
      title: 'CEP',
      value: profile.person.address?.zip
    },
    {
      title: 'UF',
      value: profile.person.address?.state
    },
    {
      title: 'Cidade',
      value: profile.person.address?.city
    },
    {
      title: 'Logradouro',
      value: profile.person.address?.street
    },
    {
      title: 'Número',
      value: profile.person.address?.number
    }
  ]

  const editProfile = async (data: UpdateUserProfileFormData) => {
    try {
      setLoading(true)
      await updateProfile({
        ...profile.person, 
        ...data, 
        address: {
          ...profile.person.address, 
          ...data.address
        }
      })
      reload()
      closeModals()
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  const closeModals = () => {
    setAddressOpen(false)
    setPersonOpen(false)
  }

  return (
    <View style={style.contentContainer}>
      <GdocDataRenderer
        renderConfig={personData}
        headerTitle={'Dados Pessoais'}
        headerAction={{
          title: 'Editar',
          onPress: () => setPersonOpen(true)
        }}
      />

      <GdocDataRenderer
        renderConfig={contactData}
        headerTitle={'Contatos'}
      />

      <GdocDataRenderer
        renderConfig={addressData}
        headerTitle={'Endereço'}
        headerAction={{
          title: 'Editar',
          onPress: () => setAddressOpen(true)
        }}
      />
      <PersonModal openModal={personOpen} onSave={editProfile} onClose={closeModals} loading={loading}/>
      <AddressModal open={addressOpen} onSave={editProfile} onClose={closeModals} loading={loading}/>
    </View>
  )
}
const style = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    gap: 15
  }
})
