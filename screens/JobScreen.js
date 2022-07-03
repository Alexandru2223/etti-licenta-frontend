import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import {auth, db} from '../firebase'
import {LogBox} from 'react-native';
import {useNavigation} from "@react-navigation/native";

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


const JobScreen = ({navigation, route}) => {
    const {data} = route.params;


    const [chats, updateChats] = useState([]);
    const [rooms, updateRooms] = useState(null);
    let room = "";

    useEffect(() => {
        if (chats.length > 0) {
            updateChats([]);
        }
        db.collection('rooms').get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data())
                    if (documentSnapshot.data().email1 === auth?.currentUser?.email && documentSnapshot.data().email2 === data.userDTO.username.toLowerCase()) {
                        updateRooms(documentSnapshot.data().room);
                    } else if (documentSnapshot.data().email2 === auth?.currentUser?.email && documentSnapshot.data().email1 === data.userDTO.username.toLowerCase()) {
                        updateRooms(documentSnapshot.data().room);
                    }
            });

        });
    }, []);

    function generateRoom(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const moveToChat = (email) => {
        if (rooms === null) {
            const newRoom = generateRoom(8);
            room = newRoom;
            db.collection('rooms')
                .add({
                    email1: auth?.currentUser?.email.toLowerCase(),
                    email2: email.toLowerCase(),
                    room: room
                })
                .then(() => {
                    console.log('User added!');
                });
            navigation.navigate("ChatView", {email: email, room: room});
        } else {
            navigation.navigate("ChatView", {email: email, room: rooms});
        }
    }


    function navigateToJobsScreen() {
        navigation.navigate("Jobs")
    }

    return (
        <View>

            <View style={{paddingTop: 50, left: 15, flexDirection: "row"}}>
                <TouchableOpacity onPress={navigateToJobsScreen}>
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
                <View style={styles.container2}>
                    <Text style={{fontSize: 25, left: 95, fontWeight: 'bold'}}>Detalii anunț</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View>
                    <Image
                        source={{uri: data.image1}}
                        resizeMethod='contain'
                        style={styles.avatarImage}/>
                </View>
                <View style={{
                    backgroundColor: 'rgba(30,148,0,0.53)',
                    width: 430,
                    height: 560,
                    top: 300,
                    borderRadius: 10,
                }}>
                    <View style={{backgroundColor: '#077a09', height: 100, borderRadius: 10}}>
                        <Text style={{color: 'white', fontSize: 20, top: 10, left: 10}}>{data.title}</Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight: 'bold',
                            top: 20,
                            left: 10
                        }}>{data.price + ' RON'}</Text>
                    </View>
                    <View style={{
                        backgroundColor: '#077a09',
                        height: 40,
                        borderRadius: 10,
                        top: 10,
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: 'bold',
                            top: 10,
                            left: 10
                        }}>Categorie: </Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                            top: 10,
                            left: 10
                        }}>{data.category} </Text>
                    </View>
                    <View style={{backgroundColor: '#077a09', height: 150, borderRadius: 10, top: 20}}>
                        <Text style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: 'bold',
                            top: 10,
                            left: 10
                        }}>Descriere</Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            top: 15,
                            left: 10,
                            width: 400,
                            fontWeight: "bold"
                        }}>{data.description}</Text>
                    </View>
                    <View style={{backgroundColor: '#077a09', height: 200, borderRadius: 10, top: 30}}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold', top: 10, left: 10}}>Telefon
                                : </Text>
                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', top: 10, left: 10}}>
                                {data.phone}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{
                                color: 'black',
                                fontSize: 15,
                                fontWeight: 'bold',
                                top: 20,
                                left: 10
                            }}>Locatie:</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 15,
                                fontWeight: 'bold',
                                top: 20,
                                left: 10
                            }}> {data.location}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold', top: 30, left: 10}}>Email:
                            </Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 15,
                                fontWeight: 'bold',
                                top: 30,
                                left: 10
                            }}> {data.userDTO.username}</Text>
                        </View>
                    </View>
                    <View style={{bottom: 40}}>
                        <TouchableOpacity onPress={() => navigation.navigate("UserReviews", {data: data})}>
                            <View
                                style={{backgroundColor: '#13ef8b', height: 50, left: 5, width: 200, borderRadius: 5}}>
                                <Text style={{top: 15, left: 45, fontWeight: "bold", fontSize: 15}}>Vezi
                                    recenziile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => moveToChat(data.userDTO.username)}>
                            <View style={{
                                backgroundColor: '#13efc7',
                                height: 50,
                                width: 200,
                                bottom: 50,
                                left: 220,
                                borderRadius: 5
                            }}>
                                <Text style={{top: 15, left: 45, fontWeight: "bold", fontSize: 15}}>Trimite mesaj</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default JobScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    avatarImage: {
        top: 10,
        borderRadius: 10,
        width: 430,
        height: 300
    },

})
