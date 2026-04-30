import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import type { StepObjectType } from '@/providers/stepper-context-provider'
import { StepperProvider } from '@/providers/stepper-context-provider'
import { UserIdentityStep } from '@/components/screens/auth/recover/steps/user-identity-step'
import { GdocStepperContent } from '@/components/stepper/gdoc-stepper-content'
import { SendVerificationCodeMeanStep } from '@/components/screens/auth/recover/steps/send-verification-code-mean-step'
import { TypeVerificationCodeStep } from '@/components/screens/auth/recover/steps/type-verification-code-step'
import { RecoverHeader } from '@/components/screens/auth/recover/recover-header'
import { SetNewPasswordStep } from '@/components/screens/auth/recover/steps/set-new-password-step'

const screens: StepObjectType[] = [
  {step_name: 'user_identity', component: UserIdentityStep, progress: 1},
  {step_name: 'send_verification_code_mean', component: SendVerificationCodeMeanStep, progress: 2},
  {step_name: 'type_verification_code', component: TypeVerificationCodeStep, progress: 3},
  {step_name: 'set-new-password', component: SetNewPasswordStep, progress: 4}
]

export function RecoverScreen() {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StepperProvider initialStepName={'user_identity'} steps={screens} totalSteps={4}>
        <View style={style.container}>
          <RecoverHeader/>
          <GdocStepperContent/>
        </View>
      </StepperProvider>
    </KeyboardAvoidingView>
  )
}

const style =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 30
  },
})
