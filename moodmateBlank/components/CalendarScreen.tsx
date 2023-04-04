import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { images } from "../assets/Images";
import { AuthContext } from "../contexts/User";
import { getJournalEntries } from "../utils/api";
import { Card, Title } from "react-native-paper";

interface Entry {
  mood: string;
  overview: string;
  diet: string;
  exercise: string;
  howAreYouFeeling: string;
  createdAt: string;
}

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

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    getJournalEntries(currentDate, userToken).then((entries) => {
      setJournalEntries(entries);
      addMarkedDate(currentDate);
    });
  }, []);

  const handleDayPress = (date: { dateString: string }) => {
    getJournalEntries(date.dateString, userToken).then((entries) => {
      setJournalEntries(entries);
    });
  };

  return (
    <ScrollView>
      <View>
        <ImageBackground
          source={image}
          style={[styles.fixed, { zIndex: -1 }]}
          imageStyle={{ opacity: 0.7 }}
        />

        <Calendar
          style={{ borderRadius: 10, elevation: 4, margin: 40 }}
          onDayPress={(date) => {
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

        {journalEntries?.length > 0 ? (
          journalEntries.map((entry: Entry, index) => (
            <Card key={index} style={styles.journalEntryContainer}>
              <Card.Content>
                <Title style={styles.heading}>
                  Entry for {new Date(entry.createdAt).toLocaleDateString()}
                </Title>
                <Text style={styles.journalEntryText}>
                  You were feeling: {entry.mood}
                </Text>
                <Text style={styles.journalEntryText}>
                  Food & Drink: {entry.diet}
                </Text>
                <Text style={styles.journalEntryText}>
                  Exercise: {entry.exercise}
                </Text>
                <Text style={styles.journalEntryText}>
                  Overview: {entry.overview}
                </Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.emptyListText}>No entries present</Text>
        )}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
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
  journalEntryContainer: {
    backgroundColor: "rgba(232, 245, 255, 0.8)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  journalEntryText: {
    fontSize: 14,
    fontWeight: "normal",
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#663399",
    marginBottom: 16,
  },
  emptyListText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "50%",
    textAlign: "center",
  },
});

export default CalendarScreen;
