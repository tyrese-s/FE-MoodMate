import React, { useContext } from 'react';
import { useForm, useController } from 'react-hook-form';
import { Text, TextInput, View, Alert, StyleSheet, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signupUser } from "./../utils/api";
import { AuthContext } from '../contexts/User';

interface Props {
  name: string;
  control: any;
  secureTextEntry: boolean;
}

const Input = (props: Props) => {
  const { name, control, secureTextEntry } = props;
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      secureTextEntry={secureTextEntry}
      style={styles.field}
    />
  );
};

export default function SignUpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthContext);

  const onSubmit = (data: any): void => {
    const { firstname, lastname, email, password, passwordConfirm } = data;
    if (
      passwordConfirm !== "" &&
      email !== "" &&
      firstname !== "" &&
      lastname !== "" &&
      password !== ""
    ) {
      signupUser(data)
        .then((response) => {
          setUser(true);
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to sign up!");
        });
    } else {
      alert("Input details!");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.layout}>
      <Text>First Name</Text>
      <Input name="firstname" control={control} secureTextEntry={false} />
      <Text>Last Name</Text>
      <Input name="lastname" control={control} secureTextEntry={false} />
      <Text>Email</Text>
      <Input name="email" control={control} secureTextEntry={false} />
      <Text>Password</Text>
      <Input name="password" control={control} secureTextEntry={true} />
      <Text>Confirm Password</Text>
      <Input name="passwordConfirm" control={control} secureTextEntry={true} />
      <Button title="Submit & Login" onPress={handleSubmit(onSubmit)} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    margin: 24,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    padding: 64,
  },
  field: {
    backgroundColor: "silver",
    marginTop: 4,
    marginBottom: 16,
    padding: 8,
  },
});
