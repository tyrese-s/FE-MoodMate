import { AuthProvider } from "./contexts/User";
import { AuthContext } from "./contexts/User";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./components/TabNavigator";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { hasUser, setUser, userToken, userId } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {hasUser ? (
        <Stack.Screen name="MoodMate" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Sign Up" component={SignUpForm} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
