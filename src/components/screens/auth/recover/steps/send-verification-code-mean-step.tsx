import { StyleSheet, View } from 'react-native'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { RecoverHeader } from '@/components/screens/auth/recover/recover-header'
import React from 'react'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import WhatsappIcon from '@/assets/whatsapp-icon.png'
import { OptionCard } from '@/components/gdoc-option-card'

export function SendVerificationCodeMeanStep() {
  const {setStepName} = useStepper()

  const chooseMean = (mean: string) => {
    setStepName('type_verification_code')
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Escolha um contato para receber o código de recuperação</Text>
        <View style={{gap: 8}}>
          <OptionCard
            style={styles.option}
            onPress={() => chooseMean('e-mail')}
            optionName="E-mail"
            icon={'email-outline'}
          />
          <OptionCard
            style={styles.option}
            onPress={() => chooseMean('whatsapp')}
            optionName="Telefone / WhatsApp"
            icon={WhatsappIcon}
          />
        </View>

        <GdocGrayedButton onPress={() => setStepName('user_identity')}>
          Voltar
        </GdocGrayedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 8
  },
  title: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 4
  },
  option: {
    backgroundColor: theme.colors.gray
  },
  sendMeanItem: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 4,
    gap: 4
  },
  sendMeanTitle: {
    fontWeight: 'bold'
  },
  whatsappIcon: {
    width: 40,
    height: 40,
    marginVertical: 10
  }
})
