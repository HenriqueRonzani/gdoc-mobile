import { KeyboardAvoidingView, Platform } from 'react-native'
import type { StepObjectType} from '@/providers/stepper-context-provider.js'
import { StepperProvider } from '@/providers/stepper-context-provider.js'
import { UserIdentityStep } from '@/components/screens/auth/recover/steps/user-identity-step.js'
import { GdocStepperContent } from '@/components/stepper/gdoc-stepper-content.js'
import {
  SendVerificationCodeMeanStep
} from '@/components/screens/auth/recover/steps/send-verification-code-mean-step.js'

const screens: StepObjectType[] = [
  {step_name: 'user_identity', component: UserIdentityStep, progress: 1},
  {step_name: 'send_verification_code_mean', component: SendVerificationCodeMeanStep, progress: 2}
]

export function RecoverScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StepperProvider initialStepName={'user_identity'} steps={screens} totalSteps={4}>
        <GdocStepperContent/>
      </StepperProvider>
    </KeyboardAvoidingView>
  )
}
