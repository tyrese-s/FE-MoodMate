import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Share
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getAllQuotes, deleteQuote } from "../utils/api";
import { AuthContext } from "../contexts/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Toast } from "toastify-react-native";
import { images } from "../assets/Images";
import { Card, ActivityIndicator } from "react-native-paper";

interface Quote {
  quote: string;
  author: string;
  _id: string;
}

export default function QuotePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allQuotes, setAllQuotes] = useState([]);
  const { user } = useContext(AuthContext);

  const { userToken } = user;

  useEffect(() => {
    setIsLoading(true);
    getAllQuotes(userToken).then((savedQuotesFromApi) => {
      setAllQuotes(savedQuotesFromApi.data.quotes);
      setIsLoading(false);
    });
  }, [userToken]);

  const onDelete = (quoteId: string, userToken: string) => {
    try {
      deleteQuote(quoteId, userToken)
        .then(() => {
          setAllQuotes((currentQuotes) => {
            const filteredQuotes = currentQuotes.filter(
              (quoteToDelete: Quote) => {
                return quoteToDelete._id !== quoteId;
              }
            );
            return [...filteredQuotes];
          });
        })
        .then(() => {
          Toast.success("Quote deleted");
        });
    } catch (error) {
      Toast.error("Delete failed");
    }
  };

    const onShare = async (author: string, text: string) => {
        const content = {
            message: `"${text} "- ${author}`,
            title: 'Check out this quote on MoodMate!: '
        }
        try {
            await Share.share(content)
        }
        catch (err) {
            Toast.error("Share failed")
        }
    }

  return isLoading ? (
    <View style={[styles.layout, { alignItems: "center" }]}>
      <Text
        style={{
          color: "white",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 2,
          textShadowColor: "black",
          fontWeight: "bold",
          paddingVertical: 16,
          fontSize: 16,
        }}
      >
        Loading Quotes...
      </Text>
      <ImageBackground
        style={[styles.fixed, { zIndex: -1 }]}
        source={images.background}
        imageStyle={{ opacity: 0.7 }}
      />
      <ActivityIndicator color={"white"} />
    </View>
  ) : (
    <View style={[styles.layout, { alignItems: "center" }]}>
      <KeyboardAwareScrollView style={styles.scrollview}>
        <SafeAreaView>
          <View>
            <View>
              {allQuotes?.map((quoteObj: any) => {
                return (
                  <Card style={styles.quote} key={quoteObj._id}>
                    <Text style={styles.author}>{quoteObj.author}</Text>
                    <Text style={styles.quoteText}>{quoteObj.quoteBody}</Text>
                    <TouchableOpacity
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => onDelete(quoteObj._id, userToken)}
                    >
                      <Card style={styles.removeQuote} mode="outlined">
                        <Text>Remove quote</Text>
                      </Card>
                    </TouchableOpacity>
                        <TouchableOpacity
                            style={{alignSelf:'flex-end'}}
                            onPress={() => onShare(quoteObj.author, quoteObj.quoteBody)}>
                            <Card style={styles.removeQuote} mode="outlined"> 
                                <Text>Share quote</Text> 
                            </Card>
                        </TouchableOpacity>
                  </Card>
                );
              })}
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
      <ImageBackground
        style={[styles.fixed, { zIndex: -1 }]}
        source={images.background}
        imageStyle={{ opacity: 0.7 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "#83C5BE",
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
  quote: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFF",
    marginVertical: 10,
    marginHorizontal: 5,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  quoteText: {
    textAlign: "left",
    fontSize: 18,
    fontStyle: "italic",
    paddingRight: 8,
  },
  author: {
    paddingBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  removeQuote: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 20,
    marginTop: 15,
    height: 35,
    width: 110,
  },
});
