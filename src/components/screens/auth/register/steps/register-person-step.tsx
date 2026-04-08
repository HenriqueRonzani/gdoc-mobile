import { GdocText } from '@/components/gdoc-text'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { GdocMemo } from '@/components/gdoc-memo'
import { ScrollView, StyleSheet, View } from 'react-native'
import { RegisterPersonFormData } from '@/schemas/auth.schema'
import { useRegister } from '@/providers/register-context-provider'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocStepperProgressBar } from '@/components/stepper/gdoc-stepper-progress-bar'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { PersonForm } from '@/components/screens/auth/register/person-form'

export function RegisterPersonStep() {
  const {setRegisterParams} = useRegister()
  const {setStepName} = useStepper()

  const submit = (data: RegisterPersonFormData) => {
    setRegisterParams((prev) => ({
      ...prev,
      person: {
        ...prev.person, ...data
      }
    }))
    setStepName('address')
  }

  const footer = (
    <GdocGrayedButton
      onPress={() => setStepName('user_type')}
    >
      Voltar
    </GdocGrayedButton>
  )

  return (
    <View style={styles.container}>
      <View>
        <GdocPageTitle>Criação de conta Gdoc</GdocPageTitle>
        <GdocText>Preencha os seus dados abaixo</GdocText>
        <GdocStepperProgressBar/>
        <GdocMemo
          title="Dados pessoais"
          description="Complete os campos abaixo"
        />
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <PersonForm onSubmit={submit} footer={footer}/>
      </ScrollView>
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
