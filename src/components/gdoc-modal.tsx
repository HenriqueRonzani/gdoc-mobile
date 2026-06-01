import { ReactNode } from 'react'
import { IconButton, Modal, Portal, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { theme } from '@/theme'

type Props = {
  headerTitle?: string
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function GdocModal ({headerTitle, open, onClose, children}: Props) {
  return (
    <Portal>
      <Modal visible={open} onDismiss={onClose} contentContainerStyle={style.container}>
        <View style={style.header}>
          <IconButton icon={'close'} onPress={onClose} iconColor={theme.colors.onPrimary}/>
          <Text style={style.headerText}>{headerTitle}</Text>
        </View>

        <View style={style.content}>
          {children}
        </View>
      </Modal>
    </Portal>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row-reverse',
    backgroundColor: theme.colors.primary,
    color: theme.colors.onPrimary,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    color: theme.colors.onPrimary
  },
  content: {
    backgroundColor: theme.colors.background,
    paddingVertical: 20
  }
})
