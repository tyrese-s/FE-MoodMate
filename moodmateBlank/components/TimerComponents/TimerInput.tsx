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
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

type Session = {
  startTime: number,
  endTime: number,
};

const calculateSessionDuration = (startTime: number, endTime: number) => {
  const duration = endTime - startTime;
  return duration / 1000 / 60; // convert from milliseconds to minutes
};

const calculateMeditationStats = (sessions: Session[]) => {
  const totalTime = sessions.reduce(
    (total, session) => total + calculateSessionDuration(session.startTime, session.endTime),
    0,
  );
  const averageTime = totalTime / sessions.length;
  const longestSession = sessions.reduce(
    (longest, session) => Math.max(longest, calculateSessionDuration(session.startTime, session.endTime)),
    0,
  );
  return { totalTime, averageTime, longestSession };
};

const TimerInput = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStart = () => {
    const now = Date.now();
    setStartTime(now);
    setIsRunning(true);
  };

  const handleEnd = () => {
    const now = Date.now();
    setEndTime(now);
    setIsRunning(false);
    const newSession = { startTime, endTime: now };
    setSessions([...sessions, newSession]);
  };

  const { totalTime, averageTime, longestSession } = calculateMeditationStats(sessions);

  const data = {
    labels: ['Total Time', 'Average Time', 'Longest Session'],
    datasets: [
      {
        data: [totalTime, averageTime, longestSession],
      },
    ],
  };

  return (
    <View>
      <Text>Meditation Timer</Text>
      <Text>{isRunning ? 'Meditation in progress' : 'Not currently meditating'}</Text>
      <Button title={isRunning ? 'End Meditation' : 'Start Meditation'} onPress={isRunning ? handleEnd : handleStart} />
      <MeditationStats sessions={sessions} />
      <LineChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    </View>
  );
};

type MeditationStatsProps = {
  sessions: Session[],
};

const MeditationStats = ({ sessions }: MeditationStatsProps) => {
  const { totalTime, averageTime, longestSession } = calculateMeditationStats(sessions);

  return (
    <View>
      <Text>Total time meditated: {totalTime.toFixed(2)} minutes</Text>
      <Text>Average meditation time: {averageTime.toFixed(2)} minutes</Text>
      <Text>Longest meditation: {longestSession.toFixed(2)} minutes</Text>
    </View>
  );
};
const MeditationTimer = () => {
  const navigation = useNavigation();

  const handleViewStats = () => {
    navigation.navigate('MeditationStats');
  };

  return (
    <View>
      <Text>Meditation Timer</Text>
      <Button title="View Stats" onPress={handleViewStats} />
    </View>
  );
};


export default MeditationTimer;

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
