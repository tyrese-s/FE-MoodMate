import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ImageBackground, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../contexts/User";
import { getEmotions, getRandomZenQuote } from "../utils/api";
import { images } from "../assets/Images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Quote {
    quote: string;
    author: string;
  }
  
  const HomeScreen = () => {
    const { setUser, profilePhoto, firstName } = useContext(AuthContext);
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
 
    const capitaliser = (word?: string): string | undefined => {
    if(word) return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    
    return isLoading ? (
      <View style={[styles.layout, {alignItems: 'center'}]}>
        <Text style={{fontSize: 16, marginVertical: 16}}>Loading Dashboard...</Text>
        <ActivityIndicator />
      </View>) : (
        <View style={styles.layout}>
          <KeyboardAwareScrollView style={styles.scrollview}>
          <SafeAreaView style={styles.container}>
              <View style={styles.banner}>
                  <TouchableOpacity style={[styles.toJournal, {paddingHorizontal: 24}]} onPress={() => nav.navigate('Journal' as never)}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Add to Journal</Text>
                  <Icon name="book-open-variant" size={24} color={'white'} style={{marginTop: 8}} />
                  </TouchableOpacity>
              <Image source={images.defaultImg} style={styles.avatar} />
              <View style={{justifyContent: 'space-between'}}>
                  <TouchableOpacity style={styles.toJournal} onPress={() => { }}>
                      <Text>Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.toJournal} onPress={() => {setUser(false)}}>
                      <Text>Logout</Text>
                  </TouchableOpacity>
              </View>
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
            <Text style={[styles.title, { textAlign: 'center', paddingLeft: 0, marginTop: 16, marginBottom: 0 }]}>Feeling off {firstName}?</Text>
              <Text style={[styles.title, {textAlign: 'center', paddingLeft: 0, marginVertical: 16, fontWeight: 'normal'}]}>Click your mood below to explore...</Text>
              <View style={styles.moods}>
              {isLoadingMoods ?
                (
                  <View style={[styles.layout, {alignItems: 'center'}]}>
                    <Text style={{fontSize: 16, marginVertical: 16}}>Loading Moods...</Text>
                    <ActivityIndicator />
                  </View>) 
                :(emotions.map((emotion) => {
                      return (
                      <TouchableOpacity 
                      key={emotion['_id']} 
                      style={styles.moodList} 
                      onPress={() => {
                        nav.navigate('MoodPage' as never, {
                        emotionType: emotion["emotion"]} as never )
                        }}>
                          <Text>{capitaliser(emotion['emotion'])}</Text>
                      </TouchableOpacity>
                      )
                  }))}
                 
              </View>
          
          </SafeAreaView>
          </KeyboardAwareScrollView>
          <ImageBackground style={[styles.fixed, styles.background, { zIndex: -1 }]} source={images.background} imageStyle={{opacity: 0.75}} />
        </View>
            )     
  }

export default HomeScreen;
  
  const styles = StyleSheet.create({
    background: {
      // width: Dimensions.get("window").width, //for full screen
      // height: Dimensions.get("window").height //for full screen
    },
    fixed: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
   scrollview: {
     backgroundColor: 'transparent'
   },
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
      marginTop: 8, 
    },
    avatar: {
      height: 100,
      width: 100,
      borderRadius: 100 / 2,
      alignSelf: 'center'
    },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    },
  toJournal: {
    alignItems: 'center',
    justifyContent: 'center',
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
      marginVertical: 8,
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
      marginHorizontal: 5,
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
      borderRadius: 20,
      margin: 10,
  }
});
  