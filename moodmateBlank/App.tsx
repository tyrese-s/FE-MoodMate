import { AuthContext } from "./contexts/User";
import React, { useContext, useState } from "react";
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
  const [authState, setAuthState] = useState({
    hasUser: false,
    userToken: null,
    userId: null,
  });

  const setUser = ({
    hasUser,
    userToken,
    userId,
  }: {
    hasUser: boolean;
    userToken: string | null;
    userId: string | null;
  }) => {
    setAuthState({ hasUser, userToken, userId });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setUser }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
