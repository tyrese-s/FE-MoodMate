import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  // ActivityIndicator,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../contexts/User";
import { getEmotions, getRandomZenQuote } from "../utils/api";
import { images } from "../assets/Images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Card } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


interface Quote {
  quote: string;
  author: string;
}

const HomeScreen = () => {
  const { setUser, profilePhoto, firstName } = useContext(AuthContext);
  const nav = useNavigation();

  const [emotions, setEmotions] = useState([]);
  const [dailyQuoteData, setDailyQuoteData] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMoods, setIsLoadingMoods] = useState(true);

  useEffect(() => {
    setIsLoadingMoods(true);
    getEmotions().then((emotionsFromApi) => {
      setEmotions(emotionsFromApi);
      setIsLoadingMoods(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getRandomZenQuote().then((quoteData) => {
      setDailyQuoteData(quoteData);
      setIsLoading(false);
    });
  }, []);

  const capitaliser = (word?: string): string | undefined => {
    if (word) return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  return isLoading ? (
    <View style={[styles.layout, { alignItems: "center" }]}>
      <Text style={{ fontSize: 16, marginVertical: 16 }}>
        Loading Dashboard...
      </Text>
      <ActivityIndicator color={'#006D77'} />
    </View>
  ) : (
    <View style={styles.layout}>
      <KeyboardAwareScrollView style={styles.scrollview}>
        <SafeAreaView style={styles.container}>
          <View style={styles.banner}>
            <TouchableOpacity onPress={() => nav.navigate("Journal" as never)}>
              <Card style={[styles.toJournal, { padding: 0 }]}>
                <Card.Content>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Add to Journal
                  </Text>
                  <Icon
                    name="book-open-variant"
                    size={24}
                    color={"white"}
                    style={{ marginTop: 8, alignSelf: "center" }}
                  />
                </Card.Content>
              </Card>
            </TouchableOpacity>
            <View style={styles.shadow}>
              <Image source={images.defaultImg} style={styles.avatar} />
            </View>
            <View style={{ justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => {}}>
                <Card style={styles.toJournal}>
                  <Text style={{color: 'white'}}>Profile</Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setUser(false);
                }}
              >
                <Card style={styles.toJournal}>
                  <Text style={{color: 'white'}}>Logout</Text>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
          <Card style={styles.quote}>
            <Card.Content>
              <View>
                <Text style={styles.title}>Quote of the Day</Text>
                <Text style={styles.quoteText}>"{dailyQuoteData?.quote}"</Text>
                <Text style={styles.author}>{dailyQuoteData?.author}</Text>
              </View>
              <View style={styles.bothQuoteButtons}>
                <TouchableOpacity>
                  <Card style={styles.quoteButtons} mode='outlined'>
                    <Text>Save Quote</Text>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => nav.navigate("Upload" as never)}
                >
                  <Card style={styles.quoteButtons} mode='outlined'>
                    <Text>Upload Quote</Text>
                  </Card>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
          <Text
            style={[
              styles.title,
              {
                textAlign: "center",
                paddingLeft: 0,
                marginTop: 16,
                marginBottom: 0,
                color: 'white',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 6,
                textShadowColor: 'white'
              },
            ]}
          >
            Feeling off {firstName}?
          </Text>
          <Text
            style={[
              styles.title,
              {
                textAlign: "center",
                paddingLeft: 0,
                marginVertical: 16,
                // fontWeight: "normal",
                color: 'white',
                textShadowOffset: {width: 0, height: 0},
                textShadowRadius: 6,
                textShadowColor: 'white'
              },
            ]}
          >
            Click your mood below to explore...
          </Text>
          <View style={styles.moods}>
            {isLoadingMoods ? (
              <View style={[styles.layout, { alignItems: "center" }]}>
                <Text style={{ fontSize: 16, marginVertical: 16 }}>
                  Loading Moods...
                </Text>
                <ActivityIndicator />
              </View>
            ) : (
              emotions.map((emotion) => {
                return (
                  <TouchableOpacity
                    key={emotion["_id"]}
                    onPress={() => {
                      nav.navigate(
                        "MoodPage" as never,
                        {
                          emotionType: emotion["emotion"],
                        } as never
                      );
                    }}
                    style={styles.moodList}
                  >
                    <Card style={styles.moodList}>
                    <Text>{capitaliser(emotion["emotion"])}</Text>
                    </Card>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      <ImageBackground
        style={[styles.fixed, styles.background, { zIndex: -1 }]}
        source={images.background}
        imageStyle={{ opacity: 0.7 }}
      />
    </View>
  );
};

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
    bottom: 0,
  },
  scrollview: {
    backgroundColor: "transparent",
  },
  layout: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
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
    alignSelf: "center",
    // borderWidth: 5,
    // borderColor: 'white'
    // borderColor: '#E29578'
  },
  shadow: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    // backgroundColor: '#EDF6F9',
    // borderRadius: 50
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  toJournal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006D77",
    borderRadius: 10,
    // marginTop: -10,
    marginHorizontal: 5,
    width: 120,
    padding: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  quote: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    marginVertical: 8,
    marginLeft: 5,
    marginRight: 5,
    height: 220,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  quoteText: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 15,
    fontStyle: "italic",
  },
  author: {
    textAlign: "right",
    paddingTop: 8,
    paddingRight: 15,
    paddingBottom: 16,
    fontWeight: "bold",
  },
  bothQuoteButtons: {
    flexDirection: "row",
    // width: 200,
    justifyContent: "space-between",
  },
  quoteButtons: {
    justifyContent: "center",
    backgroundColor: 'lightblue',
    height: 40,
    width: 120,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 5,
    // borderColor: '#E29578',
    // borderWidth: 1.5,
  },
  moods: {
    flex: 1,
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  moodList: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    listStyleType: "none",
    backgroundColor: "#EDF6F9",
    width: 120,
    height: 60,
    borderRadius: 40,
    margin: 10,
  },
});
