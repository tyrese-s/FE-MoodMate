import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { getEmotions } from "../utils/api";




export default function Dashboard () {
    const [emotions, setEmotions] = useState([])

    useEffect(() => {
        getEmotions()
        .then((emotionsFromApi) => {
        setEmotions(emotionsFromApi)
        })
    })
    console.log(emotions);
    

    return (
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
                <TouchableOpacity style={styles.moodList}>
                    <Text>Anxiety</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodList}>
                    <Text>Depression</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodList}>
                    <Text>Fear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodList}>
                    <Text>Frustration</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodList}>
                    <Text>Sadness</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodList}>
                    <Text>Nervousness</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodList}>
                    <Text>Overwhelmed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodList}>
                    <Text>Irritation</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    fontSize: 16
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

})