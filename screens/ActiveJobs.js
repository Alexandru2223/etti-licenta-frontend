import React, {useEffect, useState} from 'react';
import {auth} from "../firebase";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SearchBar} from "react-native-elements";

const ActiveJobs = ({navigation}) => {

    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        getJobs().then(r => console.log(r));
    }, [])
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };

    const getJobs = async () => {
        try {
            fetch(
                'http://localhost:8080/jobs/user/' + auth?.currentUser?.email, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            setJobs(data);
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
            <View style={{height: 15}}></View>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <FlatList
                        data={jobs}
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
                                            flexDirection: 'row',
                                            backgroundColor: 'white'
                                        }}>
                                            <View style={{backgroundColor: '#ffffff', flex: 0, margin: 5}}>
                                                <Image
                                                    style={{
                                                        width: 100, height: 100, borderRadius: 100 / 2,
                                                        overflow: "hidden",
                                                        borderWidth: 1,
                                                        borderColor: "#dadada"
                                                    }}
                                                    source={{uri: 'https://firebasestorage.googleapis.com/v0/b/licenta-7fd41.appspot.com/o/IDARY.png?alt=media&token=814346ec-242c-4cfa-bb74-b57bdf0ea17d'}}/>

                                            </View>
                                            <View style={{backgroundColor: '#ffffff', flex: 1, margin: 0}}>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    backgroundColor: 'white'
                                                }}>
                                                    <View style={{flex: 2}}>
                                                        {!!item.title && (
                                                            <Text
                                                                style={{
                                                                    paddingVertical: 10,
                                                                    fontSize: 25,
                                                                    paddingStart: 5,
                                                                    paddingEnd: 16,
                                                                    color: 'green',
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                {item.title}
                                                            </Text>
                                                        )}
                                                    </View>
                                                </View>
                                                {!!item.description && (
                                                    <Text
                                                        style={{
                                                            paddingVertical: 10,
                                                            fontSize: 15,
                                                            paddingStart: 5,
                                                            paddingEnd: 16,
                                                            color: 'black'
                                                        }}>
                                                        {item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                        {!!item.price && (
                                            <Text
                                                style={{
                                                    paddingVertical: 10,
                                                    fontSize: 15,
                                                    paddingStart: 5,
                                                    paddingEnd: 16,
                                                    color: 'black',
                                                    margin: 5
                                                }}>
                                                Pret: {item.price} RON
                                            </Text>
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

export default ActiveJobs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
})
