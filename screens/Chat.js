import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Button, Text, View, Image, TouchableOpacity, LogBox, Pressable, Keyboard} from "react-native";
import {GiftedChat} from "react-native-gifted-chat";
import {auth, db} from '../firebase'
import {useNavigation} from "@react-navigation/native";

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


const Chat = ({route}) => {

    let {email, room} = route.params;
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const [check ,setCheck] = useState(false);




    useEffect(() => {

        const unsubscribe = db.collection(room).orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages((
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
            }))
        )))
        return unsubscribe;

    }, []);



    const navigateToChatScreen = () => {
        navigation.navigate("Chat");

    };


    const onSend = useCallback((messages = []) => {
        console.log(room);
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]
        db.collection(room).add({
            _id,
            createdAt,
            text,
            user
        })
    }, []);

    return (
        <>
            <View style={{top: 50, left: 15, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 18}}>{email}</Text>
            </View>
            <View style={{paddingTop: 30, left: 15}}>
                <TouchableOpacity onPress={navigateToChatScreen}>
                    <View>
                        <Image
                            source={require('/Users/sheep/Desktop/licenta_react/icons/back-arrow.png')}
                            resizeMethod='contain'
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: '#000000',
                                top: 2,
                            }}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 10}}>
            </View>
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={true}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    name: auth?.currentUser?.displayName,
                    avatar: auth?.currentUser?.photoURL
                }}
            />
        </>
    )
}

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    }
})
