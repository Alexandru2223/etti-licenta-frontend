import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Button,
    Text,
    View,
    FlatList,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Modal, TextInput, Alert
} from "react-native";
import {SearchBar} from 'react-native-elements';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import Icon from "react-native-vector-icons/RNIMigration";
import firebase from "firebase";
import {auth, db} from '../firebase'
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


const AdminEditJobs = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");

    let array = [];
    //let currentColor = [];

    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };

    const requestOptionsDelete = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };

    const deleteJobs = async (text) => {
        try {
            fetch(
                'http://localhost:8080/jobs/delete/' + text, requestOptionsDelete)
                .then(response => {
                    response.json()
                        .then(data => {
                            setData(data);
                        });
                })
            Alert.alert(
                'Succes',
                'Anuntul a fost sters'
            );

            getJobsById(text);
        } catch (error) {
            console.error(error);
        }
    }
    const getJobsById = async (text) => {
        try {
            fetch(
                'http://localhost:8080/jobs/id/' + text, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            console.log(data);

                            setData(data);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <SearchBar
                    //containerStyle={{backgroundColor: 'white'}}
                    //inputStyle={{backgroundColor: 'white'}}
                    //inputContainerStyle={{backgroundColor: 'white'}}
                    platform="ios"
                    round
                    searchIcon={{size: 24}}
                    onChangeText={(text) => setSearch(text)}
                    onClear={(text) => setSearch('')}
                    placeholder="Caută în funcție de id-ul anuntului"
                    onSubmitEditing={() => {
                        getJobsById(search);
                        setValue(search);
                    }}
                    value={search}
                />
                <Modal animationType="slide"
                       transparent visible={isModalVisible}
                       presentationStyle="overFullScreen"
                       onDismiss={() => {deleteJobs(data.id); setInputValue('')}}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <TextInput placeholder="Introduceti motivul..."
                                       value={inputValue} style={styles.textInput}
                                       onChangeText={(value) => setInputValue(value)} />

                            {/** This button is responsible to close the modal */}
                            <Button title="Trimite" onPress={()=> {setModalVisible(false)}} />
                        </View>
                    </View>
                </Modal>
                {data?.id ?
                        <View>
                            <View style={{
                                flex: 1,
                                backgroundColor: 'white'
                            }}>
                                <View style={{backgroundColor: '#ffffff', flex: 0, margin: 5}}>
                                    <Image
                                        style={{
                                            width: '100%', height: 300, borderRadius: 100 / 2,
                                            overflow: "hidden",
                                            borderWidth: 1,
                                            borderColor: "#dadada"
                                        }}
                                        source={{uri: data.image1}}/>

                                </View>
                                <View style={{backgroundColor: '#ffffff', flex: 1, margin: 0}}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        backgroundColor: 'white'
                                    }}>
                                        <View style={{flex: 2}}>
                                            {!!data.title && (
                                                <Text
                                                    style={{
                                                        fontSize: 25,
                                                        color: 'green',
                                                        fontWeight: 'bold',
                                                        top: 300,
                                                        left: 5,
                                                        height: 50
                                                    }}>
                                                    Anunt:
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={{height: 10}}></View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        backgroundColor: 'white'
                                    }}>
                                        <View style={{flex: 2}}>
                                            {!!data.title && (
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                        top: 330,
                                                        left: 5,
                                                        height: 50
                                                    }}>
                                                    Titlu: {data.title}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    {!!data.description && (
                                        <Text
                                            style={{
                                                paddingVertical: 10,
                                                fontSize: 15,
                                                top: 345,
                                                fontWeight: 'bold',
                                                height: 300,
                                                paddingStart: 5,
                                                paddingEnd: 16,
                                                color: 'black'
                                            }}>
                                            Descriere: {data.description.length > 50 ? data.description.substring(0, 50) + '...' : data.description}
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <View style={{height: 10}}></View>
                            <View style={{top: 390, left: 5}}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: 'black',
                                    }}>
                                    ID: {data.id}
                                </Text>
                                <View style={{height: 10}}></View>
                                {!!data.price && (
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            color: 'black',
                                            fontWeight: 'bold',
                                        }}>
                                        Pret: {data.price} RON
                                    </Text>
                                )}
                                <View style={{height: 10}}></View>
                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: 'blue',
                                    }}>
                                    Utilizator:
                                </Text>
                                <View style={{height: 15}}></View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: 'black',
                                    }}>
                                    Email: {data.userDTO.username}
                                </Text>
                                <View style={{height: 10}}></View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: 'black',
                                    }}>
                                    Nume: {data.userDTO.name}
                                </Text>
                                <View style={{height: 10}}></View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: 'black',
                                    }}>
                                    Telefon: {data.userDTO.phone}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={toggleModalVisibility}
                                              style={styles.button}>

                                <Text style={styles.buttonText}>Sterge anunt</Text>
                            </TouchableOpacity>
                        </View>
                    : <></>}

            </View>
        </SafeAreaView>
    )
}

export default AdminEditJobs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
    button: {
        backgroundColor: 'red',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        top:450
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
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(400 * 0.4) },
            { translateY: -90 }],
        height: 130,
        width: 400 * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    }
})
