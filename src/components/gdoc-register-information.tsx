import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
    title: string;
    description: string;
}
export function GdocRegisterInformation({title, description}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        width: 330,
        marginBottom: 40
    },
      text: {
        fontSize: 14,
        alignSelf: "flex-start",
        marginHorizontal: 20,
        marginVertical: 13,
        color: "#7C7C7C",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        marginHorizontal: 20,
        marginVertical: 13,
        color: "#7C7C7C",
    }
})