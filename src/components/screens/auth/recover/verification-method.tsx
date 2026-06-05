import { OptionCard } from '@/components/gdoc-option-card'
import WhatsappIcon from '@/assets/whatsapp-icon.png'
import React from 'react'
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

type Props = {
  method: RecoveryMethod
  onClick: (value: number) => void
}

export function VerificationMethod({method, onClick}: Props) {
  return (
    <OptionCard
      style={styles.option}
      onPress={() => onClick(method.id)}
      optionName={method.type === 'telephone' ? 'Telefone / WhatsApp' : 'Email'}
      description={method.value}
      icon={method.type === 'telephone' ? WhatsappIcon : 'email-outline'}
    />
  )
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: theme.colors.gray
  }
})
