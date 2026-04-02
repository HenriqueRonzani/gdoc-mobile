import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export function GdocPageTitle({children}: any) {
  return <Text style={style.title}>{children}</Text>
}

const style = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#565656",
    alignSelf: "center",
    marginVertical: 20
  }
})