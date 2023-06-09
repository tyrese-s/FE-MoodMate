import { useNavigation } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../contexts/User";
import { getEmotions, getRandomZenQuote } from "../utils/api";
import { images } from "../assets/Images";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import { saveQuote } from "../utils/api";
import { useForm } from "react-hook-form";
import { Toast } from "toastify-react-native";

interface Quote {
  quote: string;
  author: string;
}

const HomeScreen = () => {
  const { setUser, user } = useContext(AuthContext);
  const nav = useNavigation();
  const { handleSubmit } = useForm();
  const [emotions, setEmotions] = useState([]);
  const [dailyQuoteData, setDailyQuoteData] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMoods, setIsLoadingMoods] = useState(true);

  const { userToken, userId, firstName } = user;

  useEffect(() => {
    setIsLoadingMoods(true);
    getEmotions().then((emotionsFromApi) => {
      setEmotions(emotionsFromApi);
      setIsLoadingMoods(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getRandomZenQuote(null as never).then((quoteData) => {
      setDailyQuoteData(quoteData);
      setIsLoading(false);
    });
  }, []);

  const capitaliser = (word?: string): string | undefined => {
    if (word) return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const onSubmit = async (data: Record<string, any>) => {
    try {
      const quote = {
        quoteBody: dailyQuoteData?.quote,
        author: dailyQuoteData?.author,
        user: userId,
      };
      await saveQuote(quote, userToken);
      Toast.success("Quote saved");
    } catch (error) {
      Toast.error("Save failed");
    }
  };

  return isLoading ? (
    <View style={[styles.layout, { alignItems: "center" }]}>
      <Text style={{ fontSize: 16, marginVertical: 16 }}>
        Loading Dashboard...
      </Text>
      <ActivityIndicator color={"#006D77"} />
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
                  <Text style={{ color: "white" }}>Profile</Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setUser({ ...user, hasUser: false });
                }}
              >
                <Card style={styles.toJournal}>
                  <Text style={{ color: "white" }}>Logout</Text>
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
                  <Card
                    style={styles.quoteButtons}
                    onPress={() => nav.navigate("Quotes" as never)}
                    mode="outlined"
                  >
                    <Text>All Quotes</Text>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Card style={styles.quoteButtons} mode="outlined">
                    <Text>Save</Text>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => nav.navigate("Upload" as never)}
                >
                  <Card style={styles.quoteButtons} mode="outlined">
                    <Text>Upload</Text>
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
                color: "white",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 2,
                textShadowColor: "black",
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
                color: "white",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 2,
                textShadowColor: "black",
              },
            ]}
          >
            Click your mood below to explore...
          </Text>
          <View style={styles.moods}>
            {isLoadingMoods ? (
              <View style={[styles.layout, { alignItems: "center" }]}>
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 16,
                    color: "white",
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 2,
                    textShadowColor: "black",
                  }}
                >
                  Loading Moods...
                </Text>
                <ActivityIndicator color={"white"} />
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
        style={[styles.fixed,{ zIndex: -1 }]}
        source={images.background}
        imageStyle={{ opacity: 0.7 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
    marginVertical: 8,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  shadow: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  toJournal: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006D77",
    borderRadius: 10,
    marginHorizontal: 5,
    width: 120,
    padding: 12,
    borderWidth: 2,
    borderColor: "white",
  },
  quote: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    marginVertical: 16,
    marginHorizontal: 5,
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
    justifyContent: "flex-end",
  },
  quoteButtons: {
    justifyContent: "center",
    backgroundColor: "lightblue",
    height: 40,
    width: 90,
    borderRadius: 20,
    alignItems: "center",
    marginLeft: 6,
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
    listStyleType: "none",
    backgroundColor: "#EDF6F9",
    width: 120,
    height: 60,
    borderRadius: 40,
    margin: 10,
  },
});
