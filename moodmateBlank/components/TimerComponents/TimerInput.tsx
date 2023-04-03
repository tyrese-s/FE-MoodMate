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
}

const TimerInput = (props: TimerProps) => {
  const { visible, setTimer } = props;
  const [minutes, setMinutes] = useState("5");

  const handleMinutesChange = (text: string) => {
    setMinutes(text);
  };

  const handleSave = () => {
    if (minutes !== '') setTimer(parseInt(minutes) * 60 * 1000);
    else alert('Enter length of meditation!')
  };

  return (
    <View style={{ display: visible ? "flex" : "none", marginVertical: 16 }}>
      <Text style={{ color: "#fff8dc", fontWeight: '700' }}>Set timer duration (in minutes):</Text>
      <View style={styles.input}>
        <TextInput
        placeholder="enter minutes"
          style={{
            height: 40,
            borderColor: "black",
            backgroundColor: "#fff8dc",
            paddingLeft: 16,
            borderWidth: 1,
            borderRadius: 5,
            paddingRight:16, 
            width: '42%'           
            
          }}
          onChangeText={handleMinutesChange}
          value={minutes}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleSave} style={styles.btn}>
          <Text style={{ textAlign: "center", fontWeight:'700'}}>Start</Text>
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
    alignItems: "center",
        justifyContent: "center",
  },
  btn: {
    alignSelf: 'flex-end',
    borderRadius: 30, 
    backgroundColor: 'grey',
    width: 70,
    marginLeft: 8,
    paddingVertical: 11,
    color:'grey'
  }
  
});
