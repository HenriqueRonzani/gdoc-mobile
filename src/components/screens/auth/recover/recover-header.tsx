import { StyleSheet, View } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title.js'
import { GdocStepperProgressBar } from '@/components/stepper/gdoc-stepper-progress-bar.js'
import { GdocMemo } from '@/components/gdoc-memo.js'
import { GdocDivider } from '@/components/gdoc-divider.js'
import React from 'react'

export function RecoverHeader() {
  return (
    <View style={style.headerContainer}>
      <GdocPageTitle>Central de recuperação de conta</GdocPageTitle>
      <GdocStepperProgressBar/>
      <GdocMemo title={'Recuperar Conta'} description={'Siga o passo a passo abaixo para recuperar sua conta'}/>
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
