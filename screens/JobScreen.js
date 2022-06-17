import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import {auth, db} from '../firebase'


const AccountScreen = ({navigation, route}) => {
    const {data} = route.params;

    /*const [data, setData] = useState([])

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };

    const getJob = async (id) => {
        try {
            fetch(
                'http://localhost:8080/jobs/id/' + id, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            setData(data);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    };*/


    function navigateToJobsScreen() {
        navigation.navigate("Jobs")
    }

    return (
        <View>

            <View style={{paddingTop: 50, left: 15, flexDirection: "row"}}>
                <TouchableOpacity onPress={navigateToJobsScreen}>
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
                <View style={styles.container2}>
                    <Text style={{fontSize: 25, left: 95, fontWeight: 'bold'}}>Detalii anunț</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View>
                    <Image
                        source={{uri: data.image1}}
                        resizeMethod='contain'
                        style={styles.avatarImage}/>
                </View>
                <View style={{
                    backgroundColor: 'rgba(30,148,0,0.53)',
                    width: 430,
                    height: 560,
                    top: 300,
                    borderRadius: 10,
                }}>
                    <View style={{backgroundColor: '#077a09', height: 100, borderRadius: 10}}>
                        <Text style={{color: 'white', fontSize: 20, top: 10, left: 10}}>{data.title}</Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 25,
                            fontWeight: 'bold',
                            top: 20,
                            left: 10
                        }}>{data.price + ' RON'}</Text>
                    </View>
                    <View style={{backgroundColor: '#077a09', height: 40, borderRadius: 10, top: 10, flexDirection: "row"}}>
                        <Text style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: 'bold',
                            top: 10,
                            left: 10
                        }}>Categorie: </Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                            top: 10,
                            left: 10
                        }}>{data.category} </Text>
                    </View>
                    <View style={{backgroundColor: '#077a09', height: 150, borderRadius: 10, top: 20}}>
                        <Text style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: 'bold',
                            top: 10,
                            left: 10
                        }}>Descriere</Text>
                        <Text style={{color: 'white', fontSize: 15, top: 15, left: 10, width: 400, fontWeight: "bold"}}>{data.description}</Text>
                    </View>
                    <View style={{backgroundColor: '#077a09', height: 200, borderRadius: 10, top: 30}}>
                        <View style={{flexDirection: "row"}}>
                        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold', top: 10, left: 10}}>Telefon
                            : </Text>
                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', top: 10, left: 10}}>
                                {data.phone}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold', top: 20, left: 10}}>Locatie:</Text>
                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', top: 20, left: 10}}> {data.location}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold', top: 30, left: 10}}>Email:
                        </Text>
                            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold', top: 30, left: 10}}> {data.userDTO.username}</Text>
                        </View>
                    </View>
                    <View style={{bottom: 40}}>
                        <TouchableOpacity onPress={() => console.log(data.userDTO.username)}>
                            <View style={{backgroundColor: '#13ef8b', height: 50, left: 5, width: 200, borderRadius: 5}}>
                                <Text style={{top: 15, left: 45, fontWeight: "bold", fontSize: 15}}>Vezi recenziile</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log(data.userDTO.username)}>
                            <View style={{backgroundColor: '#13efc7', height: 50, width: 200, bottom: 50, left: 220, borderRadius: 5}}>
                                <Text style={{top: 15, left: 45, fontWeight: "bold", fontSize: 15}}>Trimite mesaj</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    avatarImage: {
        top: 10,
        borderRadius: 10,
        width: 430,
        height: 300
    },

})
