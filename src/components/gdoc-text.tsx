import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export function GdocText({children}:any) {
    return <Text style={styles.text}>{children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        alignSelf: "center",
        color: "#565656",
    }
})
