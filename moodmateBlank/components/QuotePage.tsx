import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useEffect, useState } from "react";
import { getRandomZenQuote } from "../utils/api";

interface Quote {
    quote: string;
    author: string;
  }

export default function QuotePage () {
    const [dailyQuoteData, setDailyQuoteData] = useState<Quote | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      getRandomZenQuote()
      .then((quoteData) => {
        setDailyQuoteData(quoteData);
        setIsLoading(false);
      })
  },[])

    return isLoading ?(
        <View style={[styles.layout, {alignItems: 'center'}]}>
        <Text style={{fontSize: 16, marginVertical: 16}}>Loading Quotes...</Text>
        <ActivityIndicator />
      </View>): (
        <SafeAreaView>
            <View style={styles.quote}>
              <Text style={styles.title}>Quote of the Day</Text>
              <Text style={styles.quoteText}>"{dailyQuoteData?.quote}"</Text>
              <Text style={styles.author}>{dailyQuoteData?.author}</Text>
            </View>        
        </SafeAreaView>
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
})