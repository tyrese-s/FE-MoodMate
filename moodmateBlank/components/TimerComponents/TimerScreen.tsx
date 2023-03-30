import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import TimerToggleButton from './TimerToggleButton';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import TimerInput from './TimerInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default function TimerScreen() {
  const [initialTime, setInitialTime] = useState<number>(300000);
  const [timerCount, setTimerCount] = useState<number>(initialTime);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'Meditate' | 'Complete'>('Meditate');
  const [setTimerModalVisible, setSetTimerModalVisible] = useState<boolean>(true);

  const COMPLETE_TIME_MINUTES = 0;

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === 'Meditate') {
        setTimerMode('Complete');
        setTimerCount(COMPLETE_TIME_MINUTES);
      } else {
        setTimerMode('Meditate');
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
    setTimerMode('Meditate');
    stopTimer();
    setSetTimerModalVisible(true);
  };

  const setTimer = (minutes: number) => {
    setInitialTime(minutes);
    // setTimerCount(minutes);
    resetTimer();
    // setTimerMode('Meditate');
  };

  const getFill = () => {
    const totalTime = timerMode === 'Meditate' ? initialTime : COMPLETE_TIME_MINUTES;
    const remainingTime = Math.max(timerCount, 0);
    return (remainingTime / totalTime) * 100;
  };
  
  useEffect(() => {
    setTimer(initialTime)
  }, [initialTime])

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.textContainer}>{timerMode === 'Meditate' ? 'Time to Meditate' : 'Meditation Completed'} </Text>
      <StatusBar style="auto" />
      <View >
        <View style={styles.timerWrapper}>
       
        <AnimatedCircularProgress
            size={200}
            width={10}
            fill={getFill()}
            tintColor="#fff"
            backgroundColor="#d95550"
            rotation={0}
          >
            {() => (
              <Text style={styles.timerText}>
                {Math.floor(timerCount / 60000)}:{(timerCount % 60000 / 1000).toFixed(0).padStart(2, '0')}
              </Text>
            )}
          </AnimatedCircularProgress>
          <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} setTimer={setTimer} setSetTimerModalVisible={setSetTimerModalVisible} setTimerModalVisible={setTimerModalVisible} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d95550',
    },
  timerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerToggleButton: {
    marginTop: 20,
  },
  timerText: {
  fontSize: 36,
  fontWeight: 'bold',
  color: '#fff',
  },
textContainer:{
  fontSize: 30,
  fontWeight: '700',
  textAlign: 'center',
  marginVertical: 16,
},
label: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 10,
},
input: {
  height: 40,
  width: 100,
  borderColor: '#fff',
  borderWidth: 1,
  borderRadius: 5,
  padding: 5,
  color: '#fff',
},

  
});
