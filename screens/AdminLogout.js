import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import {auth, db} from '../firebase'
import {useIsFocused} from "@react-navigation/core";
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


const AdminLogout = ({navigation}) => {


    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate("Login")
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>

            <View style={styles.alignSignOutButton}>
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.buttonSignOut}
                >
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>Sign out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AdminLogout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },

    activeAnnouncement: {
        flexDirection: 'row'
    },
    rating: {
        flexDirection: 'row'
    },

    profileImage: {
        width: 100,
        height: 100,
        tintColor: '#3bbb07',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileImageView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    button: {
        backgroundColor: '#3bbb07',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDez: {
        backgroundColor: 'red',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonSignOut: {
        backgroundColor: '#3bbb07',
        width: 150,
        padding: 10,
        borderRadius: 10,

    },
    alignSignOutButton: {
        top: 400,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navigateButton: {
        backgroundColor: '#faf076',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',

    },
    accountSettings: {
        flexDirection: 'row'
    }

})
