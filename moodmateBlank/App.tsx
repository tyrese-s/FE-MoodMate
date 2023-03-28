import { createContext, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './components/TabNavigator';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

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
        ? <Stack.Screen name="MoodMate" component={TabNavigator} />
        : <>
          <Stack.Screen name='Login' component={LoginForm} />
          <Stack.Screen name='SignUp' component={SignUpForm} />
          </>
      }
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