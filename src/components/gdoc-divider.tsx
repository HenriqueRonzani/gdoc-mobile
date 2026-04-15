import { Divider, DividerProps } from 'react-native-paper'
import React from 'react'
import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export function GdocDivider(props: DividerProps) {

  return (
    <Divider
      style={[style.divider, props.style]}
      {...props}
    />
  )
}

const style = StyleSheet.create({
  divider: {
    backgroundColor: theme.colors.primary,
    height: 1,
    shadowRadius: 20
  }
})
