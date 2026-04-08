import { GdocText } from '@/components/gdoc-text'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { StyleSheet, View } from 'react-native'
import { GdocMemo } from '@/components/gdoc-memo'
import { OptionCard } from '@/components/gdoc-option-card'
import individual from '@/assets/individual-icon.png'
import legal from '@/assets/legal-entity-icon.png'
import { useRegister } from '@/providers/register-context-provider'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocStepperProgressBar } from '@/components/stepper/gdoc-stepper-progress-bar'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { useNavigation } from '@react-navigation/native'
import { NavigatorType } from '@/types/navigation'


export function RegisterUserTypeStep() {
  const navigation = useNavigation<NavigatorType>()
  const {setStepName} = useStepper()
  const {setRegisterParams} = useRegister()

  const chooseType = (type: string) => {
    setRegisterParams((prev) => ({
      ...prev,
      type: type ? 'Pessoa física' : 'Pessoa jurídica'
    }))
    setStepName(`${type}_data`)
  }

  return (
    <View style={styles.container}>
      <View>
        <GdocPageTitle>Criação de conta Gdoc</GdocPageTitle>
        <GdocText>Escolha o tipo da sua conta</GdocText>
        <GdocStepperProgressBar/>
        <GdocMemo title="Tipo de conta" description="Preencha os campos abaixo"/>
      </View>

      <OptionCard
        onPress={() => chooseType('person')}
        optionName="Pessoa Física"
        imageSource={individual}
      />
      <OptionCard
        onPress={() => chooseType('organization')}
        optionName="Pessoa Jurídica"
        imageSource={legal}
      />

      <GdocGrayedButton onPress={() => navigation.navigate('Login')}>
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
