import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import { Calendar } from 'react-native-calendars';
  
  const CalendarScreen = () => {
    const [showModal, setShowModal] = useState(false)
    const [markedDates, setMarkedDates] = useState({
      '2023-04-01' : {dots: [{color:'blue'}], selected: true,
      selectedColor: 'lightblue',
      selectedTextColor: 'black'}, 
      '2023-04-03' : {dots: [{color:'blue'}], selected: true,
      selectedColor: 'lightblue',
      selectedTextColor: 'black' }})
  
      const addMarkedDate = (date: string) => {
        setMarkedDates(prevMarkedDates => {
          return {
            ...prevMarkedDates,
            [date]: {
              dots: [{color: 'blue'}],
              selected: true,
              selectedColor: 'lightblue',
              selectedTextColor: 'black'
            }
          };
        });
      };
      
    return (
      <View>
       
          <Calendar
            style={{borderRadius:10, elevation: 4, margin: 40}}
            onDayPress={(date) => {
              console.log(date)
              addMarkedDate(date.dateString)
            }}
            initialDate={'2023-04-01'}
            minDate={'2023-01-01'}
            maxDate={'2025-01-01'}
            hideExtraDays={true}
            markingType={'multi-dot'}
            markedDates={markedDates}
          />
        <StatusBar style="auto" />
      </View>
    );
  }
  

  export default CalendarScreen