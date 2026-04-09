import { GdocPageTitle } from '@/components/gdoc-page-title'
import { GdocStepperProgressBar } from '@/components/stepper/gdoc-stepper-progress-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GdocMemo } from '@/components/gdoc-memo'
import { GdocDivider } from '@/components/gdoc-divider'

type Props = {
  memoTitle: string,
  memoDescription: string
}

export function RegisterHeader({memoTitle, memoDescription}: Props) {

  return (
    <View style={style.headerContainer}>
      <GdocPageTitle>Criação de conta Gdoc</GdocPageTitle>
      <GdocStepperProgressBar/>
      <GdocMemo title={memoTitle} description={memoDescription}/>
      <GdocDivider/>
    </View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingVertical: 4,
    gap: 8
  }
})
