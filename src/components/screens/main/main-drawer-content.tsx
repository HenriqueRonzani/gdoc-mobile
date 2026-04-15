import { Image, StyleSheet, View } from 'react-native'
import { theme } from '@/theme'
import Logo from '@/assets/logo-global-fundo-branco.png'
import { IconButton, Text } from 'react-native-paper'
import { useAuth } from '@/providers/auth-provider'
import { SectionsRenderer, SectionsConfig } from '@/components/gdoc-sections-renderer'

const getDrawerConfig = (navigation: any): SectionsConfig => {
  return [
    {
      name: 'Navegação',
      items: [
        {
          icon: 'home',
          title: 'Página Inicial',
          onPress: () => navigation.navigate('Menu')
        },
        {
          icon: 'account',
          title: 'Meu Perfil',
          onPress: () => null
        },
        {
          icon: 'inbox',
          title: 'Minhas Solicitações',
          onPress: () => null
        }
      ]
    },
    {
      name: 'Serviços',
      items: [
        {
          icon: 'file-document-multiple-outline',
          title: 'Carta de Serviço',
          onPress: () => navigation.navigate('Menu')
        },
        {
          icon: 'shield-check',
          title: 'Autenticidade de Documento',
          onPress: () => null
        }
      ]
    },
    {
      name: 'Transparência',
      items: [{
        icon: 'file-document-outline',
        title: 'LAI - Acesso à Informação',
        onPress: () => null
      }]
    }
  ]
}

export function MainDrawerContent(props: any) {
  const {clearToken} = useAuth()
  const drawerItems = getDrawerConfig(props.navigation)
  return (
    <View style={style.container}>
      <View style={style.drawerHeader}>
        <View style={style.userData}>
          <Image source={Logo} style={style.userAvatar} resizeMode="contain"></Image>
          <Text style={{fontSize: 10}}>Nome do usuário</Text>
        </View>
        <IconButton icon={'logout'} size={15} iconColor={theme.colors.primaryText} onPress={clearToken}/>
      </View>
      <SectionsRenderer drawerSectionsConfig={drawerItems}/>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  drawerHeader: {
    backgroundColor: theme.colors.gray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    padding: 5
  },
  userData: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: theme.colors.gray
  }
})
