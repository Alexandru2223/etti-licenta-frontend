import React, {useEffect, useState} from 'react';
import {auth} from "../firebase";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const AdminEditReviews = ({navigation}) => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        getReviews().then(r => console.log(r));
    }, [])

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
                'http://localhost:8080/reviews', requestOptions)
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
                'http://localhost:8080/review/' + auth?.currentUser?.email + '/' + id, requestOptionsDelete)
                .then(response => {
                    response.json()
                        .then(data => {
                            console.log(data);
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
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Recenzii</Text>
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
                                                        {!!item.senderEmail && (
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
                                                                    Utilizator A:
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
                                                    <View style={{flex: 1, margin: 12, left: 40, flexDirection: "row"}}>
                                                        <TouchableOpacity
                                                            onPress={() => {deleteReview(item.id);}}
                                                        >
                                                            <Image
                                                                source={require('/Users/sheep/Desktop/licenta_react/icons/trash-can.png')}
                                                                resizeMethod='contain'
                                                                style={{
                                                                    width: 25,
                                                                    height: 25,
                                                                    tintColor: 'red',
                                                                }}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={{backgroundColor: "#cde5c3"}}>
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
                                                                Utilizator B:
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
                                                                {item.email}
                                                            </Text>
                                                        </View>
                                                    )}

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

export default AdminEditReviews;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
})
