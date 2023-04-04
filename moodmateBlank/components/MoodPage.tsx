import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import { getSingleEmotion } from "../utils/api.js";

interface Emotion {
  emotion: string;
  mainText: string[];
  causes: string[];
  commonThoughts: string;
  reassurance: string;
  techniques: string[];
}

export default function MoodPage({ route }: { route: any }) {
  const { emotionType } = route.params;
  const [singleEmotion, setSingleEmotion] = useState<Emotion | null>(null);

  useEffect(() => {
    getSingleEmotion(emotionType).then((emotionFromApi) => {
      setSingleEmotion(emotionFromApi[0]);
    });
  }, [emotionType]);

  const capitaliser = (word?: string): string | undefined => {
    if (word) return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={styles.scrollview}>
        <View>
          <Text style={styles.emotionTitle}>
            {capitaliser(singleEmotion?.emotion)}
          </Text>
        </View>
        <View>
          <View style={styles.textBody}>
            {singleEmotion?.mainText.map((sentence) => {
              return (
                <Text style={styles.sentence} key={sentence}>
                  {sentence}
                </Text>
              );
            })}
          </View>
        </View>
        <View>
          <Text style={styles.title}>Possible Causes & Triggers</Text>
          <View style={styles.textBody}>
            {singleEmotion?.causes.map((cause) => {
              return (
                <View style={{flexDirection: 'row'}} key={cause}>
                  <Text style={styles.bullet}>{'\u2023'}</Text>
                  <Text style={styles.information} >
                    {cause}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View>
          <Text style={styles.title}>Common Thoughts</Text>
          <View style={styles.textBody}>
            <Text style={styles.information}>
              {singleEmotion?.commonThoughts}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Reassurance</Text>
          <View style={styles.textBody}>
            <Text style={styles.information}>{singleEmotion?.reassurance}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.title}>Coping Techniques</Text>
          <View style={styles.textBody}>
            {singleEmotion?.techniques.map((technique) => {
              return (
                <View style={{flexDirection: 'row'}} key={technique}>
                  <Text style={styles.bullet}>{'\u2023'}</Text>
                  <Text style={styles.information} >
                    {technique}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ImageBackground
        style={[styles.fixed, { zIndex: -1 }]}
        source={{
          uri: "https://images.pexels.com/photos/4175070/pexels-photo-4175070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        imageStyle={{ opacity: 0.5, tintColor: "green" }}
      />
      <ImageBackground
        style={[styles.fixed, { zIndex: -1 }]}
        source={{
          uri: "https://images.pexels.com/photos/4175070/pexels-photo-4175070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        imageStyle={{ opacity: 0.6 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  emotionTitle: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 16,
    fontWeight: "bold",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    textShadowColor: "white",
  },
  information: {
    fontSize: 16,
    textAlign: "left",
    marginHorizontal: 16,
    marginVertical: 4,
  },
  bullet: {
    fontSize: 16,
    marginLeft: 12,
    marginVertical: 4,
  },
  sentence: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 16,
  },
  textBody: {
    backgroundColor: "rgba(255,255,255, 0.5)",
    borderRadius: 30,
    marginHorizontal: 24,
      paddingVertical: 8,
      paddingHorizontal: 10
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 8,
    fontWeight: "500",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    textShadowColor: "white",
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollview: {
    backgroundColor: "transparent",
  },
});
