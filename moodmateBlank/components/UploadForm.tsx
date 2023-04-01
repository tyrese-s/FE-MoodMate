import React, { useContext } from "react";
import { useForm, useController } from "react-hook-form";
import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { saveQuote } from "../utils/api";
import { AuthContext } from "./../contexts/User";

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

export default function UploadForm({ text }: { text: string }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userToken, userId } = useContext(AuthContext);

  const onSubmit = async (data: Record<string, any>) => {
    try {
      const { quoteBody, author } = data;
      const quote = {
        quoteBody,
        author,
        user: userId,
      };
      await saveQuote(quote, userToken);
      // do something after the quote is saved successfully
    } catch (error) {
      // handle the error
    }
  };

  return (
    <View style={styles.form}>
      <Text>Detected Quote</Text>
      <Input
        name="quoteBody"
        control={control}
        secureTextEntry={false}
        text={text}
      />
      <Text>Author</Text>
      <Input name="author" control={control} secureTextEntry={false} />
      <Button title="Submit Quote" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    padding: 64,
  },
  field: {
    backgroundColor: "silver",
    height: 60,
    padding: 8,
  },
  form: {},
});
