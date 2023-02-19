import { StyleSheet, Text, View } from "react-native"

export default function ConditionalMessage({ showChooseSkill, showSelectPlayer, selectPlayerMessage, showAlert, alertMessage }) {
    return (
        <View>
            {showChooseSkill &&
                <Text style={styles.title}>
                    Selecione uma habilidade
                </Text>
            }
            {showSelectPlayer &&
                <Text style={styles.title}>
                    {selectPlayerMessage}
                </Text>
            }
            {showAlert &&
                <Text style={styles.title}>
                    {alertMessage}
                </Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'NewRocker_400Regular',
        fontSize: 30
    }
});