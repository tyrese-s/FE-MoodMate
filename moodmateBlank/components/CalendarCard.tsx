import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "react-native-elements";

type Props = {
    journalEntries: Array<{
        id: number;
        text: string;
        diet: string;
        exercise: string;
        mood: string;
        overview: string;
        createdAt: string;
      }>;
  };

  const CalendarCard = ({ journalEntries }: Props) => {
    console.log("CalendarCard rendered"); // add this line

    if (!journalEntries || journalEntries.length === 0) {
      return <Text>No entries present.</Text>;
    }
  
    return (
        <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Text style={styles.calCard}>Journal Entries:</Text>
          {journalEntries.map((entry) => (
            <Card key={entry.id} containerStyle={styles.cardContainer}>
              <Text style={styles.cardHeader}>Created At: {entry.createdAt}</Text>
              <View style={styles.cardBody}>
                <Text>Food &amp; Drink: {entry.diet}</Text>
                <Text>Exercise: {entry.exercise}</Text>
                <Text>Mood: {entry.mood}</Text>
                <Text>Overview: {entry.overview}</Text>
              </View>
            </Card>
          ))}
        </KeyboardAwareScrollView>
      </View>
    );
  };
  
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    calCard: {
      color: "red",
      fontSize: 18,
      marginBottom: 10,
    },
    noEntries: {
      color: "gray",
      margin: 20,
    },
    cardContainer: {
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    cardHeader: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
    cardBody: {
      marginTop: 10,
    },
  });
export default CalendarCard