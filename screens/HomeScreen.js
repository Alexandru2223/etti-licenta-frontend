import { useNavigation } from '@react-navigation/core'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { auth } from '../firebase'
import RegisterScreen from "./RegisterScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Tabs from "../navigation/tabs";

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
    const navigation = useNavigation()
    const base64 = require('base-64');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };

    const postExample = async () => {
        try {
            await fetch(
                'http://localhost:8080/hello', requestOptions)
                .then(response => {
                    response.text()
                        .then(data => {
                            console.log(data)
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }





    return (
        <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={postExample}>
                    <Text>Click to make a Post request</Text>

                </TouchableOpacity>
            <Text>Email: {auth.currentUser?.email}</Text>
            <Text>Token: {global.token}</Text>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
