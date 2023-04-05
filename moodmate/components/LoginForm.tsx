import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { useForm, useController } from "react-hook-form";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { loginUser } from "./../utils/api";
import { AuthContext } from "../contexts/User";
import { ActivityIndicator, Card } from "react-native-paper";
import { Toast } from "toastify-react-native";

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

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthContext);
  const nav = useNavigation();

  const onSubmit = (data: any): void => {
    const { email, password } = data;

    if (email !== "" && password !== "") {
      setIsLoading(true);
      loginUser(data)
        .then(({ token, data: { user } }) => {
          const hasToken = token !== null;
          const { _id, firstname } = user;
          if (hasToken && _id !== null) {
            setUser({
              hasUser: true,
              userToken: token,
              userId: user._id,
              firstName: firstname,
            });
            setIsLoading(false);
          } else {
            throw new Error("Missing user data");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response && error.response.status === 401) {
            Toast.warn("Incorrect email or password");
          } else {
            Toast.error(`Invalid login details`);
          }
        });
    } else {
      Toast.info("Input details");
    }
  };

  return isLoading ? (
    <View style={[styles.layout, { alignItems: "center" }]}>
      <Text style={{ fontSize: 16, paddingBottom: 16 }}>Signing In...</Text>
      <ActivityIndicator color={"#006D77"} />
    </View>
  ) : (
    <KeyboardAwareScrollView style={styles.layout}>
      <TouchableOpacity onPress={() => nav.navigate("Sign Up" as never)}>
        <Card style={styles.btn}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            Sign Up
          </Text>
        </Card>
      </TouchableOpacity>
      <Text style={styles.text}>Email</Text>
      <Input name="email" control={control} secureTextEntry={false} />
      <Text style={styles.text}>Password</Text>
      <Input name="password" control={control} secureTextEntry={true} />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Card style={styles.toJournal}>
          <Text style={{ color: "white" }}>Login</Text>
        </Card>
      </TouchableOpacity>
      <Button
        title="Forgotten Password"
        onPress={() => nav.navigate("Reset Password" as never)}
      />
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
  btn: {
    alignSelf: "flex-end",
    borderRadius: 30,
    backgroundColor: "#006D77",
    width: 75,
    padding: 8,
  },
  toJournal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006D77",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 12,
    width: 120,
    padding: 12,
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "center",
  },
});
