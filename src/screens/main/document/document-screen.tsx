import { useNavigation, useRoute } from '@react-navigation/native'
import { DocumentRouteParam, NavigatorType, ParamType } from '@/types/navigation'
import { useEffect, useState } from 'react'
import { DocumentInfo } from '@/types/document'
import { getDocument } from '@/services/api/document.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { Icon } from 'react-native-paper/src'
import { ActivityIndicator, Text } from 'react-native-paper'
import { handleRequestError } from '@/services/request-error.helper'
import { RenderTimeline } from '@/components/screens/main/document/render-timeline'

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
      <Pressable style={style.backContainer} onPress={() => navigation.navigate('Inbox')}>
        <Icon source={'arrow-left'} size={25}/>
        <Text style={style.backText}>Voltar ao menu</Text>
      </Pressable>
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
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    fontSize: 12
  },
  content: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    gap: 15
  }
})
