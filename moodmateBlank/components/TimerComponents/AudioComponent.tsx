import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";

// If using audio from a url, comment SampleTrack out - since this imports from a file
const SampleTrack = require("../../assets/Bird-song.mp3");
// credit = https://orangefreesounds.com/bird-song/

const AudioComponent = () => {
  const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(new Audio.Sound());

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        // Loading from imported track/file
        const result = await sound.current.loadAsync(SampleTrack, {}, true);
        // Comment out the above, and uncomment below if wish to import url audio
        // const result = await sound.current.loadAsync({
        //         uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        //     }, {}, true);
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  useEffect(() => {
    LoadAudio();
  }, []);

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          setIsPlaying(true);
          sound.current.playAsync();
          sound.current.setIsLoopingAsync(true);
        }
      }
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          setIsPlaying(false);
          sound.current.pauseAsync();
        }
      }
    } catch (error) {
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    isPlaying ? PauseAudio() : PlayAudio();
    setIsSwitchOn(!isSwitchOn);
  };

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <>
      {Loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {Loaded === false ? (
            <View style={styles.audioPlayer}>
              <ActivityIndicator />
              <Text>Loading Song</Text>
            </View>
          ) : (
            <View style={styles.audioPlayer}>
              <Text
                style={{
                  marginBottom: 4,
                  color: "#fff8dc",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 2,
                  textShadowColor: "black",
                }}
              >
                Background Audio
              </Text>
              <Switch
                value={isSwitchOn}
                onValueChange={toggleAudio}
                color={"#fff8dc"}
                style={{ backgroundColor: "black", borderRadius: 16 }}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default AudioComponent;

// https://stackoverflow.com/questions/68042313/pausing-react-native-expo-audio
// https://snack.expo.dev/@kartikeyvaish/playing_pausing-music
// https://snyk.io/advisor/npm-package/expo-av/functions/expo-av.Audio.Sound

const styles = StyleSheet.create({
  audioPlayer: {
    flex: 1,
    alignItems: "center",
  },
});
