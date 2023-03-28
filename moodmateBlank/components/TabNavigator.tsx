import { View, StyleSheet, Text, Button } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useContext } from "react";
import { AuthContext } from "../App";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const { setUser } = useContext(AuthContext);

    return (
    <KeyboardAwareScrollView style={styles.layout}>
        <Text style={styles.title}>Home Dashboard</Text>
        <Button title='Logout' onPress={() => {setUser(false)}}/>
    </KeyboardAwareScrollView>
    );
}

const MeditateScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Meditate</Text>
    </View>
  )
}

const CalendarScreen = () => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Calendar</Text>
    </View>
  )
}

const TabNavigator = () => {
    return (    
        <Tab.Navigator
        initialRouteName="Home"
            screenOptions={{
            headerShown: false
        }}>
        <Tab.Screen name='Meditate' component={MeditateScreen}/>
        <Tab.Screen name='Home' component={HomeScreen}/>
        <Tab.Screen name='Calendar' component={CalendarScreen}/>
        </Tab.Navigator>
      
  )
}

export default TabNavigator;

const styles = StyleSheet.create({
    layout: {
      flex: 1,
    //   justifyContent: 'center',
      padding: 8,
    },
    title: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  
  