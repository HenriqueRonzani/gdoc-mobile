import { StyleSheet, View } from "react-native";
import { GdocText } from "./gdoc-text";

type Props = {
    actualStepper: number;
    finalStepper: number;
}

export function GdocStepper({actualStepper, finalStepper}:Props) {

    function createStepper() {
        return Array.from({length: finalStepper}).map((value, index) => (
            <View key={index} style={index < actualStepper - 1 ? styles.completedStepper : index == actualStepper - 1 ? styles.activeStepper : styles.inactiveStepper}/>
        )) 
    }
    return (
        <View style={styles.container}>
            <View>
                <GdocText>Etapa {actualStepper} de {finalStepper}</GdocText>
            </View>
            <View style={styles.stepperSection}>
                {createStepper()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    stepperSection: {
        flexDirection: 'row',
    },
    inactiveStepper: {
        height: 10,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#AEAEAE',
        marginRight: 3
    },
    completedStepper: {
        height: 10,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#154560',
        marginRight: 3
    },
    activeStepper: {
        height: 10,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#00CE84',
        marginRight: 3
    }
})