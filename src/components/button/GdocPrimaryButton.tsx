import { Button, ButtonProps, useTheme } from "react-native-paper";
import React from "react";

type Props = ButtonProps & {
  children: React.ReactNode
}

export function GdocPrimaryButton({children, ...rest}: Props) {
  const theme = useTheme()
  return (
    <Button
      {...rest}
      buttonColor={theme.colors.primary}
      textColor={theme.colors.onPrimary}
      children={children}
    />
  )
}