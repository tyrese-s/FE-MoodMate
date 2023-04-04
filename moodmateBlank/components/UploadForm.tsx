import React, { useContext, useState } from "react";
import { useForm, useController } from "react-hook-form";
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { saveQuote } from "../utils/api";
import { AuthContext } from "./../contexts/User";
import {Toast} from 'toastify-react-native';

interface Props {
  name: string;
  control: any;
  secureTextEntry: boolean;
  text?: string;
}

const Input = (props: Props) => {
  const { name, control, secureTextEntry, text } = props;
  const { field } = useController({
    control,
    defaultValue: text || "",
    name,
  });

  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      secureTextEntry={secureTextEntry}
      style={styles.field}
      multiline={true}
    />
  );
};

interface UploadProps {
  text: string;
  setText: any
  setHasImage: any
}

export default function UploadForm(props: UploadProps) {
  const {text, setText, setHasImage} = props
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false)

  const {
    user: { userToken, userId },
  } = useContext(AuthContext);

  const onSubmit = async (data: Record<string, any>) => {
    setDisabled(true); 
    try {
      const { quoteBody, author } = data;
      const quote = {
        quoteBody,
        author,
        user: userId,
      };
      await saveQuote(quote, userToken);
      Toast.success("Quote uploaded");
    } catch (error) {
      Toast.error("Upload failed");
    }
    setDisabled(false);
    setHasImage(false);
    setText('Want to add another image?')
  };

  return (
    <View style={styles.form}>
      <View style={styles.input}>
        <View style={styles.text}>
          <Text
            style={{
              textAlign: "right",
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Detected Quote
          </Text>
        </View>
        <View style={styles.results}>
          <Input
            name="quoteBody"
            control={control}
            secureTextEntry={false}
            text={text}
          />
        </View>
      </View>
      <View style={styles.input}>
        <View style={styles.text}>
          <Text
            style={{
              textAlign: "right",
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Author
          </Text>
        </View>
        <View style={styles.results}>
          <Input name="author" control={control} secureTextEntry={false} />
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={disabled}>
          <Card style={styles.btn}>
            <Text style={{ color: "black", fontWeight: "bold" }}>Submit Quote</Text>
          </Card>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    //   alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    padding: 64,
  },
  field: {
    backgroundColor: "white",
    height: 60,
    padding: 8,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  form: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  input: {
    flexDirection: "row",
    marginTop: 8,
  },
  text: {
    flexDirection: "row",
    // width: 75,
    backgroundColor: "#006D77",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 6,
    paddingLeft: 4,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flex: 1,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  results: {
    flex: 4
  },
  btn: {
    justifyContent: "center",
    backgroundColor: "white",
    height: 40,
    width: 120,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#006D77",
    borderWidth: 2,
    marginTop: 8,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
});
