import { PaperProvider, Text} from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import type { RenderConfig } from '@/components/gdoc-data-renderer'
import { GdocDataRenderer } from '@/components/gdoc-data-renderer'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { ProfileEditModal } from '@/components/screens/main/profile/profile-edit-modal'
import { useState } from "react";

const exampleData: RenderConfig = [
  {
    title: 'Nome',
    value: 'Henrique'
  },
  {
    title: 'CPF',
    value: '123.123.123-12',
    customActions: [
      {icon: 'plus', onPress: () => console.log('Adicionar')},
      {icon: 'pencil', onPress: () => console.log('Editar')},
      {icon: 'trash-can', onPress: () => console.log('Excluir')}
    ]
  }
]



export function ProfileScreen() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View style={style.container}>

    <PaperProvider>
          <ProfileEditModal active = {visible} onClose={hideModal}></ProfileEditModal>
      <GdocPageTitle>Meu Perfil</GdocPageTitle>
      <Text style={style.text}>Aqui você pode visualizar e gerenciar as informações da sua conta, como nome, e-mail e
        dados de contato.</Text>
      <View style={style.contentContainer}>

        {/* Esse é só um exemplo de como usar o componente, ajustar conforme o protótipo*/}
        <GdocDataRenderer
          renderConfig={exampleData}
          headerTitle={'Dados Pessoais'}
          headerAction={{title: 'Editar', onPress: showModal}}
        />
      </View>
    
      </PaperProvider>
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
  contentContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: '#7C7C7C',
    justifyContent: 'center',
    textAlign: 'center'
  }
})
