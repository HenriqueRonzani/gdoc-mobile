import { StyleSheet, View } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { GdocStepperProgressBar } from '@/components/stepper/gdoc-stepper-progress-bar'
import { GdocMemo } from '@/components/gdoc-memo'
import { GdocDivider } from '@/components/gdoc-divider'
import React from 'react'

export function RecoverHeader() {
  return (
    <View style={style.headerContainer}>
      <GdocMemo title={'Recuperar Conta'} description={'Siga o passo a passo abaixo para recuperar sua conta'}/>
      <View style={style.stepsContainer}>
        <GdocStepperProgressBar/>
        <GdocDivider/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingBottom: 4,
    gap: 16
  },
  stepsContainer: {
    width: '100%',
    paddingVertical: 4,
    gap: 16,
    paddingHorizontal: 15
  }
})
