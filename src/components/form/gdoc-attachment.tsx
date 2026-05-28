import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { Pressable, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper/src'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import * as DocumentPicker from 'expo-document-picker'
import { EXTENSION_MIMETYPE_MAPPING } from '@/mapping/extension-mimetype.mapping'
import { extension, FileValue } from '@/types/service'

type Props = {
  field: ControllerRenderProps<FieldValues, string>
  allowedExtensions: extension[]
}

export function GdocAttachment ({field, allowedExtensions}: Props) {
  const handleClick = async () => {
    const cleanExtensions = allowedExtensions.flatMap(i => i.split(',')).map(i => i.trim()) as extension[]
    const allowedMimeTypes = cleanExtensions.flatMap(i => EXTENSION_MIMETYPE_MAPPING[i]).filter(Boolean) as string[]

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: allowedMimeTypes,
        copyToCacheDirectory: true
      })

      if (result.canceled) {
        console.log('Usuario cancelou escolha de anexo')
        return
      }
      const file = result.assets[0]

      const fileFormatted: FileValue = {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || 'application/octet-stream'
      }

      field.onChange(fileFormatted)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Pressable style={style.container} onPress={handleClick}>
      <View style={style.textContainer}>
        <Icon size={14} source={'paperclip'} color={!field.value ? 'red' : 'black'}/>
        <Text style={style.text}>
          { !field.value ? 'Toque para adicionar um anexo' : 'Toque para trocar o anexo' }
        </Text>
      </View>
      {/*Adicionar preview ou icon quando for anexado*/}
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.gray,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderStyle: 'dashed',
    paddingVertical: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 6,
    alignItems: 'center'
  },
  text: {
    color: '#000000BB',
    fontSize: 12,
    fontWeight: 'bold',
  }
})
