import React, { useContext, useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { Text, TextInput, View, Alert, StyleSheet, Button } from "react-native";

export default function UploadForm({ text }: { text: string }) {
  interface Props {
    name: string;
    control: any;
    secureTextEntry: boolean;
  }

  const Input = (props: Props) => {
    const { name, control, secureTextEntry } = props;
    const { field } = useController({
      control,
      defaultValue: name === "quote" ? text : "",
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any): void => {
    const { quote, author } = data;
    console.log(data);
    if (quote !== "" && author !== "") {
    }
  };

  return (
    <View style={styles.form}>
      <Text>Detected Quote</Text>
      <Input name="quote" control={control} secureTextEntry={false} />
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
