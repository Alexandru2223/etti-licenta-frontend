import React, {useEffect, useState} from 'react';
import {Button, Text, View, StyleSheet, TouchableOpacity, Keyboard, FlatList, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {auth, db} from "../firebase";


const ChatScreen = () => {

    const [chats, updateChats] = useState([]);
    const [rooms, updateRooms] = useState([]);
    const [chats1, updateChats1] = useState([{
        email: "",
        room: ""
    }]);
    const [messages, setMessages] = useState({});
    let room = "";
    const [time, setTime] = useState(Date.now());

    const navigation = useNavigation();
    useEffect(() => {
        if (chats.length > 0){
            updateChats([]);
        }
        db.collection('rooms').get().then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data())
                if (documentSnapshot.data().email1 === auth?.currentUser?.email) {
                    updateChats(oldArray => [...oldArray, documentSnapshot.data().email2]);
                    updateRooms(oldArray => [...oldArray, documentSnapshot.data().room]);
                    getLastMessage(documentSnapshot.data().room, documentSnapshot.data().email2);
                } else if (documentSnapshot.data().email2 === auth?.currentUser?.email) {
                    updateChats(oldArray => [...oldArray, documentSnapshot.data().email1]);
                    updateRooms(oldArray => [...oldArray, documentSnapshot.data().room]);
                    getLastMessage(documentSnapshot.data().room, documentSnapshot.data().email2);
                }
            });
        });
    }, []);

    const moveToChat = (email) => {
        console.log("Move to chat")
        for (let i = 0; i < chats.length; i++) {
            if (chats[i] == email) {
                room = rooms[i];
                break;
            }
        }
        navigation.navigate("ChatView", {email: email, room: room});
    }

    const getLastMessage = (item, email) => {
        db.collection(item).orderBy('createdAt', 'desc').limit(1).get().then((querySnapshot) => {
            querySnapshot.forEach(snapshot => {
                let data = snapshot.data();
                setMessages((message) => ({
                    ...message,
                    [email]: data.text + "$" + data.user._id,
                }));
            })
        })
        return 0;
    }

    const check = (item) => {
        for (let messagesKey in messages) {
            let message = messages[messagesKey].split("$");
            if (message[1] == item)
                return true;
        }
        return false;
    }


    return (

        <View style={styles.container}>
            <View
                style={{
                    height: 50,
                }}
            />
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontSize: 30, color: "#3bbb07", fontWeight: "bold"}}> Mesaje</Text>
            </View>
            <View
                style={{
                    height: 15,
                }}
            />
            <FlatList
                data={chats}
                renderItem={({item}) => {
                    return (
                        <View style={{flex: 1}}>
                            <TouchableOpacity onPress={() => moveToChat(item)}>
                                <View style={styles.chat}>
                                    <View style={styles.rowContainer}>
                                        <Image
                                            source={require('/Users/sheep/Desktop/licenta_react/icons/photo.png')}
                                            resizeMethod='contain'
                                            style={{
                                                width: 60,
                                                height: 60,
                                                left: 3,
                                                borderRadius: 30,
                                                margin: 5
                                            }}/>
                                        <View style={styles.email}>
                                            <Text style={{fontSize: 18}}>{item}</Text>
                                            {
                                                check(item) ?
                                                    <Text style={{top: 5, color: 'blue'}}>{messages[item] != undefined ? messages[item].split("$")[0] : 1}</Text>
                                                    :
                                                    <Text style={{top: 5, color: 'blue'}}>Tu: {messages[item] != undefined ? messages[item].split("$")[0] :1}</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    chat: {},
    titleStyle: {
        fontWeight: 'bold'
    },
    rowContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    email: {
        paddingTop: 10,
        left: 10
    }
});
