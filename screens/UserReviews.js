import React, {useEffect, useState} from 'react';
import {auth} from "../firebase";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { LogBox } from 'react-native';
import {useIsFocused} from "@react-navigation/core";

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const UserReviews = ({navigation, route}) => {
    const {data} = route.params;
    const [grade, setGrade] = useState([]);
    const isFocused = useIsFocused();

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (isFocused) {
            getReviews().then(r => console.log(r));
        }
    }, [isFocused])

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
                'http://localhost:8080/reviews/user/' + data.userDTO.username, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            setReviews(data);
                            let value = 0;
                            data.forEach(review => {
                                value = value + review.rating
                            })
                            for (let i=0; i< value/data.length; i++){
                                setGrade(oldArray => [...oldArray, i]);
                            }
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

    const ItemSeparatorViewStars = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    width: '100%',
                }}
            />
        );
    };



    return (
        <>
            <View style={{paddingTop: 50, left: 15}}>
                <TouchableOpacity onPress={() => navigation.navigate("JobScreen", {data: data})}>
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
            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Recenzii </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>{data.userDTO.username}</Text>
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

export default UserReviews;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
})
