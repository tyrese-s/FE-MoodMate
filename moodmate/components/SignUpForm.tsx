import React, { useContext } from "react";
import { useForm, useController } from "react-hook-form";
import { Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signupUser } from "./../utils/api";
import { AuthContext } from "../contexts/User";
import { Toast } from "toastify-react-native";
import { Card } from "react-native-paper";

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
        .then((user) => {
          setUser({
            hasUser: true,
            userToken: user.data.token,
            userId: user.data.user._id,
            firstName: firstname,
          });
        })
        .catch((error) => {
          console.log(error);
          Toast.error("Sign-up failed!");
        });
    } else {
      Toast.warn("Input details!");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.layout}>
      <Text style={styles.text}>First Name</Text>
      <Input name="firstname" control={control} secureTextEntry={false} />
      <Text style={styles.text}>Last Name</Text>
      <Input name="lastname" control={control} secureTextEntry={false} />
      <Text style={styles.text}>Email</Text>
      <Input name="email" control={control} secureTextEntry={false} />
      <Text style={styles.text}>Password</Text>
      <Input name="password" control={control} secureTextEntry={true} />
      <Text style={styles.text}>Confirm Password</Text>
      <Input name="passwordConfirm" control={control} secureTextEntry={true} />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Card style={styles.toJournal}>
          <Text style={{ color: "white" }}>Submit & Login</Text>
        </Card>
      </TouchableOpacity>
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
  text: {
    paddingLeft: 16,
  },
  field: {
    backgroundColor: "white",
    marginTop: 4,
    marginBottom: 16,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "silver",
  },
  toJournal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006D77",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 12,
    width: 150,
    padding: 12,
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "center",
  },
});
