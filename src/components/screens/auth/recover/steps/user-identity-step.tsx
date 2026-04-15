import { StyleSheet, View } from 'react-native'
import { RecoverHeader } from '@/components/screens/auth/recover/recover-header.js'
import { theme } from '@/theme/index.js'
import { Text } from 'react-native-paper'
import { UserIdentityForm } from '@/components/screens/auth/recover/forms/user-identity-form.js'
import { useStepper } from '@/providers/stepper-context-provider.js'

export function UserIdentityStep () {
  const {setStepName} = useStepper()
  const onSubmit = (data: unknown) => {
    setStepName('send_verification_code_mean')
  }
  return (
    <View>
      <RecoverHeader/>
      <View style={style.container}>
        <Text>Digite seu CPF ou CNPJ</Text>
        <UserIdentityForm onSubmit={onSubmit}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.text
  }
})
