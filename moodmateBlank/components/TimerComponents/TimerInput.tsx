import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

interface TimerProps {
  visible: boolean; 
  setTimer: (minutes: number) => void;
  onCancel: () => void;
}

const TimerInput = (props: TimerProps) => {
  const { visible, setTimer } = props;
  const [minutes, setMinutes] = useState("5");

  const handleMinutesChange = (text: string) => {
    setMinutes(text);
  };

  const handleSave = () => {
    if (minutes !== '') setTimer(+minutes * 60 * 1000);
    else alert('Enter length of meditation!')
  };

  return (
    <View style={{ display: visible ? "flex" : "none", marginVertical: 16 }}>
      <Text style={{color: "#fff8dc",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 1,
        textShadowColor: "#fff8dc",
        fontSize: 14,
        textAlign: 'center'
      }}>Set timer duration (in minutes):
      </Text>
      <View style={styles.input}>
        <TextInput
          style={{
            height: 40,
            backgroundColor: "white",
            paddingLeft: 16,
            flex: 4,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
          }}
          onChangeText={handleMinutesChange}
          value={minutes}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleSave} style={styles.btn}>
          <Text style={{ textAlign: "center", color: '#fff8dc',}}>Start</Text>
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
    borderTopRightRadius: 30, 
    borderBottomRightRadius: 30, 
    backgroundColor: 'black',
    width: 70,
    // marginLeft: 8,
    paddingVertical: 11,
    shadowColor: "#fff8dc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderWidth: 1
  }
});
