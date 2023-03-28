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
                <ul>
                    <li>Unfair treatment or injustice</li>
                    <li>Betrayal or disloyalty</li>
                    <li>Perceived neglect or disrespect.</li>
                    <li>Inequality or discrimination</li>
                </ul>
            </View>
            <View>
                <Text style={styles.information}> Common thoughts: </Text>
                <Text>Common thoughts or beliefs when experiencing resentment might include feeling like they've been treated unfairly, like someone owes them something, or like they're not getting the recognition they deserve. Someone might also have thoughts like 'Why do they get everything?' or 'I deserve better than this.</Text>
            </View>
            <View>
                <Text style={styles.information}> Reassurance: </Text>
                <Text>Feeling resentful can be challenging, but it's important to remember that holding onto negative feelings only hurts yourself. It's okay to acknowledge your feelings and to take time to process them. Remember that forgiveness, both of others and yourself, can be a powerful tool for healing. Focus on positive relationships and experiences and let go of negativity that is weighing you down.</Text>
            </View>
            <View>
                <Text style={styles.information}> Coping techniques</Text>
                <ul>
                    <li>Practicing empathy and trying to see things from the other person's perspective</li>
                    <li>Communicating openly and honestly with the person you feel resentment towards.</li>
                    <li>Focusing on positive aspects of the situation or relationship</li>
                </ul>
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