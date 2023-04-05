import { useForm, useController } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectList } from "react-native-dropdown-select-list";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/User";
import { saveJournalEntry } from "../utils/api";
import { Toast } from "toastify-react-native";
import { useNavigation } from "@react-navigation/native";

export default function JournalPage() {
  const [howImFeeling, setHowImFeeling] = useState("");
  const nav = useNavigation();
  const [disabled, setDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    user: { userToken },
  } = useContext(AuthContext);

  const onSubmit = (data: any): void => {
    const journalEntry = { ...data, howImFeeling };
    setDisabled(true);
    if (journalEntry.mood !== "") {
      saveJournalEntry(journalEntry, userToken)
        .then(() => {
          Toast.success("Entry saved");
          nav.navigate("Home Screen" as never);
        })
        .catch(() => Toast.error("Save failed"));
      nav.navigate("Journal" as never);
    } else {
      Toast.warn("Mood is required");
    }
    setDisabled(false);
  };

  interface Props {
    name: string;
    control: any;
  }

  const Input = (props: Props) => {
    const { name, control } = props;
    const { field } = useController({
      control,
      defaultValue: "",
      name,
    });
    return (
      <TextInput
        value={field.value}
        maxLength={100}
        onChangeText={field.onChange}
        style={styles.textField}
      />
    );
  };

  const howIFeelData = [
    { key: "10", value: "10" },
    { key: "9", value: "9" },
    { key: "8", value: "8" },
    { key: "7", value: "7" },
    { key: "6", value: "6" },
    { key: "5", value: "5" },
    { key: "4", value: "4" },
    { key: "3", value: "3" },
    { key: "2", value: "2" },
    { key: "1", value: "1" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.scrollview}>
        <Text
          style={[
            styles.title,
            {
              fontWeight: "bold",
              fontStyle: "normal",
              paddingTop: 6,
            },
          ]}
        >
          Today's Mood
        </Text>
        <Input name="mood" control={control} />
        <Text style={styles.title}>Overview / Notes</Text>
        <Input name="overview" control={control} />
        <Text style={styles.title}>Food & Drink</Text>
        <Input name="diet" control={control} />
        <Text style={styles.title}>Exercise</Text>
        <Input name="exercise" control={control} />
        <Text style={styles.title}>How are you feeling? (0-10)</Text>
        <SelectList
          setSelected={(value: string) => setHowImFeeling(value)}
          data={howIFeelData}
          save="value"
          boxStyles={{
            borderRadius: 30,
            backgroundColor: "white",
            paddingLeft: 25,
          }}
          dropdownStyles={{
            backgroundColor: "white",
            paddingHorizontal: 30,
            marginHorizontal: 30,
          }}
          dropdownItemStyles={{
            borderBottomWidth: 1,
            borderBottomColor: "silver",
          }}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={handleSubmit(onSubmit)}
          disabled={disabled}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Submit Journal Entry
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <ImageBackground
        style={[styles.fixed, styles.background, { zIndex: -1 }]}
        source={{
          uri: "https://images.pexels.com/photos/4175070/pexels-photo-4175070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        imageStyle={{ opacity: 0.5, tintColor: "green" }}
      />
      <ImageBackground
        style={[styles.fixed, styles.background, { zIndex: -1 }]}
        source={{
          uri: "https://images.pexels.com/photos/4175070/pexels-photo-4175070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        imageStyle={{ opacity: 0.6 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#83C5BE",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 4,
    fontStyle: "italic",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
    textShadowColor: "white",
  },
  textField: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 30,
    width: 350,
    padding: 10,
  },
  btn: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 40,
    width: 180,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#006D77",
    borderWidth: 2,
    marginTop: 20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  background: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollview: {
    backgroundColor: "transparent",
  },
});
