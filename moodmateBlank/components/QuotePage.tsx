import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getAllQuotes, getRandomZenQuote, deleteQuote } from "../utils/api";
import { AuthContext } from "../contexts/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {Toast} from 'toastify-react-native';
import { images } from "../assets/Images";
import { Card } from "react-native-paper";


interface Quote {
    quote: string;
    author: string;
  }

export default function QuotePage () {
    const [isLoading, setIsLoading] = useState(true);
    const [allQuotes, setAllQuotes] = useState([])
    const { user } = useContext(AuthContext)
    const [hasQuotes, setHasQuotes] = useState(false)

    const { userToken} = user

    useEffect(() => {
        setIsLoading(true);
      getAllQuotes(userToken)
      .then((savedQuotesFromApi) => {
          setAllQuotes(savedQuotesFromApi.data.quotes)
          setIsLoading(false)
          setHasQuotes(true)
      })
    }, [userToken, hasQuotes])

    const onDelete = (quoteId: string, userToken: string) => {
       try {
         deleteQuote(quoteId, userToken)
        .then(() => {
            Toast.success("Quote deleted")
        })}
        catch (error) {
            Toast.error("Delete failed")
        }
        setHasQuotes(false)
    }

    return isLoading ?(
        <View style={[styles.layout, {alignItems: 'center'}]}>
        <Text style={{fontSize: 16, marginVertical: 16}}>Loading Quotes...</Text>
        <ActivityIndicator />
      </View>): (
        <View style={[styles.layout, {alignItems: 'center'}]}>
        <KeyboardAwareScrollView style={styles.scrollview}>
        <SafeAreaView>
            <View>
                {hasQuotes &&
                <View>
                   {allQuotes?.map((quoteObj: any) => {
                       return ( 
                        <View style={styles.quote} key={quoteObj._id}>
                        <Text style={styles.quoteText}>{quoteObj.quoteBody}</Text>
                        <Text style={styles.author}>{quoteObj.author}</Text>
                        <TouchableOpacity
                            style={{alignSelf:'flex-end'}}
                            onPress={() => onDelete(quoteObj._id, userToken)}>
                            <Card style={styles.removeQuote} mode="outlined"> 
                                <Text>Remove quote</Text> 
                            </Card>
                        </TouchableOpacity>
                    </View>)
                   })}
                </View>
                }
            </View>
        </SafeAreaView>
        </KeyboardAwareScrollView>
        <ImageBackground
        style={[styles.fixed, styles.background, { zIndex: -1 }]}
        source={images.background}
        imageStyle={{ opacity: 0.7 }}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: '#EED2E7',
    },
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
    quote: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        marginVertical: 20,
        marginHorizontal: 5,
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 70,
        paddingVertical: 20,
        paddingRight: 40,
        paddingLeft: 25
    },
    quoteText: {
        textAlign: 'left',
        fontSize: 18,
        fontStyle: 'italic',
    },
    author: {
        textAlign: 'right',
        paddingRight: 15,
        fontWeight: 'bold',
        marginTop: 5,
        alignSelf: 'flex-end'
    },
    removeQuote:{
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: 'lightblue',
        borderRadius: 20,
        marginTop: 15,
        height: 35,
        width: 110,
    }
})