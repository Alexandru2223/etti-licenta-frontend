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


const GdprScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");


    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Modal animationType="slide"
                       transparent visible={isModalVisible}
                       presentationStyle="overFullScreen"
                       onDismiss={() => {setInputValue('')}}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <Text>Salutare</Text>

                            {/** This button is responsible to close the modal */}
                            <Button title="Trimite" onPress={()=> {setModalVisible(false)}} />
                        </View>
                    </View>
                </Modal>

                        <TouchableOpacity onPress={toggleModalVisibility}
                                          style={styles.button}>

                            <Text style={styles.buttonText}>Ok</Text>
                        </TouchableOpacity>
                    : <></>}

            </View>
        </SafeAreaView>
    )
}

export default GdprScreen;

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
