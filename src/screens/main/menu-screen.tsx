import { StyleSheet, Text, View } from 'react-native'
import { GdocService } from '@/components/screens/main/home/gdoc-service'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { useOrganization } from '@/providers/organization-provider'

const data = {
  name: 'Empresas',
  items: [
    { id: 1106, name: 'Casa do empreendedor', icon_name: 'domain', icon_color: '#2E7D32' },
    { id: 1105, name: 'Fazenda', icon_name: 'domain', icon_color: '#2E7D32' }
  ]
}

export function MenuScreen() {
  const {organization} = useOrganization()
  return (
    <View style={style.container}>
      <GdocPageTitle>Serviços</GdocPageTitle>
      <Text style={style.text}>Busque e solicite os serviços oferecidos por {organization.name}</Text>

      {data.items.map((item) => (
        <GdocService
          key={item.id}
          iconName={item.icon_name}
          iconColor={item.icon_color}
          title={item.name}
          onPress={() => console.log(`Clique no serviço ${item.name}`)}
        />
      ))}
    </View>
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
  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: '#7C7C7C',
    justifyContent: 'center',
    textAlign: 'center'
  }
})
