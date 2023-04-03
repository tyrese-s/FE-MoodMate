import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getSingleEmotion } from "../utils/api.js";
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface Emotion {
        emotion: string;
        mainText: string[];
        causes: string[];
        commonThoughts: string;
        reassurance: string;
        techniques: string[];
  }

export default function MoodPage ( {route}: {route: any} ) {
    const { emotionType } = route.params
    const [singleEmotion, setSingleEmotion] = useState<Emotion | null>(null);

    const iconSize = 50;


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
                <Text style={styles.emotionTitle}>{capitaliser(singleEmotion?.emotion)}</Text>
            </View>
            <View>
                {singleEmotion?.mainText.map(sentence => {
                    return <Text style={styles.sentence} key={sentence}>{sentence}</Text>
                })} 
            </View>
             <View>
                 <Text style={styles.causeTrigger}>Possible Causes & Triggers</Text>
                 {singleEmotion?.causes.map(cause => {
                     return <Text style={styles.information} key={cause}>{`\u2023 ${cause}`}</Text>
                 })}
            </View>
             <View>
                <Text style={styles.title}>Common Thoughts</Text>
                <Text style={styles.information}>{singleEmotion?.commonThoughts}</Text>
            </View>
             <View>
                <Text style={styles.title}>Reassurance</Text>
                <Text style={styles.information}>{singleEmotion?.reassurance}</Text>
            </View>
             <View style={{marginBottom: 16}}>
                 <Text style={styles.title}>Coping Techniques</Text>
                 {singleEmotion?.techniques.map(technique => {
                     return <Text style={styles.information} key={technique}>{`\u2023 ${technique}`}</Text>
                 })}
            </View>
        </KeyboardAwareScrollView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emotionTitle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'purple',
        height: 60,
        paddingTop:10
    },
    information: {
        fontSize: 16,
        textAlign: 'left',
        marginHorizontal: 24,
        marginVertical: 4,
        
    },
    sentence: {
        paddingHorizontal: 24,
        paddingBottom: 8,
        fontSize: 16,
    },  
    title: {
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 16,
        paddingBottom: 8,
        color: 'purple',
        borderBottomColor:'orange',
        borderEndColor:'blue',
        borderTopWidth:20
    },
    causeTrigger:{
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 16,
        paddingBottom: 8,
        color: 'purple'
    },
    scrollTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 0,

      },

})