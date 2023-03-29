import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { getSingleEmotion } from "../utils/api.js";

export default function MoodPage ( {route}: {route: any} ) {
    const { emotionType } = route.params
    const [singleEmotion, setSingleEmotion] = useState([])

    useEffect(() => {
      getSingleEmotion(emotionType)
      .then((emotionFromApi) => {
          setSingleEmotion(emotionFromApi[0])
      })
  }, [emotionType])

    { return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.quoteTitle}> Mood Name: {singleEmotion.emotion}</Text>
            </View>
            <View>
                <Text style={styles.information}> {singleEmotion.mainText} </Text>
            </View>
            <View>
                <h3>Possible causes and trigers</h3>
                <Text style={styles.information}> {singleEmotion.causes} </Text>
            </View>
            <View>
                <h3>Common thoughts</h3>
                <Text style={styles.information}> {singleEmotion.commonThoughts} </Text>
            </View>
            <View>
                <h3>Reassurance</h3>
                <Text style={styles.information}> {singleEmotion.reassurance} </Text>
            </View>
            <View>
                <h3>Coping techniques</h3>
                <Text style={styles.information}> {singleEmotion.techniques}</Text>
            </View>
        </SafeAreaView>
    ) }
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