import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../contexts/User";
import { getEmotions, getRandomZenQuote } from "../utils/api";

interface Quote {
    quote: string;
    author: string;
  }
  
  const HomeScreen = () => {
    const { setUser } = useContext(AuthContext);
    const nav = useNavigation();
  
    const [emotions, setEmotions] = useState([])
    const [dailyQuoteData, setDailyQuoteData] = useState<Quote | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMoods, setIsLoadingMoods] = useState(true);
  
    useEffect(() => {
      setIsLoadingMoods(true);
      getEmotions()
      .then((emotionsFromApi) => {
        setEmotions(emotionsFromApi)
        setIsLoadingMoods(false);
      })
    },[])
    
    useEffect(() => {
      setIsLoading(true);
      getRandomZenQuote()
      .then((quoteData) => {
        setDailyQuoteData(quoteData);
        setIsLoading(false);
      })
  },[])
    
    return isLoading ? (
      <KeyboardAwareScrollView style={styles.layout}>
        <Text>Loading Dashboard...</Text>
      </KeyboardAwareScrollView>) : (
      <KeyboardAwareScrollView style={styles.layout}>
          {/* <Button title='Logout' /> */}
        <SafeAreaView style={styles.container}>
              <View style={styles.banner}>
                  <TouchableOpacity style={styles.toJournal}>
                      <Text>Add to Journal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.toJournal} onPress={() => {setUser(false)}}>
                      <Text>Logout</Text>
                  </TouchableOpacity>
              </View>
          <View style={styles.quote}>
            <View>
              <Text style={styles.title}>Quote of the Day</Text>
              <Text style={styles.quoteText}>"{dailyQuoteData?.quote}"</Text>
              <Text style={styles.author}>{dailyQuoteData?.author}</Text>
            </View>
                  <View style={styles.bothQuoteButtons}>
                  <TouchableOpacity style={styles.quoteButtons}>
                      <Text>Save Quote</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.quoteButtons} onPress={() => nav.navigate('Upload' as never)}>
                      <Text>Upload Quote</Text>
                  </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.moods}>
              {isLoadingMoods ?
                (
                  <KeyboardAwareScrollView style={styles.layout}>
                    <Text>Loading Moods...</Text>
                  </KeyboardAwareScrollView>) 
                :(emotions.map((emotion) => {
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
                  }))}
                 
              </View>
          </SafeAreaView>
      </KeyboardAwareScrollView>)
  }

export default HomeScreen;
  
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
  