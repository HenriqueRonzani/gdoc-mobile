import { useNavigation, useRoute } from '@react-navigation/native'
import { DocumentRouteParam, NavigatorType, ParamType } from '@/types/navigation'
import { useEffect, useState } from 'react'
import { DocumentInfo } from '@/types/document'
import { getDocument } from '@/services/api/document.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { ScrollView, StyleSheet, View } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { ActivityIndicator } from 'react-native-paper'
import { handleRequestError } from '@/services/request-error.helper'
import { RenderTimeline } from '@/components/screens/main/document/render-timeline'
import { GdocBack } from '@/components/gdoc-back'

export function DocumentScreen() {
  const {toastError} = useSnackbar()
  const navigation = useNavigation<NavigatorType>()
  const route = useRoute<ParamType<DocumentRouteParam>>()
  const {uuid} = route.params

  const [document, setDocument] = useState<DocumentInfo>()
  const [loading, setLoading] = useState<boolean>(false)

  const loadDocument = async () => {
    try {
      setLoading(true)
      if (!uuid) throw Error('Uuid indefinida')
      const response = await getDocument(uuid)
      setDocument(response)
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao carregar documento')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocument()
  }, [uuid])

  return (
    <ScrollView style={style.container}>
      <GdocPageTitle>Visualizar Documento</GdocPageTitle>
      <GdocBack text={'Voltar ao menu'} onPress={() => navigation.navigate('Inbox')}/>
      <View style={style.content}>
        {loading
          ? <ActivityIndicator animating={true}/>
          : <RenderTimeline uuid={uuid} documentInfo={document}/>
        }
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8
  },
  content: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    gap: 15
  }
})
