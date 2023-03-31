import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface TimerProps {
  visible: boolean;
  setTimer: (minutes: number) => void;
  onCancel: () => void;
}

const TimerInput = (props: TimerProps) => {
  const {visible, setTimer} = props;
  const [minutes, setMinutes] = useState('5');

  const handleMinutesChange = (text: string) => {
    setMinutes(text);
  };

  const handleSave = () => {
    setTimer(parseInt(minutes) * 60 * 1000);
  };

  return (
    <View style={{ display: visible ? 'flex' : 'none', marginVertical: 16 }}>
      <Text>Set timer duration (in minutes):</Text>
      <View style={styles.input}>
      <TextInput
        style={{ height: 40, borderColor: 'black', backgroundColor: 'white', paddingLeft: 16, borderWidth: 1 , flex: 4}}
        onChangeText={handleMinutesChange}
        value={minutes}
        keyboardType="numeric"
      />
      <Button title="Set" onPress={handleSave} />
      </View>
    </View>
  );
};

export default TimerInput;

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    width: 300
  }
})