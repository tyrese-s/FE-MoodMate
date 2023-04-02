import { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./components/TabNavigator";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { AuthContext } from "./contexts/User";
import { Provider as PaperProvider} from "react-native-paper";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {hasUser ? (
        <Stack.Screen name="MoodMate" component={TabNavigator} options={{
          // title: 'Dashboard',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#006D77'
        }} />
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
  const [hasUser, setUser] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [firstName, setFirstName] = useState("");

  return (
    <PaperProvider>
      <AuthContext.Provider
        value={{
          hasUser,
          setUser,
          profilePhoto,
          setProfilePhoto,
          firstName,
          setFirstName,
        }}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
