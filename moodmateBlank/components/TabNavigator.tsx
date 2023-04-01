import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import QuoteUploader from "./QuoteUploader";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./HomeScreen";
import MoodPage from "./MoodPage";
import TimerScreen from "./TimerComponents/TimerScreen";
import JournalPage from "./JournalPage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator(); 
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Home Screen' component={HomeScreen} />
          <Stack.Screen name="MoodPage" component={MoodPage} />
          <Stack.Screen name ='Journal' component={JournalPage}/>
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
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarActiveBackgroundColor: '#e91e63',
            tabBarStyle:{
              // backgroundColor:'#0000ff',
              height:55
            },
            
            tabBarItemStyle:{
              margin: 4,
              padding: 4,
              borderRadius:30,
            }
            }}
          >
        <Tab.Screen name='Meditate' component={TimerScreen} options={{tabBarIcon: ({ color, size }) => {
            return <Icon name="meditation" size={size} color={color} />;
          },}} />
          <Tab.Screen name='Home' component={HomeStack} options={{unmountOnBlur: true, tabBarIcon: ({ color, size }) => {
            return <Icon name="home-variant" size={size} color={color} />;
          },}}/>
          <Tab.Screen name='Journal' component={CalendarScreen} options={{tabBarIcon: ({ color, size }) => {
            return <Icon name="calendar-month" size={size} color={color} />;
          },}}/>
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
  
