import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./components/TabNavigator";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import PasswordResetForm from "./components/PasswordResetForm";
import { AuthContext } from "./contexts/User";
import { Provider as PaperProvider } from "react-native-paper";
import ToastManager from "toastify-react-native";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const {
    user: { hasUser },
  } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {hasUser ? (
        <Stack.Screen
          name="MoodMate"
          component={TabNavigator}
          options={{
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "#006D77",
          }}
        />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Sign Up" component={SignUpForm} />
          <Stack.Screen name="Reset Password" component={PasswordResetForm} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  const [authState, setAuthState] = useState({
    hasUser: false,
    userToken: "",
    userId: "",
    firstName: "",
  });

  const setUser = ({
    hasUser,
    userToken,
    userId,
    firstName,
  }: {
    hasUser: boolean;
    userToken: string;
    userId: string;
    firstName: string;
  }) => {
    setAuthState({ hasUser, userToken, userId, firstName });
  };

  return (
    <PaperProvider>
      <ToastManager />
      <AuthContext.Provider value={{ user: { ...authState }, setUser }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
