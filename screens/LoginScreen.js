import React, {useEffect, useState} from 'react'
import {Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import base64 from "base-64";

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: email,
            password: password
        })
    };

    const getToken = async () => {
        try {
            await fetch(
                'http://localhost:8080/authenticate', requestOptions)
                .then(response => {
                    response.text()
                        .then(data => {
                            global.token = JSON.parse(data).jwttoken;
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.navigate("Tabs")
            }
        })

        return unsubscribe
    }, [])

    const navigateToRegister = () => {
        navigation.navigate("Register")
    };


    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged' + user.email);
            }).catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
            <Image
                source={require('/Users/sheep/Desktop/licenta_react/icons/logo.png')}
                resizeMethod='contain'
                style={{
                    width: 150,
                    height: 150,
                    margin: 50
                }}/>
            <View style={styles.inputContainer}>
                <View style={styles.rowContainer}>
                <Image
                    source={require('/Users/sheep/Desktop/licenta_react/icons/user1.png')}
                    resizeMethod='contain'
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: '#3bbb07',
                        left: 3,
                        margin: 5
                    }}/>
                <TextInput placeholder="Email"
                           value={email}
                           onChangeText={text => setEmail(text)}
                           style={styles.input}

                />
                </View>

                <View
                    style={{
                        height: 15,
                        width: '100%',
                        backgroundColor: '#ffffff',
                    }}
                />

                <View style={styles.rowContainer}>
                    <Image
                        source={require('/Users/sheep/Desktop/licenta_react/icons/padlock.png')}
                        resizeMethod='contain'
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: '#3bbb07',
                            left: 3,
                            margin: 5
                        }}/>
                    <TextInput placeholder="Parola"
                               value={ password}
                               onChangeText={text => setPassword(text)}
                               style={styles.input}
                               secureTextEntry
                    />
                </View>

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={ () => {
                        handleLogin();
                        getToken();
                }}
                                  style={styles.button}>

                    <Text style={styles.buttonText}>Autentificare</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToRegister}
                                  style={[styles.button, styles.buttonOutline]}>

                    <Text style={styles.buttonOutlineText}>Inregistrează-te</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    rowContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 1,
        flexDirection:'row',
        alignItems:'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#3bbb07',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        flex: 2,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#3bbb07',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#3bbb07',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#3bbb07',
        fontWeight: '700',
        fontSize: 16,
    },
})
