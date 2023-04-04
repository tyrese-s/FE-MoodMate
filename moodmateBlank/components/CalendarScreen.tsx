import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { images } from "../assets/Images";
import { AuthContext } from "../contexts/User";
import { getJournalEntries } from "../utils/api";

const CalendarScreen = () => {
  const image = images.calendar;

  type MarkedDates = Record<
    string,
    {
      dots?: { color: string }[];
      selected?: boolean;
      selectedColor?: string;
      selectedTextColor?: string;
    }
  >;

  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [journalEntries, setJournalEntries] = useState([]);
  const { user } = useContext(AuthContext);
  const { userToken } = user;

  const addMarkedDate = (date: string) => {
    setMarkedDates((prevMarkedDates) => {
      const updatedMarkedDates = { ...prevMarkedDates };

      Object.keys(updatedMarkedDates).forEach((dateString) => {
        const dateInfo =
          updatedMarkedDates[dateString as keyof typeof updatedMarkedDates];
        if (dateInfo.selected) {
          updatedMarkedDates[dateString as keyof typeof updatedMarkedDates] = {
            ...dateInfo,
            selected: false,
          };
        }
      });

      updatedMarkedDates[date as keyof typeof updatedMarkedDates] = {
        dots: [{ color: "blue" }],
        selected: true,
        selectedColor: "lightblue",
        selectedTextColor: "black",
      };

      return updatedMarkedDates;
    });
  };

  const handleDayPress = (date: { dateString: string }) => {
    getJournalEntries(date.dateString, userToken).then((entries) => {
      setJournalEntries(entries);
    });
  };

  return (
    <View>
      <ImageBackground
        source={image}
        style={[styles.fixed, { zIndex: -1 }, styles.background]}
      />

      <Calendar
        style={{ borderRadius: 10, elevation: 4, margin: 40 }}
        onDayPress={(date) => {
          console.log(date);
          addMarkedDate(date.dateString);
          handleDayPress(date);
        }}
        initialDate={"2023-04-01"}
        minDate={"2023-01-01"}
        maxDate={"2025-01-01"}
        hideExtraDays={true}
        markingType={"multi-dot"}
        markedDates={markedDates}
      />
      <StatusBar style="auto" />
    </View>
  );
};

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

export default CalendarScreen;
