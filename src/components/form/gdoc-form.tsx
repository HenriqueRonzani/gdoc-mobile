import { FormProvider, useForm } from 'react-hook-form'
import type { ZodTypeAny } from 'zod/v3'
import React, { useCallback, useRef } from 'react'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { GdocPrimaryButton } from '@/components/button/gdoc-primary-button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect } from '@react-navigation/native'

export type GdocFormProps<T extends ZodTypeAny> = {
  initial: z.infer<T>
  schema: T
  onSubmit: (data: z.infer<T>) => void
  children: React.ReactNode
  footer?: React.ReactNode
  showConfirm?: boolean
  confirmLabel?: string
  isLoading?: boolean
  formStyle?: ViewStyle
}

export function GdocForm<T extends ZodTypeAny> ({initial, schema, onSubmit, children, footer, showConfirm, confirmLabel, isLoading, formStyle}: GdocFormProps<T>) {
  type formData = z.infer<typeof schema>
  const methods = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: initial,
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const scrollRef = useRef<KeyboardAwareScrollView>(null)

  useFocusEffect(
    useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollToPosition(0, 0, false)
      }
    }, [])
  )

  return (
    <FormProvider {...methods}>
      <KeyboardAwareScrollView
        ref={scrollRef}
        style={style.form}
        contentContainerStyle={[style.scrollContent, formStyle]}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps='handled'
      >
        <View style={style.formBody}>
          {children}
        </View>

        <View style={style.formFooter}>
          {(showConfirm ?? true) &&
            <GdocPrimaryButton onPress={methods.handleSubmit(onSubmit)} loading={isLoading}>
              {confirmLabel ?? 'Confirmar'}
            </GdocPrimaryButton>
          }
          {footer}
        </View>
      </KeyboardAwareScrollView>
    </FormProvider>
  )
}

const style = StyleSheet.create({
  form: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 25,
    justifyContent: 'space-between'
  },
  formBody: {
    gap: 10
  },
  formFooter: {
    paddingTop: 6,
    gap: 4
  }
})
