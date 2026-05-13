import { Text } from 'react-native-paper'
import { StyleSheet, View, ScrollView } from 'react-native'
import type { RenderConfig } from '@/components/gdoc-data-renderer'
import { GdocDataRenderer } from '@/components/gdoc-data-renderer'
import { GdocPageTitle } from '@/components/gdoc-page-title'

const exampleData: RenderConfig = [
  {
    title: 'Nome',
    value: 'Henrique'
  },
  {
    title: 'CPF',
    value: '123.123.123-12'
  },
  {
    title: 'Data de Nascimento',
    value: '01/01/2005'
  },
  {
    title: 'Gênero',
    value: 'Masculino'
  },
  {
    title: 'Nacionalidade',
    value: 'Brasileiro'
  },
  {
    title: 'Nome da Mãe',
    value: 'Ana Maria',
    customActions: [
      {icon: 'plus', onPress: () => console.log('Adicionar')},
      {icon: 'pencil', onPress: () => console.log('Editar')},
      {icon: 'trash-can', onPress: () => console.log('Excluir')}
    ]
  }
]

const contatos: RenderConfig = [
  {
    title: 'E-mails',
    value: 'henrique@example.com',
     customActions: [
      {icon: 'plus', onPress: () => console.log('Adicionar')},
      {icon: 'pencil', onPress: () => console.log('Editar')},
      {icon: 'trash-can', onPress: () => console.log('Excluir')}
    ]
  },
  {
    title: 'Telefone',
    value: '(11) 91234-5678',
    customActions: [
      {icon: 'plus', onPress: () => console.log('Adicionar')},
      {icon: 'pencil', onPress: () => console.log('Editar')},
      {icon: 'trash-can', onPress: () => console.log('Excluir')}
    ]
  }
]

const endereco: RenderConfig = [
  {
    title: 'CEP',
    value: '88801-001'
  },
  {
    title: 'Cidade',
    value: 'Criciuma'
  },
  {
    title: 'UF',
    value: 'SC'
  },
  {
    title: 'Logradouro',
    value: 'Rua de testes'
  },
  {
    title: 'Número',
    value: '99'
  }
]

export function ProfileScreen() {
  return (
    <ScrollView style={style.container}>
      <GdocPageTitle>Meu Perfil</GdocPageTitle>
      <Text style={style.text}>Aqui você pode visualizar e gerenciar as informações da sua conta, como nome, e-mail e
        dados de contato.</Text>
      <View style={style.contentContainer}>

        {/* Esse é só um exemplo de como usar o componente, ajustar conforme o protótipo*/}
        <GdocDataRenderer
          renderConfig={exampleData}
          headerTitle={'Dados Pessoais'}
          headerAction={{title: 'Editar', onPress: () => console.log('Editar Header')}}
        />
        <GdocDataRenderer
          renderConfig={contatos}
          headerTitle={'Contatos'}
          headerAction={{title: 'Editar', onPress: () => console.log('Editar Header')}}
        /><GdocDataRenderer
          renderConfig={endereco}
          headerTitle={'Endereço'}
          headerAction={{title: 'Editar', onPress: () => console.log('Editar Header')}}
        />
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
    textAlign: 'center'
  }
})
