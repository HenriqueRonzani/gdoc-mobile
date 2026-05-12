import { StyleSheet, Text, View } from 'react-native'
import { GdocService } from '@/components/screens/main/home/gdoc-service'
import { GdocPageTitle } from '@/components/gdoc-page-title'

export function MenuScreen() {
  return (
    <View style={style.container}>
      <GdocPageTitle>Serviços</GdocPageTitle>
      <Text style={style.text}>Busque e solicite os serviços oferecidos por Prefeitura Municipal de Modelandia</Text>

      {/* Esse é só um exemplo de como usar o componente, ajustar conforme o protótipo*/}
      <GdocService
        iconName={'wrench'}
        iconColor={'#1A237E'}
        title={'Chamado Técnico'}
        onPress={() => console.log('Clique no serviço')}/>
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
