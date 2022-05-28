import React, {useEffect, useState} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert,
    Image
} from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {useNavigation} from "@react-navigation/native";
import {auth, db} from "../firebase";

export default function UploadAvatar() {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const navigation = useNavigation();
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        getAvatarPhoto();

    })

    const selectImage = () => {
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response);
                setImage(response);
            }
        });
    };
    const uploadImage = async () => {
        const uri = image.assets[0].uri;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        const task = storage()
            .ref(filename)
            .putFile(uploadUri);
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        await storage().ref(filename).getDownloadURL().then((url) => {
            db
                .collection('avatars')
                .doc(auth?.currentUser?.email)
                .set({
                    url: url,
                })
                .then(() => {
                    console.log('Avatar added!');
                });
        })
        setUploading(false);
        Alert.alert(
            'Succes',
            'Imaginea avatarului a fost schimbata !'
        );
        setImage(null);
    };

    const deleteAvatar = () => {
        db.collection('avatars')
            .doc(auth?.currentUser?.email)
            .delete()
            .then(() => {
                Alert.alert(
                    'Succes',
                    'Avatarul a fost sters.'
                );
            });

        setAvatar(null);
    }

    const getAvatarPhoto = () => {
        db.collection('avatars').doc(auth?.currentUser?.email).get().then(documentSnapshot => {
            if (documentSnapshot.data())
                setAvatar(documentSnapshot.data().url);
        })
    }

    function navigateToChatScreen() {
        navigation.navigate("Account")
    }

    return (
        <>
            <View style={{paddingTop: 50, left: 15}}>
                <TouchableOpacity onPress={navigateToChatScreen}>
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
            <View style={{height: 15}}></View>
            <SafeAreaView style={styles.container}>

                <View style={{height: 15}}/>
                <Text style={{fontWeight: "bold", fontSize: 22, color: "#3bbb07"}}>Apasati pe imagine pentru a
                    selecta</Text>
                <View style={{height: 40}}/>
                <TouchableOpacity onPress={selectImage}>
                    {avatar ?
                        image !== null ? (
                            <Image source={{uri: image.assets[0].uri}} style={styles.imageBox}/>
                        ) : <Image
                            source={{uri: avatar}}
                            resizeMethod='contain'
                            style={styles.avatarImage}/>

                        : <View style={{alignItems: "center"}}>
                            {image !== null ? (
                                    <Image source={{uri: image.assets[0].uri}} style={styles.imageBox}/>
                                ) :
                                <View>

                                    <Image
                                        source={require('/Users/sheep/Desktop/licenta_react/icons/user.png')}
                                        resizeMethod='contain'
                                        style={styles.profileImage}/>
                                </View>
                            }
                        </View>
                    }
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    {uploading ? (
                        <View style={styles.progressBarContainer}>
                            <Progress.Bar progress={transferred} width={300}/>
                        </View>
                    ) : (
                        <View>
                            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                                <Text style={styles.buttonText}>Seteaza ca avatar</Text>
                            </TouchableOpacity>
                            {avatar?
                                <TouchableOpacity style={styles.deleteButton} onPress={deleteAvatar}>
                                    <Text style={styles.buttonText}>Sterge avatarul</Text>
                                </TouchableOpacity> : null
                            }

                        </View>
                    )}
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    selectButton: {
        borderRadius: 5,
        width: 200,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        borderRadius: 10,
        width: 200,
        height: 50,
        backgroundColor: '#3bbb07',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    deleteButton: {
        borderRadius: 10,
        width: 200,
        height: 50,
        backgroundColor: '#ce0808',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    },
    progressBarContainer: {
        marginTop: 20
    },
    imageBox: {
        width: 400,
        height: 400,
        borderRadius: 50
    },
    profileImage: {
        width: 200,
        height: 200,
        tintColor: '#3bbb07',
    },
    avatarImage: {
        width: 400,
        height: 400,
        borderRadius: 50
    },
});
