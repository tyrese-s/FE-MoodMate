import { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./components/TabNavigator";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { AuthContext } from "./contexts/User";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext);

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
const MedStats = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MeditationTimer" component={MeditationTimer} />
        <Stack.Screen name="MeditationStats" component={MeditationStatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [hasUser, setUser] = useState(false);

  return (
    <AuthContext.Provider
      value={{ hasUser, setUser, userToken: null, userId: null }}
    >
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
