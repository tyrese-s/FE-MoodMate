import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  StyleSheet,
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
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={image}
        style={[styles.fixed, { zIndex: -1 }]}
        imageStyle={{ opacity: 0.7 }}
      />
      <ScrollView>
        <Calendar
          style={styles.calendar}
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
                  Journal Entry {new Date(entry.createdAt).toLocaleDateString()}
                </Title>
                <Text
                  style={[
                    styles.journalEntryText,
                    { fontWeight: "bold", marginBottom: 2 },
                  ]}
                >
                  You were feeling:
                </Text>
                <Text style={styles.journalEntryText}>{entry.mood}</Text>
                {entry.diet && (
                  <>
                    <Text
                      style={[
                        styles.journalEntryText,
                        { fontWeight: "bold", marginBottom: 2 },
                      ]}
                    >
                      Food & Drink:
                    </Text>
                    <Text style={styles.journalEntryText}>{entry.diet}</Text>
                  </>
                )}
                {entry.exercise && (
                  <>
                    <Text
                      style={[
                        styles.journalEntryText,
                        { fontWeight: "bold", marginBottom: 2 },
                      ]}
                    >
                      Exercise:
                    </Text>
                    <Text style={styles.journalEntryText}>
                      {entry.exercise}
                    </Text>
                  </>
                )}
                {entry.overview && (
                  <>
                    <Text
                      style={[
                        styles.journalEntryText,
                        { fontWeight: "bold", marginBottom: 2 },
                      ]}
                    >
                      Overview:
                    </Text>
                    <Text style={styles.journalEntryText}>
                      {entry.overview}
                    </Text>
                  </>
                )}
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.emptyListText}>No entries present</Text>
        )}
      </ScrollView>
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
  journalEntryContainer: {
    backgroundColor: "#EDF6F9",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    marginHorizontal: 40,
  },
  journalEntryText: {
    fontSize: 14,
    fontWeight: "normal",
    marginBottom: 8,
    textAlign: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#006D77",
    marginBottom: 16,
  },
  emptyListText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "50%",
    textAlign: "center",
  },
  calendar: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 4,
    marginHorizontal: 40,
    marginVertical: 20,
  },
});

export default CalendarScreen;
