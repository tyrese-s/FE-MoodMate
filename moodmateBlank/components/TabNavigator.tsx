import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import QuoteUploader from "./QuoteUploader";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./HomeScreen";
import MoodPage from "./MoodPage";
import TimerScreen from "./TimerComponents/TimerScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Home Screen' component={HomeScreen} />
          <Stack.Screen name="MoodPage" component={MoodPage}/>
          <Stack.Screen name='Upload' component={QuoteUploader}/>
        </Stack.Navigator>
    );
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
        }} >
        <Tab.Screen name='Meditate' component={TimerScreen}/>
        <Tab.Screen name='Home' component={HomeStack}/>
        <Tab.Screen name='Calendar' component={CalendarScreen}/>
        </Tab.Navigator>
      
  )
}

export default TabNavigator;

const styles = StyleSheet.create({
    layout: {
      flex: 1,
    },
    title: {
      marginBottom: 16,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingLeft: 16,
    },
    container: {
      flex: 1,
      // alignContent: 'center',
      // justifyContent: 'center',
      backgroundColor: '#EED2E7'
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
  toJournal: {
    alignItems: 'center',
      backgroundColor: '#60A9EE',
    borderRadius: 10,
      // marginTop: -10,
      marginHorizontal: 5,
      width: 120,
    padding: 12,
  },
  quote: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#F08080',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
      height: 220,
    borderRadius: 10,
      padding: 16,
  },
  quoteText: {
  textAlign: 'center',
  fontSize: 18,
  paddingLeft: 15,
  paddingRight: 15,
  fontStyle: 'italic',
  },
  author: {
    textAlign: 'right',
    paddingTop: 8,
    paddingRight: 15,
    fontWeight: 'bold',
  },
  bothQuoteButtons: {
    flexDirection: 'row',
    // width: 200,
    justifyContent: 'space-between'
  },
  quoteButtons:{
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: '#fff',
      height: 40,
      width: 120,
      borderRadius: 20,
      alignItems: 'center',
      marginHorizontal: 5,
  },
  moods: {
      flex:1,
      justifyContent: 'center',
      flexWrap:'wrap',
      flexDirection: 'row',
      // backgroundColor: '#F3BCE5',
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 5,

  },
  moodList: {
      justifyContent: 'center',
      alignItems:'center',
      borderWidth: 1,
      listStyleType: 'none',
      backgroundColor: '#fff',
      width: 120,
      height: 60,
      padding: 12,
      borderRadius: 20,
      margin: 10,
  }
  });
  
