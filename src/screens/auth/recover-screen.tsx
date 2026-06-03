import { StyleSheet, View } from 'react-native'
import type { StepObjectType } from '@/providers/stepper-context-provider'
import { StepperProvider } from '@/providers/stepper-context-provider'
import { GetRecoveryMethodsStep } from '@/components/screens/auth/recover/steps/get-recovery-methods-step'
import { GdocStepperContent } from '@/components/stepper/gdoc-stepper-content'
import { RequestRecoveryCodeStep } from '@/components/screens/auth/recover/steps/request-recovery-code-step'
import { VerifyRecoveryCodeStep } from '@/components/screens/auth/recover/steps/verify-recovery-code-step'
import { RecoverHeader } from '@/components/screens/auth/recover/recover-header'
import { FinishResetPasswordStep } from '@/components/screens/auth/recover/steps/finish-reset-password-step'
import { RecoverContextProvider } from '@/providers/recover-context-provider'

const screens: StepObjectType[] = [
  {step_name: 'get_recovery_methods', component: GetRecoveryMethodsStep, progress: 1},
  {step_name: 'request_recovery_code', component: RequestRecoveryCodeStep, progress: 2},
  {step_name: 'verify_recovery_code', component: VerifyRecoveryCodeStep, progress: 3},
  {step_name: 'finish_reset_password', component: FinishResetPasswordStep, progress: 4}
]

export function RecoverScreen() {
  return (
    <RecoverContextProvider>
      <StepperProvider initialStepName={'get_recovery_methods'} steps={screens} totalSteps={4}>
        <RecoverHeader/>
        <View style={style.container}>
          <GdocStepperContent/>
        </View>
      </StepperProvider>
    </RecoverContextProvider>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingBottom: 10,
    gap: 30
  }
})
