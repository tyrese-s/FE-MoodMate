import React from "react";
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import TimerInput from "./TimerInput";

type Props = {
    isTimerRunning: boolean;
    stopTimer: () => void;
    startTimer: () => void;
    setTimerModalVisible: boolean;
    setTimer: (minutes: number) => void;
    setSetTimerModalVisible: (input: boolean) => void;
    resetTimer: () => void;
}

const TimerToggleButton = (props: Props) => {
  const {
    isTimerRunning,
    stopTimer,
    startTimer,
    resetTimer,
    setTimerModalVisible,
    setSetTimerModalVisible,
    setTimer,
  } = props;
  const iconSize = 60;

  const toggleTimer = () => {
    if (isTimerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {!setTimerModalVisible && (
          <TouchableOpacity onPress={toggleTimer}>
            {isTimerRunning ? (
              <Icon
                name="pause"
                size={iconSize}
                color="#F08080"
                style={styles.icon}
              />
            ) : (
              <Icon
                name="play"
                size={iconSize}
                color="#F08080"
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        )}
        {!setTimerModalVisible && (
          <TouchableOpacity onPress={resetTimer}>
            <Icon
              name="stop"
              size={iconSize}
              color="#F08080"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      <TimerInput
        visible={setTimerModalVisible}
        setTimer={setTimer}
        onCancel={() => setSetTimerModalVisible(false)}
        startTimer={startTimer}
      />
    </View>
  );
};

export default TimerToggleButton;

const styles = StyleSheet.create({
  icon: {
    paddingVertical: 12.5
  }
})