import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { useOrganization } from '@/providers/organization-provider'
import { GdocCategories } from '@/components/screens/main/menu/gdoc-categories'
import { GdocServices } from '@/components/screens/main/menu/gdoc-services'
import { useEffect, useState } from 'react'
import { IconButton } from 'react-native-paper'
import { Icon } from 'react-native-paper/src'

export function MenuScreen() {
  const {organization} = useOrganization()

  const [parentId, setParentId] = useState<number|null>(null)
  const [serviceId, setServiceId] = useState<number>(organization.external_service_letter.root.id)
  const serviceLetterId = organization.external_service_letter_id

  const onPressCategory = (clickedServiceId: number) => {
    setServiceId(clickedServiceId)
  }

  const onPreviousCategory = () => {
    if (parentId)
      setServiceId(parentId)
  }

  return (
    <ScrollView style={style.container}>
      <GdocPageTitle>Serviços</GdocPageTitle>
      <View style={style.content}>
        <Text style={style.text}>Busque e solicite os serviços oferecidos por Prefeitura Municipal de Modelandia</Text>
        { parentId && (
          <Pressable style={style.backContainer} onPress={onPreviousCategory}>
            <Icon source={'arrow-left'} size={25}/>
            <Text style={style.backText}>Voltar a categoria anterior</Text>
          </Pressable>
        )}
        <GdocCategories serviceLetterId={serviceLetterId} serviceId={serviceId} onPressCategory={onPressCategory} setParentId={setParentId}/>
        <GdocServices serviceLetterId={serviceLetterId} serviceId={serviceId}/>
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
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 12
  },
  content: {
    gap: 30
  },
  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: '#7C7C7C',
    justifyContent: 'center',
    textAlign: 'center'
  }
})

