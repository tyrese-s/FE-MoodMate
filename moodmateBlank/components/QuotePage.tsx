import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import { getAllQuotes, getRandomZenQuote, saveQuote } from "../utils/api";
import { AuthContext } from "../contexts/User";


interface Quote {
    quote: string;
    author: string;
  }

export default function QuotePage () {
    const [dailyQuoteData, setDailyQuoteData] = useState<Quote | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [allQuotes, setAllQuotes] = useState([])
    const { userToken } = useContext(AuthContext);


    useEffect(() => {
      setIsLoading(true);
      getRandomZenQuote()
      .then((quoteData) => {
        setDailyQuoteData(quoteData);
        setIsLoading(false);
      })
  },[])

  useEffect(() => {
    getAllQuotes()
    .then((allQuotes) => {
        setAllQuotes(allQuotes)
    })
  }, [])

  const onSaveQuote = (dailyQuoteData: any) => {
    saveQuote(dailyQuoteData, userToken)
  }

  console.log(allQuotes);
  

    return isLoading ?(
        <View style={[styles.layout, {alignItems: 'center'}]}>
        <Text style={{fontSize: 16, marginVertical: 16}}>Loading Quotes...</Text>
        <ActivityIndicator />
      </View>): (
        <SafeAreaView>
            <View>
                <View style={styles.quote}>
                    <Text style={styles.title}>Quote of the Day</Text>
                    <Text style={styles.quoteText}>"{dailyQuoteData?.quote}"</Text>
                    <Text style={styles.author}>{dailyQuoteData?.author}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.quoteButtons} onPress={onSaveQuote}>
                        <Text>Save Quote</Text>
                    </TouchableOpacity>        
                </View>
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
})