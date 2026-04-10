import { RegisterUserTypeStep } from '@/components/screens/auth/register/steps/register-user-type-step'
import { RegisterPersonStep } from '@/components/screens/auth/register/steps/register-person-step'
import { RegisterOrganizationStep } from '@/components/screens/auth/register/steps/register-organization-step'
import { RegisterAddressStep } from '@/components/screens/auth/register/steps/register-address-step'
import { RegisterUseTermsStep } from '@/components/screens/auth/register/steps/register-use-terms-step'
import { RegisterContextProvider } from '@/providers/register-context-provider'
import { StepObjectType, StepperProvider } from '@/providers/stepper-context-provider'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { GdocStepperContent } from '@/components/stepper/gdoc-stepper-content'

const screens: StepObjectType[] = [
  {step_name: 'user_type', component: RegisterUserTypeStep, progress: 1},
  {step_name: 'organization_data', component: RegisterOrganizationStep, progress: 2},
  {step_name: 'person_data', component: RegisterPersonStep, progress: 2},
  {step_name: 'address', component: RegisterAddressStep, progress: 3},
  {step_name: 'use_terms', component: RegisterUseTermsStep, progress: 4}
]

export function RegisterScreen() {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <RegisterContextProvider>
        <StepperProvider initialStepName={'user_type'} steps={screens} totalSteps={4}>
          <GdocStepperContent/>
        </StepperProvider>
      </RegisterContextProvider>
    </KeyboardAvoidingView>
  )
}
