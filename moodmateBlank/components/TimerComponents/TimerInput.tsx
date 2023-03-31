import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface TimerProps {
  visible: boolean; 
  setTimer: (minutes: number) => void;
  onCancel: () => void;
  startTimer: () => void;
}

const TimerInput = (props: TimerProps) => {
  const { visible, setTimer, startTimer } = props;
  const [minutes, setMinutes] = useState("5");

  const handleMinutesChange = (text: string) => {
    setMinutes(text);
  };

  const handleSave = () => {
    setTimer(parseInt(minutes) * 60 * 1000);
    // startTimer();
  };

  return (
    <View style={{ display: visible ? "flex" : "none", marginVertical: 16 }}>
      <Text>Set timer duration (in minutes):</Text>
      <View style={styles.input}>
        <TextInput
          style={{
            height: 40,
            borderColor: "black",
            backgroundColor: "white",
            paddingLeft: 16,
            borderWidth: 1,
            flex: 4,
          }}
          onChangeText={handleMinutesChange}
          value={minutes}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleSave} style={styles.btn}>
          <Text style={{ textAlign: "center" }}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerInput;

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    width: 300,
  },
  btn: {
    alignSelf: 'flex-end',
    borderRadius: 30, 
    backgroundColor: '#60A9EE',
    width: 70,
    marginLeft: 8,
    paddingVertical: 11
  }
});
