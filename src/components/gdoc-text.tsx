import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import React from 'react'

export function GdocText({children}: { children: React.ReactNode }) {
  return <Text style={styles.text}>{children}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    alignSelf: 'center',
    color: theme.colors.primaryText
  }
})
