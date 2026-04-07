import { GdocText } from '@/components/gdoc-text'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { GdocStepperProgressBar } from '@/components/stepper/gdoc-stepper-progress-bar'
import { ScrollView, StyleSheet, View } from 'react-native'
import { GdocMemo } from '@/components/gdoc-memo'
import { Button, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NavigatorType } from '@/types/navigation'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { GdocPrimaryButton } from '@/components/button/gdoc-primary-button'
import { useRegister } from '@/providers/register-context-provider'
import { GdocUseTerms } from '@/components/screens/auth/register/gdoc-use-terms'

export function RegisterUseTermsStep() {
  const navigation = useNavigation<NavigatorType>()
  const {setStepName} = useStepper()

  const onSubmit = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <GdocPageTitle>Criação de conta Gdoc</GdocPageTitle>
      <GdocText>Preencha seus dados abaixo</GdocText>

      <GdocStepperProgressBar/>

      <GdocMemo title="Termos e condições" description="Complete os campos abaixo"/>
      <GdocUseTerms/>

      <GdocPrimaryButton onPress={() => onSubmit()}>
        Concordo e desejo criar uma conta
      </GdocPrimaryButton>

      <GdocGrayedButton onPress={() => setStepName('address')}>
        Voltar
      </GdocGrayedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8
  }
})
