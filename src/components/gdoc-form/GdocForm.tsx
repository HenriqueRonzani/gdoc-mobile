import { FormProvider, useForm } from "react-hook-form";
import { ZodTypeAny } from "zod/v3";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, View } from "react-native";
import { GdocPrimaryButton } from "@/components/button/GdocPrimaryButton";

export type GdocFormProps<T extends ZodTypeAny> = {
  initial: z.infer<T>
  schema: T
  onSubmit: (data: z.infer<T>) => void
  children: React.ReactNode
  footer?: React.ReactNode
  showConfirm?: boolean
  confirmLabel?: string
  isLoading?: boolean
}

export function GdocForm<T extends ZodTypeAny> ({initial, schema, onSubmit, children, footer, showConfirm, confirmLabel, isLoading}: GdocFormProps<T>) {
  type formData = z.infer<typeof schema>
  const methods = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: initial
  })

  return (
    <FormProvider {...methods}>
      <View style={style.form}>
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
      </View>
    </FormProvider>
  )
}

const style = StyleSheet.create({
  form: {
    flex: 1
  },
  formBody: {
    flex: 1,
    gap: 10
  },
  formFooter: {
    gap: 10
  }
})