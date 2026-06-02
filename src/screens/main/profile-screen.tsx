import { Text } from 'react-native-paper'
import { StyleSheet, View, ScrollView } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { ProfileAreas } from '@/components/screens/main/profile/profile-areas'
import { useProfile } from '@/providers/profile-provider'


export function ProfileScreen() {
  const {profile} = useProfile()

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

      <View style={style.contentContainer}>
        <ProfileAreas profile={profile} />
      </View>
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
