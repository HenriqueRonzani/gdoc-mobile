import { Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import React from 'react'

export function GdocPageTitle({children}: { children: React.ReactNode }) {
  return <Text style={style.title}>{children}</Text>
}

const style = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#565656',
    alignSelf: 'center'
  }
})
