import type { RenderConfig } from '@/components/gdoc-data-renderer'
import { GdocDataRenderer } from '@/components/gdoc-data-renderer'
import { GENDER_ENUM } from '@/enum/gender.enum'
import type { ProfileType } from '@/types/profile'
import { StyleSheet, View } from 'react-native'
import {useState} from 'react'
import { GdocModal } from '@/components/gdoc-modal'
import { ProfileModelScreens } from './profile-model-screens'

type Props = {
    profile: ProfileType
    reload?: () => void
}

export function ProfileAreas({ profile, reload }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [screen, setScreen] = useState('')

  const exampleData: RenderConfig = [
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
      value: profile.person.dateOfBirth
    },
    {
      title: 'Gênero',
      value: GENDER_ENUM[profile.person.gender]
    }
  ]

  const contatos: RenderConfig = [
    {
      title: 'E-mails',
      value: profile.person.email
    },
    {
      title: 'Telefone',
      value: profile.person.cellphone
    }
  ]

  const endereco: RenderConfig = [
    {
      title: 'CEP',
      value: profile.person.address?.zip
    },
    {
      title: 'Cidade',
      value: profile.person.address?.city
    },
    {
      title: 'UF',
      value: profile.person.address?.state
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
  return (
    <View style={style.contentContainer}>
      <GdocDataRenderer
        renderConfig={exampleData}
        headerTitle={'Dados Pessoais'}
        headerAction={{
          title: 'Editar',
          onPress: () => {
            setModalTitle('Editar dados pessoais')
            setScreen('DADOS_PESSOAIS')
            setModalOpen(true)
          }
        }}
      />

      <GdocDataRenderer
        renderConfig={contatos}
        headerTitle={'Contatos'}
      />

      <GdocDataRenderer
        renderConfig={endereco}
        headerTitle={'Endereço'}
        headerAction={{
          title: 'Editar',
          onPress: () => {
            setModalTitle('Editar endereço')
            setScreen('ENDERECO')
            setModalOpen(true)
          }
        }}
      />
      <GdocModal open={modalOpen} onClose={() => {
        setModalOpen(false)
      }} headerTitle={modalTitle}>
        {modalOpen && <ProfileModelScreens screen={screen} profile={profile} onSuccess={() => {
          setModalOpen(false); reload?.()
        }}/>}
      </GdocModal>
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
