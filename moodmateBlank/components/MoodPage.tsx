import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";

export default function MoodPage () {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.quoteTitle}> Mood Name </Text>
            </View>
            <View>
                <Text style={styles.information}> Resentment is a feeling of anger or bitterness towards someone or something that is perceived as unfair or unjust. It can involve holding onto negative feelings and grudges, and can lead to feelings of hostility and conflict." </Text>
            </View>
            <View>
                <Text style={styles.information}> Possible causes and trigers: </Text>
            </View>
            <View>
                <Text style={styles.information}> Common thoughts: </Text>
            </View>
            <View>
                <Text style={styles.information}> Reassurance: </Text>
            </View>
            <View>
                <Text style={styles.information}> Coping techniques</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    quoteTitle: {
        textAlign: 'center',
        fontSize: 30
    },
    information: {
        fontSize: 16,
        textAlign: 'center',
        marginRight: 10,
        marginLeft: 10,

    }

})