import { Image, ImageProps, StyleSheet } from "react-native";
import brasao from "@/assets/brasao-exemplo.png";

export function ClientLogo({...rest}: ImageProps) {
  return <Image
    {...rest}
    source={brasao}
    style={[style.logo, rest.style]}
    resizeMode="contain"
  />
}

const style = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    marginVertical: 10
  }
})