import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type JournalEntry = {
  __v: number;
  _id: string;
  createdAt: string;
  diet: string;
  exercise: string;
  mood: string;
  overview: string;
  user: string;
};

type CalendarCardProps = {
  journalEntries: JournalEntry[];
};

type JournalEntryProps = {
  entry: JournalEntry;
};


const JournalEntry = ({ entry }: JournalEntryProps) => {
    const createdDate = new Date(entry.createdAt).toLocaleDateString();

    return (
    <View style={styles.journalEntryContainer}>
        <Text style={styles.heading}>Entry for {createdDate}</Text>
      <Text style={styles.journalEntryText}>Food & Drink: {entry.diet}</Text>
      <Text style={styles.journalEntryText}>Exercise: {entry.exercise}</Text>
      <Text style={styles.journalEntryText}>My Mood: {entry.mood}</Text>
      <Text style={styles.journalEntryText}>Overview of the moment: {entry.overview}</Text>
    </View>
  );
};

const CalendarCard = ({ journalEntries }: CalendarCardProps) => {
  return (
    <FlatList
      data={journalEntries}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <JournalEntry entry={item} />}
      ListEmptyComponent={<Text style={styles.emptyListText}>No journal entries for this date.</Text>}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  journalEntryContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  journalEntryText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyListText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 32,
  },
  heading: {
    fontsize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "purple"
  }
});

export default CalendarCard;
