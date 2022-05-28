import React, {Component, useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
    Image,
    DatePickerIOS,
    Modal
} from "react-native";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import Switch from "react-native/Libraries/Components/Switch/Switch";
import {Checkbox} from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";


const RegisterScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [chosenDate, setChosenDate] = useState(new Date(1950,1,1));
    const [modalVisible, setModalVisible] = useState(false);

    const isDarkMode = useColorScheme() === 'dark'; // default is 'light'

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate("Login")
    };

    const setDate = (event, date) => {
        setChosenDate(date);

    };

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: email,
            password: password
        })
    };

    const postExample = async () => {
        try {
            await fetch(
                'http://localhost:8080/register', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!firstName.trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti numele",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (!lastName.trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti prenumele",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (getAge(chosenDate) < 16){
            Alert.alert(
                "Atentie",
                "Trebuie sa ai minim 16 ani",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (!email.trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti email-ul",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (!password.trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti parola",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        return true
    };

    function getAge(date) {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            }).catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('/Users/sheep/Desktop/licenta_react/icons/logo.png')}
                resizeMethod='contain'
                style={{
                    width: 100,
                    height: 100,
                    margin: 10
                }}/>
            <View style={styles.group}>


                <View style={styles.rowContainer}>
                    <Image
                        source={require('/Users/sheep/Desktop/licenta_react/icons/name.png')}
                        resizeMethod='contain'
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: '#3bbb07',
                            left: 3,
                            margin: 5
                        }}/>
                    <TextInput
                        placeholder="Prenume"
                        style={styles.input}
                        onChangeText={text => setFirstName(text)}
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
                        source={require('/Users/sheep/Desktop/licenta_react/icons/name.png')}
                        resizeMethod='contain'
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: '#3bbb07',
                            left: 3,
                            margin: 5
                        }}/>
                    <TextInput
                        placeholder="Nume"
                        style={styles.input}
                        onChangeText={text => setLastName(text)}
                    />
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                            <View style={[isDarkMode ? styles.modalViewDark:styles.modalViewLight]}>
                                <RNDateTimePicker
                                    style={{ backgroundColor: isDarkMode ? '#000000' : '#fff' }}
                                    display="inline"
                                    value={chosenDate}
                                    onChange={setDate}
                                    mode = 'date'
                                />
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Gata</Text>
                                </TouchableOpacity>
                            </View>
                    </Modal>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>Data nașterii: {chosenDate.toISOString().split('T')[0]} </Text>

                    </TouchableOpacity>
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
                        source={require('/Users/sheep/Desktop/licenta_react/icons/email.png')}
                        resizeMethod='contain'
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: '#3bbb07',
                            left: 3,
                            margin: 5
                        }}/>
                    <TextInput
                        placeholder="Email"
                        inlineImagePadding={0}
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
                    <TextInput
                        placeholder="Parola"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
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

                <View style={styles.switchContainer}>
                    <Text>Companie </Text>
                    <View style={{flex: 1}}>
                        <Switch
                            trackColor={{false: "#767577", true: "#3bbb07"}}
                            thumbColor={isEnabled ? "#767577" : "#3bbb07"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                <View
                    style={{
                        height: 15,
                        width: '100%',
                        backgroundColor: '#ffffff',
                    }}
                />
            </View>
            {isEnabled === true ?


                <View style={styles.group}>
                    <View style={styles.rowContainer}>
                        <Image
                            source={require('/Users/sheep/Desktop/licenta_react/icons/business.png')}
                            resizeMethod='contain'
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: '#3bbb07',
                                left: 3,
                                margin: 5
                            }}/>
                        <TextInput
                            placeholder="Nume Companie"
                            style={styles.input}
                            onChangeText={text => setLastName(text)}
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
                            source={require('/Users/sheep/Desktop/licenta_react/icons/file.png')}
                            resizeMethod='contain'
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: '#3bbb07',
                                left: 3,
                                margin: 5
                            }}/>
                        <TextInput
                            placeholder="CUI"
                            style={styles.input}
                            onChangeText={text => setLastName(text)}
                        />
                    </View>
                </View>

                : <View></View>

            }

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    if (checkTextInput()) {
                        handleSignUp();
                        postExample();
                    }
                }}
                                  style={styles.button}>

                    <Text style={styles.buttonText}>Înregistrare</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToLogin}
                                  style={[styles.button, styles.buttonOutline]}>

                    <Text style={styles.buttonOutlineText}>Anulează</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    group: {
        width: '80%'
    },
    rowContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#3bbb07',
    },
    switchContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '50%',
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
    input: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalViewDark: {
        marginTop: 220,
        margin: 40,
        backgroundColor: "#000000",
        borderRadius: 20,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalViewLight: {
        marginTop: 220,
        margin: 40,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#3bbb07",
    },
    buttonClose: {
        backgroundColor: "#3bbb07",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    warningStyle: {
        color: "red",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default RegisterScreen;

/*
<View style={styles.switchContainer}>
                    <Text>Prestati servicii ?</Text>
                    <View style={{flex: 1}}>
                        <View style={{
                            width: 38,
                            height: 38,
                            borderWidth: 1,
                            borderColor: '#3bbb07',
                            borderRadius: 19,
                            left: 10
                        }}>
                            <Checkbox
                                color="#3bbb07"
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                        </View>
                    </View>
                </View>
 */
