import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Pressable, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper/src'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import ExpoDocumentPicker from 'expo-document-picker'
import { EXTENSION_MIMETYPE_MAPPING } from '@/mapping/extesion-mimetype.mapping'
import { extension } from '@/types/service'

type Props = {
  field: ControllerRenderProps<FieldValues, string>
  allowedExtensions: extension[]
}
export function GdocAttachment ({field, allowedExtensions}: Props) {
  const handleClick = async () => {
    const allowedMimeTypes = allowedExtensions.flatMap(i => EXTENSION_MIMETYPE_MAPPING[i]) as string[]
    const result = await ExpoDocumentPicker.getDocumentAsync({
      type: allowedMimeTypes,
      copyToCacheDirectory: true
    })

    if (result.canceled) {
      console.log('Usuario cancelou escolha de anexo')
      return;
    }

    field.onChange(result.assets[0])
  }

  return (
    <Pressable style={style.container} onPress={handleClick}>
      <View style={style.textContainer}>
        <Icon size={10} source={'paperclip'}/>
        <Text style={style.text}>
          Clique para adicionar um anexo
        </Text>
      </View>
      // Adicionar preview ou icon quando for anexado
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    paddingHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.gray
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  text: {
    color: theme.colors.gray
  }
})
