import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, Text, View, Image, TouchableOpacity, ScrollView} from "react-native";
import {auth, db} from '../firebase'


const AccountScreen = ({navigation}) => {

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        db.collection('avatars').doc(auth?.currentUser?.email).get().then(documentSnapshot => {
            if (documentSnapshot.data())
                setAvatar(documentSnapshot.data().url);
        })
    }, [avatar])

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate("Login")
            })
            .catch(error => alert(error.message))
    }

    const navigateToCreateJob = () => {
        navigation.navigate("CreateJob")
    };

    const navigateToActiveJobs = () => {
        navigation.navigate("ActiveJobs")
    }
    const navigateToUploadPhoto = () => {
        navigation.navigate("Upload")
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileImageView}>
                <TouchableOpacity onPress={navigateToUploadPhoto}>
                    {avatar ?
                        <Image
                            source={{uri: avatar}}
                            resizeMethod='contain'
                            style={styles.avatarImage}/>
                        :
                        <Image
                            source={require('/Users/sheep/Desktop/licenta_react/icons/user.png')}
                            resizeMethod='contain'
                            style={styles.profileImage}/>
                    }
                </TouchableOpacity>
                <Text style={{color: '#3bbb07', fontWeight: 'bold'}}>{auth.currentUser?.email}</Text>
                <Text style={{color: '#000000', fontWeight: 'bold'}}>077777777</Text>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
                <TouchableOpacity onPress={navigateToCreateJob}
                                  style={[styles.navigateButton]}>

                    <Text style={{fontWeight: 'bold'}}>Creeaza un anunt</Text>
                </TouchableOpacity>
            </View>

            <View style={{paddingTop: 50}}>
                <TouchableOpacity onPress={navigateToActiveJobs} style={styles.button}>
                    <View style={styles.activeAnnouncement}>
                        <View style={{width: '50%'}}>
                            <Text style={{fontSize: 15}}>Anunturi active</Text>
                        </View>
                        <View style={{width: '50%', alignItems: "flex-end"}}>
                            <Image
                                source={require('/Users/sheep/Desktop/licenta_react/icons/right-arrow.png')}
                                resizeMethod='contain'
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: '#000000',
                                    top: 2
                                }}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{height: 15}}></View>
            <View>
                <TouchableOpacity onPress={() => console.log("hello12")} style={styles.button}>
                    <View style={styles.activeAnnouncement}>
                        <View style={{width: '50%'}}>
                            <Text style={{fontSize: 15}}>Recenzii primite</Text>
                        </View>
                        <View style={{width: '50%', alignItems: "flex-end"}}>
                            <Image
                                source={require('/Users/sheep/Desktop/licenta_react/icons/right-arrow.png')}
                                resizeMethod='contain'
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: '#000000',
                                    top: 2
                                }}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{height: '20%'}}></View>

            <View style={{}}>
                <TouchableOpacity onPress={() => console.log("hello")} style={styles.button}>
                    <View style={styles.accountSettings}>
                        <View style={{width: '50%'}}>
                            <Text style={{fontSize: 15}}>Setari</Text>
                        </View>
                        <View style={{width: '50%', alignItems: "flex-end"}}>
                            <Image
                                source={require('/Users/sheep/Desktop/licenta_react/icons/right-arrow.png')}
                                resizeMethod='contain'
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: '#000000',
                                    top: 2
                                }}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>


            <View style={{height: 15}}></View>

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

export default AccountScreen;

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
        paddingTop: 100
    },
    button: {
        backgroundColor: '#3bbb07',
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
