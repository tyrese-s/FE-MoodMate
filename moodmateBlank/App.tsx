import { createContext, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './components/SignUpScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const AuthContext = createContext({
  hasUser: false, 
  setUser: (input : boolean) => {},
});

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext);

  return (
    <Stack.Navigator>
    {hasUser
        ? <Stack.Screen name="MoodMate" component={HomeScreen} />
        : <Stack.Screen name="Sign In" component={LoginScreen} />
      }
      {/* <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home'}}
            />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Login'}}
            />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: 'Sign Up'}}
            />
        </Stack.Navigator> */}
    </Stack.Navigator>
  );
};

export default function App() {
  const [hasUser, setUser] = useState(false);

  return (
    <AuthContext.Provider value={{hasUser, setUser}}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
   form: {
    width: '50%',
  }
});
