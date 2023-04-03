import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getAllQuotes, getRandomZenQuote, deleteQuote } from "../utils/api";
import { AuthContext } from "../contexts/User";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Quote {
    quote: string;
    author: string;
  }

export default function QuotePage () {
    const [isLoading, setIsLoading] = useState(true);
    const [allQuotes, setAllQuotes] = useState([])
    const { user } = useContext(AuthContext)

    const { userToken} = user

    useEffect(() => {
        setIsLoading(true);
      getAllQuotes(userToken)
      .then((savedQuotesFromApi) => {
          setAllQuotes(savedQuotesFromApi.data.quotes)
          setIsLoading(false);
      })
    }, [userToken])


    return isLoading ?(
        <View style={[styles.layout, {alignItems: 'center'}]}>
        <Text style={{fontSize: 16, marginVertical: 16}}>Loading Quotes...</Text>
        <ActivityIndicator />
      </View>): (
        <KeyboardAwareScrollView>
        <SafeAreaView>
            <View>
                <View>
                   {allQuotes?.map((quoteObj: any) => {
                       return ( 
                    <View style={styles.quote} key={quoteObj._id}>
                        <Text style={styles.quoteText}>{quoteObj.quoteBody}</Text>
                        <Text style={styles.author}>{quoteObj.author}</Text>
                        <TouchableOpacity
                            style={styles.removeQuote} 
                            onPress={() => deleteQuote(quoteObj._id, userToken)}>
                            <Text>Remove quote</Text>
                        </TouchableOpacity>
                    </View>)
                   })}
                </View>
            </View>
        </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: '#EED2E7',
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
    title: {
        marginBottom: 16,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 16,
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
    removeQuote:{
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 35,
        width: 110,
    }
})