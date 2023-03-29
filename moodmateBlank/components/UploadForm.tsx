import React, { useContext } from 'react';
import { useForm, useController } from 'react-hook-form';
import { Text, TextInput, View, Alert, StyleSheet, Button } from 'react-native';

export default function UploadForm({text}: {text: string}) {

  interface Props {
    name: string;
    control: any;
    secureTextEntry: boolean;
  }
  
  const Input = (props: Props) => {
    const { name, control, secureTextEntry } = props;
    const { field } = useController({
      control,
      defaultValue: text,
      name,
    });
    console.log(field.value);
    return (
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        secureTextEntry={secureTextEntry}
        style={styles.field}
      />
    );
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any): void => {
    const { quote, moodCategory } = data;
    if (
      quote !== '' &&
      moodCategory !== ''
    ) {    }
  };

  return (
    <View style={styles.form}>
      <Text>Quote</Text>
      <Input name="quote" control={control} secureTextEntry={false} />
      <Text>Mood Category</Text>
      {/* <Input name="moodCategory" control={control} secureTextEntry={false} /> */}
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
  },
  form: {
    
  }
});
