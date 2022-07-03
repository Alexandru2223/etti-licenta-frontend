import React, {useEffect, useState} from 'react';
import {auth} from "../firebase";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const ReceivedReviewsScreen = ({navigation, route}) => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        getReviews().then(r => console.log(r));
    }, [route])

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };
    const getReviews = async () => {
        try {
            fetch(
                'http://localhost:8080/reviews/user/' + auth?.currentUser?.email, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            setReviews(data);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }

    const requestOptionsDelete = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };
    const deleteReview = async (id) => {
        try {
            fetch(
                'http://localhost:8080/review/user/' + auth?.currentUser?.email + '/' + id, requestOptionsDelete)
                .then(response => {
                    response.json()
                        .then(data => {
                            setReviews(data);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }


    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 15,
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                }}
            />
        );
    };

    const navigateToAccountScreen = () => {
        navigation.navigate("Account")
    }

    return (
        <>
            <View style={{paddingTop: 50, left: 15}}>
                <TouchableOpacity onPress={navigateToAccountScreen}>
                    <View>
                        <Image
                            source={require('/Users/sheep/Desktop/licenta_react/icons/back-arrow.png')}
                            resizeMethod='contain'
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: '#000000',
                                top: 2
                            }}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{left: 100}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Recenzii primite</Text>
            </View>
            <View style={{height: 15}}></View>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <FlatList
                        data={reviews}
                        ItemSeparatorComponent={ItemSeparatorView}
                        keyExtriactor={(time, index) => index.toString()}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => console.log(item)}
                                >
                                    <View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row'
                                        }}>
                                            <View style={{backgroundColor: '#ffffff', flex: 1, margin: 0}}>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    backgroundColor: "#cde5c3"
                                                }}>
                                                    <View style={{flex: 2}}>
                                                        {!!item.email && (
                                                            <View style={{flexDirection: "row"}}>
                                                                <Text
                                                                    style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 18,
                                                                        paddingStart: 5,
                                                                        paddingEnd: 16,
                                                                        color: 'black',
                                                                        fontWeight: 'bold',
                                                                    }}>
                                                                    Utilizator:
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        paddingVertical: 10,
                                                                        fontSize: 18,
                                                                        paddingStart: 0,
                                                                        paddingEnd: 16,
                                                                        color: 'green',
                                                                        fontWeight: 'bold',
                                                                    }}>
                                                                    {item.senderEmail}
                                                                </Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                </View>
                                                {!!item.message && (
                                                    <View style={{flexDirection: "row", backgroundColor: "#cde5c3"}}>
                                                        <Text
                                                            style={{
                                                                paddingVertical: 10,
                                                                fontSize: 15,
                                                                paddingStart: 5,
                                                                paddingEnd: 16,
                                                                color: 'black',
                                                                fontWeight: "bold"
                                                            }}>
                                                            Mesaj:
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                paddingVertical: 10,
                                                                fontSize: 15,
                                                                paddingStart: 5,
                                                                paddingEnd: 16,
                                                                color: 'black'
                                                            }}>
                                                            {item.message.length > 50 ? item.message.substring(0, 50) + '...' : item.message}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                        {!!item.rating && (
                                            <View style={{flexDirection: "row", backgroundColor: "#cde5c3"}}>
                                                <Text
                                                    style={{
                                                        paddingVertical: 10,
                                                        fontSize: 15,
                                                        paddingStart: 5,
                                                        paddingEnd: 16,
                                                        color: 'black',
                                                        fontWeight: "bold"
                                                    }}>
                                                    Scor:
                                                </Text>
                                                <Text
                                                    style={{
                                                        paddingVertical: 5,
                                                        fontSize: 15,
                                                        paddingStart: 5,
                                                        paddingEnd: 16,
                                                        color: 'black',
                                                        margin: 5
                                                    }}>
                                                    {item.rating}/5
                                                </Text>
                                            </View>
                                        )}

                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default ReceivedReviewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
})
