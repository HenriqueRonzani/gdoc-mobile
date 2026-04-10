import { Divider } from 'react-native-paper'
import React from 'react'
import { theme } from '@/theme'

export function GdocDivider () {

  return(
    <Divider style={{backgroundColor: theme.colors.primary, height: 1, shadowRadius: 20}}/>
  )
}
