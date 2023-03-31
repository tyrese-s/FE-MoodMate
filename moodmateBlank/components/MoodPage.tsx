import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { getSingleEmotion } from "../utils/api.js";

interface Emotion {
        emotion: string;
        mainText: string;
        causes: string;
        commonThoughts: string;
        reassurance: string;
        techniques: string;
  }

export default function MoodPage ( {route}: {route: any} ) {
    const { emotionType } = route.params
    const [singleEmotion, setSingleEmotion] = useState<Emotion | null>(null);


    useEffect(() => {
      getSingleEmotion(emotionType)
      .then((emotionFromApi) => {
          setSingleEmotion(emotionFromApi[0])
      })
  }, [emotionType])

    const capitaliser = (word?: string): string | undefined => {
        if(word) return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    
     return (
        <KeyboardAwareScrollView style={styles.container}>
            <View>
                <Text style={styles.quoteTitle}>{capitaliser(singleEmotion?.emotion)}</Text>
            </View>
            <View>
                <Text style={styles.information}> {singleEmotion?.mainText} </Text>
            </View>
             <View>
                <Text style={styles.title}>Possible causes and triggers</Text>
                <Text style={styles.information}> {singleEmotion?.causes} </Text>
            </View>
             <View>
                <Text style={styles.title}>Common thoughts</Text>
                <Text style={styles.information}> {singleEmotion?.commonThoughts} </Text>
            </View>
             <View>
                <Text style={styles.title}>Reassurance</Text>
                <Text style={styles.information}> {singleEmotion?.reassurance} </Text>
            </View>
             <View>
                <Text style={styles.title}>Coping techniques</Text>
                <Text style={styles.information}> {singleEmotion?.techniques}</Text>
            </View>
        </KeyboardAwareScrollView>
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

    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 16,
        paddingBottom: 4,
    }

})