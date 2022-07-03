import React, {useEffect, useState} from 'react';
import {auth, db} from "../firebase";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SearchBar} from "react-native-elements";
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const AdminEditUsers = ({navigation, route}) => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    useEffect(() => {
        getUsers().then(r => console.log(r));
    }, [route])

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };
    const getUsers = async (text) => {
        try {
            fetch(
                'http://localhost:8080/users/' + text, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            setUsers(data);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }

    const requestOptionsDelete = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };
    const deleteUser = async (text) => {
        try {
            fetch(
                'http://localhost:8080/users/' + text, requestOptionsDelete)
                .then(response => {
                    response.json()
                        .then(data => {
                            setUsers(data);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }


    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 15,
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                }}
            />
        );
    };

    const navigateToAccountScreen = () => {
        navigation.navigate("Account")
    }

    return (
        <>
            <View style={{paddingTop: 50, left: 15}}>

            </View>
            <View style={{alignItems: 'center'}}>
                <SearchBar
                    containerStyle={{backgroundColor: '#e0e0e0'}}
                    //inputStyle={{backgroundColor: 'white'}}
                    inputContainerStyle={{backgroundColor: 'white'}}
                    platform="ios"
                    round
                    searchIcon={{size: 24}}
                    onChangeText={(text) => setSearch(text)}
                    onClear={(text) => setSearch('')}
                    placeholder="Scrie aici..."
                    onSubmitEditing={() => {
                        getUsers(search)
                    }}
                    value={search}
                />
            </View>
            <View style={{height: 15}}></View>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <FlatList
                        data={users}
                        ItemSeparatorComponent={ItemSeparatorView}
                        keyExtriactor={(time, index) => index.toString()}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => console.log(item)}
                                >
                                    <View>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            backgroundColor: 'white'
                                        }}>
                                            <View style={{backgroundColor: '#ffffff', flex: 0, margin: 5}}>
                                                <Image
                                                    style={{
                                                        width: 100, height: 170, borderRadius: 20,
                                                        overflow: "hidden",
                                                        borderWidth: 1,
                                                        borderColor: "#dadada"
                                                    }}
                                                    source={{uri: item.avatar}}/>

                                            </View>
                                            <View style={{backgroundColor: '#ffffff', flex: 1, margin: 0}}>
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    backgroundColor: 'white'
                                                }}>
                                                    <View style={{flex: 2}}>
                                                        {!!item.username && (
                                                            <Text
                                                                style={{
                                                                    paddingVertical: 10,
                                                                    fontSize: 15,
                                                                    paddingStart: 5,
                                                                    paddingEnd: 16,
                                                                    color: 'green',
                                                                    fontWeight: 'bold',
                                                                }}>
                                                                {item.username}
                                                            </Text>
                                                        )}
                                                    </View>
                                                    <View style={{flex: 1, margin: 12, left: 40, flexDirection: "row"}}>
                                                        <TouchableOpacity
                                                            onPress={() => navigation.navigate("EditUserScreen", {data: item})}
                                                        >
                                                            <Image
                                                                source={require('/Users/sheep/Desktop/licenta_react/icons/editing.png')}
                                                                resizeMethod='contain'
                                                                style={{
                                                                    right: 15,
                                                                    width: 25,
                                                                    height: 25,
                                                                    tintColor: 'blue',
                                                                }}/>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => {deleteUser(item.username);}}
                                                        >
                                                            <Image
                                                                source={require('/Users/sheep/Desktop/licenta_react/icons/trash-can.png')}
                                                                resizeMethod='contain'
                                                                style={{
                                                                    width: 25,
                                                                    height: 25,
                                                                    tintColor: 'red',
                                                                }}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                {!!item.phone && (
                                                    <Text
                                                        style={{
                                                            paddingVertical: 10,
                                                            fontSize: 15,
                                                            paddingStart: 5,
                                                            paddingEnd: 16,
                                                            color: 'black'
                                                        }}>
                                                        Telefon: {item.phone}
                                                    </Text>
                                                )}
                                                {!!item.name && (
                                                    <Text
                                                        style={{
                                                            paddingVertical: 10,
                                                            fontSize: 15,
                                                            paddingStart: 5,
                                                            paddingEnd: 16,
                                                            color: 'black',
                                                            margin: 5
                                                        }}>
                                                        Nume: {item.name}
                                                    </Text>
                                                )}
                                                {!!item.birthdate && (
                                                    <Text
                                                        style={{
                                                            paddingVertical: 10,
                                                            fontSize: 15,
                                                            paddingStart: 5,
                                                            paddingEnd: 16,
                                                            color: 'black',
                                                            margin: 5
                                                        }}>
                                                        Data nasterii: {item.birthdate}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>


                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

export default AdminEditUsers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
})
