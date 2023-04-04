import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {  View, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { images } from "../assets/Images";

  const CalendarScreen = () => {
    const image = images.calendar;

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
        <ImageBackground
        source={image}
        style={[styles.fixed, { zIndex: -1 }, styles.background]}
      />
       
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
  const styles = StyleSheet.create({
   
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
    
  });
  

  export default CalendarScreen