import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from "react-native-safe-area-context";
import { getEmotions } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    const { setUser } = useContext(AuthContext);
    const [emotions, setEmotions] = useState([])

    useEffect(() => {
      getEmotions()
      .then((emotionsFromApi) => {
          setEmotions(emotionsFromApi)
      })
  })
  const nav = useNavigation()
  
    return (
      <KeyboardAwareScrollView style={styles.layout}>
        <Text style={styles.title}>Home Dashboard</Text>
        <Button title='Logout' onPress={() => {setUser(false)}}/>
      <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity style={styles.toJournal}>
                    <Text>Add to Journal</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.quote}>
                <Text style={styles.quoteText}>Quote: "Resentment can be a normal response to certain situations, but it is important to manage it in a healthy way to avoid negative consequences."</Text>
                <View style={styles.bothQuoteButtons}>
                <TouchableOpacity style={styles.quoteButtons}>
                    <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quoteButtons}>
                    <Text>Add</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.moods}>
                {emotions.map((emotion) => {
                    return (
                    <TouchableOpacity 
                    key={emotion['_id']} 
                    style={styles.moodList} 
                    onPress={() => {
                      nav.navigate('MoodPage' as never, {
                      emotionType: emotion["emotion"]} as never )
                      }}>

                        <Text>{emotion['emotion']}</Text>
                    </TouchableOpacity>
                    )
                })}
               
            </View>
        </SafeAreaView>
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
    container: {
      flex: 1,
      // alignContent: 'center',
      // justifyContent: 'center',
      backgroundColor: '#EED2E7'
  },
  toJournal: {
      // flex:1,
      backgroundColor: '#60A9EE',
      borderRadius: 10,
      marginTop: 10,
      marginLeft: 5,
      width: 120,
      padding: 12
  },
  quote: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F08080',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
      height: 220,
      borderRadius: 10
  },
  quoteText: {
  textAlign: 'center',
  fontSize: 16,
  paddingLeft: 15,
  paddingRight: 15
  },
  bothQuoteButtons: {
      display:'flex',
      alignItems: 'flex-end',
      flexDirection:'row',
  },
  quoteButtons:{
      marginTop: 10,
      justifyContent: 'space-between',
      borderWidth: 1,
      backgroundColor: '#fff',
      padding: 10,
      height: 40,
      width: 55,
      borderRadius: 5
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
  
