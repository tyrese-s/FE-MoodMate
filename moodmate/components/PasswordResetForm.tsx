import React, { useContext, useState } from "react";
import { useForm, useController } from "react-hook-form";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../contexts/User";
import { Toast } from "toastify-react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { resetPassword, requestResetCode } from "./../utils/api";

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

export default function PasswordResetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthContext);

  const onRequestCode = (data: any): void => {
    setEmailSent(false);
    const { email } = data;
    if (email !== "") {
      setIsLoading(true);
      requestResetCode(data)
        .then(() => {
          Toast.success("Email sent");
          setIsLoading(false);
          setEmailSent(true);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          setEmailSent(false);
          Toast.error("Email failed to send");
        });
    } else {
      Toast.warn("Input email!");
    }
  };

  const onResetPassword = (data: any): void => {
    const { email, resetCode, password, passwordConfirm } = data;
    if (
      email !== "" &&
      resetCode !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      if (password === passwordConfirm) {
        setIsLoading(true);
        resetPassword(data)
          .then((response) => {
            Toast.success("Password changed");
            setIsLoading(false);

            setUser({
              hasUser: true,
              userToken: response.passwordResetToken,
              userId: response._id,
              firstName: response.firstname,
            });
          })
          .catch((error) => {
            console.error(error);
            setIsLoading(false);
            Toast.error("Password reset failed");
          });
      } else {
        Toast.warn("Passwords do not match!");
      }
    } else {
      Toast.warn("Input details!");
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.layout, { alignItems: "center" }]}>
        <Text style={{ fontSize: 16, paddingBottom: 16 }}>Please wait...</Text>
        <ActivityIndicator color={"#006D77"} />
      </View>
    );
  } else if (emailSent) {
    return (
      <KeyboardAwareScrollView style={styles.layout}>
        <Text style={styles.text}>Email</Text>
        <Input name="email" control={control} secureTextEntry={false} />
        <Text style={styles.text}>Reset Code</Text>
        <Input name="resetCode" control={control} secureTextEntry={false} />
        <Text style={styles.text}>New password</Text>
        <Input name="password" control={control} secureTextEntry={true} />
        <Text style={styles.text}>Confirm password</Text>
        <Input
          name="passwordConfirm"
          control={control}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleSubmit(onResetPassword)}>
          <Card style={styles.toJournal}>
            <Text style={{ color: "white" }}>Reset Password</Text>
          </Card>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <KeyboardAwareScrollView style={styles.layout}>
        <Text style={styles.text}>Email</Text>
        <Input name="email" control={control} secureTextEntry={false} />
        <TouchableOpacity onPress={handleSubmit(onRequestCode)}>
          <Card style={styles.toJournal}>
            <Text style={{ color: "white" }}>Request code</Text>
          </Card>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
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
