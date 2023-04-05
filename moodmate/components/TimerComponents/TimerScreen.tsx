import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import TimerToggleButton from "./TimerToggleButton";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AudioComponent from "./AudioComponent";
import { images } from "../../assets/Images";

export default function TimerScreen() {
  const [initialTime, setInitialTime] = useState<number>(300000);
  const [timerCount, setTimerCount] = useState<number>(initialTime);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<"Meditate" | "Complete">(
    "Meditate"
  );
  const [setTimerModalVisible, setSetTimerModalVisible] =
    useState<boolean>(true);
  const [initialCall, setInitialCall] = useState<boolean>(true);

  const COMPLETE_TIME_MINUTES = 0;

  const image = images.meditate;

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === "Meditate") {
        setTimerMode("Complete");
        setTimerCount(COMPLETE_TIME_MINUTES);
      } else {
        setTimerMode("Meditate");
        setTimerCount(initialTime);
      }
      stopTimer();
    }
  }, [timerCount]);

  const startTimer = () => {
    setIsTimerRunning(true);
    const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
    setTimerInterval(id);
    setSetTimerModalVisible(false);
  };

  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerCount(initialTime);
    setTimerMode("Meditate");
    stopTimer();
    setSetTimerModalVisible(true);
  };

  const setTimer = (minutes: number) => {
    setInitialCall(false);
    setInitialTime(minutes);
    resetTimer();
    startTimer();
  };

  const getFill = () => {
    const totalTime =
      timerMode === "Meditate" ? initialTime : COMPLETE_TIME_MINUTES;
    const remainingTime = Math.max(timerCount, 0);
    return (remainingTime / totalTime) * 100;
  };

  useEffect(() => {
    if (!initialCall) setTimer(initialTime);
  }, [initialTime]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={[styles.fixed, { zIndex: -1 }, styles.background]}
      />
      <KeyboardAwareScrollView style={styles.scrollview}>
        <Text style={styles.textContainer}>
          {timerMode === "Meditate"
            ? "Time to Meditate"
            : "Meditation Complete"}{" "}
        </Text>
        <View style={{ marginBottom: 8 }}>
          <AudioComponent />
        </View>
        <View style={styles.timerWrapper}>
          <AnimatedCircularProgress
            size={200}
            width={10}
            fill={getFill()}
            tintColor="#fff8dc"
            backgroundColor="black"
            rotation={0}
          >
            {() => (
              <Text style={styles.timerText}>
                {Math.floor(timerCount / 60000)}:
                {((timerCount % 60000) / 1000).toFixed(0).padStart(2, "0")}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <TimerToggleButton
          isTimerRunning={isTimerRunning}
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          setTimer={setTimer}
          setSetTimerModalVisible={setSetTimerModalVisible}
          setTimerModalVisible={setTimerModalVisible}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EED2E7",
  },
  timerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen
  },
  scrollview: {
    backgroundColor: "transparent",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  textContainer: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff8dc",
    paddingTop: 32,
    paddingBottom: 28,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 100,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: "#fff",
  },
});
