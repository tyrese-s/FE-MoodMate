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
import { resetPassword } from "./../utils/api";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthContext);

  const onSubmit = (data: any): void => {
    const { email, password, passwordConfirm } = data;
    if (email !== "" && password !== "" && passwordConfirm !== "") {
      if (password === passwordConfirm) {
        setIsLoading(true);
        resetPassword(data)
          .then((response) => {
            Toast.success("Password changed");
            setIsLoading(false);

            setUser({
              hasUser: true,
              userToken: response.passwordResetToken, // Set the new userToken here
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

  return isLoading ? (
    <View style={[styles.layout, { alignItems: "center" }]}>
      <Text style={{ fontSize: 16, paddingBottom: 16 }}>
        Changing Password...
      </Text>
      <ActivityIndicator color={"#006D77"} />
    </View>
  ) : (
    <KeyboardAwareScrollView style={styles.layout}>
      <Text style={styles.text}>Email</Text>
      <Input name="email" control={control} secureTextEntry={false} />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Card style={styles.toJournal}>
          <Text style={{ color: "white" }}>Reset Password</Text>
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
