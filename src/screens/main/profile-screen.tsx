import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { StyleSheet, View, ScrollView } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { getProfile } from '@/services/profile.service'
import { ProfileAreas } from '@/components/screens/main/profile/profile-areas'
import { ProfileType } from '@/types/profile'
import { useSnackbar } from '@/providers/snackbar-provider'

const initialProfile: ProfileType = {
  person: {
    name: '',
    cpfCnpj: '',
    dateOfBirth: '',
    gender: 'null' as any,
    email: '',
    cellphone: '',
    address: {
      zip: '',
      city: '',
      state: '',
      street: '',
      number: ''
    }
  }
}

export function ProfileScreen() {
  const { toastError } = useSnackbar()
  const [profile, setProfile] = useState<ProfileType>(initialProfile)
  const [loading, setLoading] = useState(false)

  async function loadProfile() {
    setLoading(true)
    try {
      const data = await getProfile()
      setProfile(data)
    } catch (err: unknown) {
      toastError('Erro ao carregar perfil')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProfile() }, [])

  return (
    <ScrollView style={style.container}>

      <GdocPageTitle>
        Meu Perfil
      </GdocPageTitle>

      <Text style={style.text}>
        Aqui você pode visualizar e gerenciar
        as informações da sua conta, como nome,
        e-mail e dados de contato.
      </Text>
      {
        loading
          ? <Text>Carregando...</Text>
          : (
            <View style={style.contentContainer}>
              <ProfileAreas profile={profile} />

            </View>
          )
      }
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8
  },

  contentContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    gap: 15
  },

  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: '#7C7C7C',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10
  }
})