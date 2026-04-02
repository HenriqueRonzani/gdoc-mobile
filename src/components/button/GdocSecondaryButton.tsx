import { Button, useTheme } from "react-native-paper";

export default function GdocSecondaryButton ({children}: any) {
  const theme = useTheme()
  return (
    <Button
      buttonColor={theme.colors.secondary}
      textColor={theme.colors.onSecondary}
      children={children}
    />
  )
}