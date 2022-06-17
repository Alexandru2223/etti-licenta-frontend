import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert} from "react-native";
import {auth, db} from '../firebase'
import {Picker} from "@react-native-picker/picker";


const EditJobScreen = ({navigation, route}) => {
    const {data} = route.params;
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [price, setPrice] = useState(data.price);
    const [phone, setPhone] = useState(data.phone);

    function navigateToJobsScreen() {
        navigation.navigate("Jobs")
    }
    const navigateToAccountScreen = () => {
        navigation.navigate("ActiveJobs", {'paramPropKey': 'paramPropValue'})
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            phone: phone
        })
    };
    const update = async () => {
        try {
            await fetch(
                'http://localhost:8080/jobs/update/' + auth?.currentUser?.email + '/' + data.id, requestOptions)
                .then(response => {
                })
        } catch (error) {
            console.error(error);
        }

        Alert.alert(
            'Succes',
            'Anuntul a fost editat'
        );
    }

    return (

        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={{paddingTop: 40, left: 15}}>
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
            <View style={styles.container2}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Editează anunt</Text>
            </View>

            <View style={styles.rowContainer}>
                <Image
                    source={require('/Users/sheep/Desktop/licenta_react/icons/top.png')}
                    resizeMethod='contain'
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: '#3bbb07',
                        left: 3,
                        margin: 5
                    }}/>
                <TextInput
                    placeholder= {data.title}
                    style={styles.input}
                    onChangeText={text => setTitle(text)}
                    maxLength={25}
                />
            </View>

            <View
                style={{
                    height: 15,
                }}
            />


            <View style={styles.rowContainer}>
                <Image
                    source={require('/Users/sheep/Desktop/licenta_react/icons/description.png')}
                    resizeMethod='contain'
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: '#3bbb07',
                        left: 3,
                        margin: 5
                    }}/>
                <TextInput
                    placeholder= {data.description}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={250}
                    style={styles.inputDescriere}
                    onChangeText={text => setDescription(text)}
                />
            </View>

            <View
                style={{
                    height: 15,
                }}
            />

            <View style={styles.rowContainer}>
                <Image
                    source={require('/Users/sheep/Desktop/licenta_react/icons/money.png')}
                    resizeMethod='contain'
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: '#3bbb07',
                        left: 3,
                        margin: 5
                    }}/>
                <TextInput
                    placeholder={data.price.toString()}
                    keyboardType='numeric'
                    style={styles.inputDescriere}
                    onChangeText={text => setPrice(text)}
                    value={price}
                />
            </View>

            <View
                style={{
                    height: 15,
                }}
            />
            <View style={styles.container3}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Contact:</Text>
            </View>

            <View
                style={{
                    height: 15,
                }}
            />

            <View style={styles.rowContainer}>
                <Image
                    source={require('/Users/sheep/Desktop/licenta_react/icons/phone.png')}
                    resizeMethod='contain'
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: '#3bbb07',
                        left: 3,
                        margin: 5
                    }}/>
                <TextInput
                    placeholder= {data.phone}
                    keyboardType='numeric'
                    style={styles.inputDescriere}
                    onChangeText={text => setPhone(text)}

                />
            </View>

            <View
                style={{
                    height: 15,
                }}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    update();
                }}
                                  style={styles.button1}>

                    <Text style={styles.buttonText}>Editează</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default EditJobScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingBottom: 10
    },
    container1: {},
    container2: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    container3: {},
    container4: {
        flex: 0.6,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    },
    rowContainer: {
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#3bbb07',
    },
    input: {
        backgroundColor: 'white',
        fontSize: 20,
        padding: 10
    },
    inputDescriere: {
        backgroundColor: 'white',
        fontSize: 15,
        padding: 10,

    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button1: {
        backgroundColor: '#3bbb07',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    progressBarContainer: {
        marginTop: 10
    }
});
