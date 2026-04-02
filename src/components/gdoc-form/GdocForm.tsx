import { FormProvider, useForm } from "react-hook-form";
import { ZodTypeAny } from "zod/v3";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyleSheet, View } from "react-native";
import { GdocPrimaryButton } from "@/components/button/GdocPrimaryButton";

type Props<T extends ZodTypeAny> = {
  initial: z.infer<T>
  schema: T,
  onSubmit: (data: z.infer<T>) => void
  children: React.ReactNode
  confirmLabel?: string | null
}

export default function GdocForm<T extends ZodTypeAny> ({initial, schema, onSubmit, children, confirmLabel}: Props<T>) {
  type formData = z.infer<typeof schema>
  const methods = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: initial
  })

  return (
    <FormProvider {...methods}>
      <View style={style.form}>
        {children}
        <GdocPrimaryButton onPress={methods.handleSubmit(onSubmit)}>
          {confirmLabel ?? 'Confirmar'}
        </GdocPrimaryButton>
      </View>
    </FormProvider>
  )
}

const style = StyleSheet.create({
  form: {
    gap: 10
  }
})