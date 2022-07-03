import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Image,
    ImageBackground,
    TextInput,
    ScrollView, Platform, Alert
} from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import {Picker} from "@react-native-picker/picker";
import firebase from "firebase";
import {auth, db} from '../firebase'
import storage from "@react-native-firebase/storage";
import * as Progress from 'react-native-progress';
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const CreateJobScreen = ({navigation}) => {

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [imagesURL, setImagesURL] = useState([]);
    const [clicked1, setClicked1] = useState([false]);
    const [clicked2, setClicked2] = useState([false]);
    const [clicked3, setClicked3] = useState([false]);
    const [clicked4, setClicked4] = useState([false]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState();
    const [selectedValue, setSelectedValue] = useState('');
    const [uploading1, setUploading1] = useState(false);
    const [uploading2, setUploading2] = useState(false);
    const [uploading3, setUploading3] = useState(false);
    const [uploading4, setUploading4] = useState(false);
    const [transferred1, setTransferred1] = useState(0);
    const [transferred2, setTransferred2] = useState(0);
    const [transferred3, setTransferred3] = useState(0);
    const [transferred4, setTransferred4] = useState(0);
    const [disabled, setDisabled] = useState(false);


    useEffect(() => {
        uploadImage(1);
    }, [image1])

    useEffect(() => {
        uploadImage(2);
    }, [image2])

    useEffect(() => {
        uploadImage(3);
    }, [image3])

    useEffect(() => {
        uploadImage(4);
    }, [image4])

    const selectFile = (number) => {
        const options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, res => {
            if (res.didCancel) {

            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                switch (number) {
                    case 1:
                        setImage1(res);
                        setClicked1(true);
                        break;
                    case 2:
                        setImage2(res);
                        setClicked2(true)
                        break;
                    case 3:
                        setImage3(res);
                        setClicked3(true)
                        break;
                    case 4:
                        setImage4(res);
                        setClicked4(true)
                        break;
                }

            }
        });
    };

    const deleteImage = (number) => {
        switch (number) {
            case 1:
                setImage1(undefined);
                setClicked1(false)
                break;
            case 2:
                setImage2(undefined);
                setClicked2(false)
                break;
            case 3:
                setImage3(undefined);
                setClicked3(false)
                break;
            case 4:
                setImage4(undefined);
                setClicked4(false)
                break;
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            price: number,
            location: address,
            phone: phone,
            image1: imagesURL[0],
            image2: imagesURL[1],
            image3: imagesURL[2],
            image4: imagesURL[3],
            category: selectedValue
        })
    };

    const createPost = async () => {
        try {
            await fetch(
                'http://localhost:8080/jobs/create/' + auth?.currentUser?.email, requestOptions)
                .then(response => {
                })
        } catch (error) {
            console.error(error);
        }

        Alert.alert(
            'Succes',
            'Anuntul a fost creat'
        );
    }

    const uploadImage = async (k) => {
        if (image1 || image2 || image3 || image4) {
            let uri;
            switch (k) {
                case 1:
                    if (image1) {
                        setUploading1(true);
                        setTransferred1(0);
                        uri = image1.assets[0].uri;
                    }
                    break;
                case 2:
                    if (image2) {
                        setUploading2(true);
                        setTransferred2(0);
                        uri = image2.assets[0].uri;
                    }
                    break;
                case 3:
                    if (image3) {
                        setUploading3(true);
                        setTransferred3(0);
                        uri = image3.assets[0].uri;
                    }
                    break;
                case 4:
                    if (image4) {
                        setUploading4(true);
                        setTransferred4(0);
                        uri = image4.assets[0].uri;
                    }
                    break;
            }
            if (uri) {
                const filename = uri.substring(uri.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                const task = storage()
                    .ref(filename)
                    .putFile(uploadUri);
                switch (k) {
                    case 1:
                        task.on('state_changed', snapshot => {
                            setTransferred1(
                                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
                            );
                        });
                        break;
                    case 2:
                        task.on('state_changed', snapshot => {
                            setTransferred2(
                                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
                            );
                        });
                        break;
                    case 3:
                        task.on('state_changed', snapshot => {
                            setTransferred3(
                                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
                            );
                        });
                        break;
                    case 4:
                        task.on('state_changed', snapshot => {
                            setTransferred4(
                                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
                            );
                        });
                        break;
                }
                try {
                    await task;
                } catch (e) {
                    console.error(e);
                }
                await storage().ref(filename).getDownloadURL().then((url) => {
                    setImagesURL(oldArray => [...oldArray, url]);
                })
            }
        }
    };

    const onChanged = (text) => {
        setNumber(text.replace(/[^0-9]/g, ''));
    }
    const onChangedPhone = (text) => {
        setPhone(text.replace(/[^0-9]/g, ''));
    }

    const disableButton = () => {
        setDisabled(true);
    }

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!title.trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti titlul",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (!selectedValue.trim()) {
            Alert.alert(
                "Atentie",
                "Selectati categoria",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (!description.trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti descrierea",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (!number.toString().trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti pretul",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (!phone.trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti numarul de telefon",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        if (!address.trim()) {
            Alert.alert(
                "Atentie",
                "Introduceti adresa",
                [
                    {
                        text: "Inchide",
                        style: "cancel"
                    },
                ]
            );
            return false;
        }
        createPost();
        return true
    };
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container2}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Creeaza anunt</Text>
            </View>

            <View style={{
                flex: 0,
                flexDirection: 'row',
                backgroundColor: 'white',
                alignContent: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity onPress={() => {
                    selectFile(1)
                }} style={styles.button}>
                    <View style={styles.container1}>
                        {clicked1 === true ?
                            <View>
                                <Image
                                    source={{uri: image1.assets[0].uri.substring(7, image1.assets[0].uri.length)}}
                                    resizeMethod='contain'
                                    style={{
                                        width: 75,
                                        height: 75,
                                        borderRadius: 20
                                    }}>
                                </Image>


                                <TouchableOpacity onPress={() => deleteImage(1)} style={styles.button}>
                                    <Image
                                        source={require('/Users/sheep/Desktop/licenta_react/icons/close.png')}
                                        resizeMethod='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 20,
                                            left: 25,
                                            tintColor: '#3bbb07'
                                        }}/>
                                </TouchableOpacity>
                                {uploading1 ? (
                                    <View style={styles.progressBarContainer}>
                                        <Progress.Bar color={"#3bbb07"} progress={transferred1} width={75}/>
                                    </View>) : null}
                            </View> : <Image
                                source={require('/Users/sheep/Desktop/licenta_react/icons/upload.png')}
                                resizeMethod='contain'
                                style={{
                                    width: 75,
                                    height: 75,
                                    borderRadius: 10,
                                    tintColor: '#3bbb07'
                                }}/>}
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        width: 5,
                    }}
                />
                <TouchableOpacity onPress={() => selectFile(2)} style={styles.button}>
                    <View style={styles.container1}>
                        {clicked2 === true ?
                            <View>
                                <Image
                                    source={{uri: image2.assets[0].uri.substring(7, image2.assets[0].uri.length)}}
                                    resizeMethod='contain'
                                    style={{
                                        width: 75,
                                        height: 75,
                                        borderRadius: 20
                                    }}>
                                </Image>
                                <TouchableOpacity onPress={() => deleteImage(2)} style={styles.button}>
                                    <Image
                                        source={require('/Users/sheep/Desktop/licenta_react/icons/close.png')}
                                        resizeMethod='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 20,
                                            left: 25,
                                            tintColor: '#3bbb07'
                                        }}/>
                                </TouchableOpacity>
                                {uploading2 ? (
                                    <View style={styles.progressBarContainer}>
                                        <Progress.Bar color={"#3bbb07"} progress={transferred2} width={75}/>
                                    </View>) : null}
                            </View> : <Image
                                source={require('/Users/sheep/Desktop/licenta_react/icons/upload.png')}
                                resizeMethod='contain'
                                style={{
                                    width: 75,
                                    height: 75,
                                    borderRadius: 10,
                                    tintColor: '#3bbb07'
                                }}/>}
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        width: 5,
                    }}
                />
                <TouchableOpacity onPress={() => selectFile(3)} style={styles.button}>
                    <View style={styles.container1}>
                        {clicked3 === true ?
                            <View>
                                <Image
                                    source={{uri: image3.assets[0].uri.substring(7, image3.assets[0].uri.length)}}
                                    resizeMethod='contain'
                                    style={{
                                        width: 75,
                                        height: 75,
                                        borderRadius: 20
                                    }}>
                                </Image>
                                <TouchableOpacity onPress={() => deleteImage(3)} style={styles.button}>
                                    <Image
                                        source={require('/Users/sheep/Desktop/licenta_react/icons/close.png')}
                                        resizeMethod='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 20,
                                            left: 25,
                                            tintColor: '#3bbb07'
                                        }}/>
                                </TouchableOpacity>
                                {uploading3 ? (
                                    <View style={styles.progressBarContainer}>
                                        <Progress.Bar color={"#3bbb07"} progress={transferred3} width={75}/>
                                    </View>) : null}
                            </View> : <Image
                                source={require('/Users/sheep/Desktop/licenta_react/icons/upload.png')}
                                resizeMethod='contain'
                                style={{
                                    width: 75,
                                    height: 75,
                                    borderRadius: 10,
                                    tintColor: '#3bbb07'
                                }}/>}
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        width: 5,
                    }}
                />
                <TouchableOpacity onPress={() => selectFile(4)} style={styles.button}>
                    <View style={styles.container1}>
                        {clicked4 === true ?
                            <View>
                                <Image
                                    source={{uri: image4.assets[0].uri.substring(7, image4.assets[0].uri.length)}}
                                    resizeMethod='contain'
                                    style={{
                                        width: 75,
                                        height: 75,
                                        borderRadius: 20
                                    }}>
                                </Image>
                                <TouchableOpacity onPress={() => deleteImage(4)} style={styles.button}>
                                    <Image
                                        source={require('/Users/sheep/Desktop/licenta_react/icons/close.png')}
                                        resizeMethod='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 20,
                                            left: 25,
                                            tintColor: '#3bbb07'
                                        }}/>
                                </TouchableOpacity>
                                {uploading4 ? (
                                    <View style={styles.progressBarContainer}>
                                        <Progress.Bar color={"#3bbb07"} progress={transferred4} width={75}/>
                                    </View>) : null}
                            </View> : <Image
                                source={require('/Users/sheep/Desktop/licenta_react/icons/upload.png')}
                                resizeMethod='contain'
                                style={{
                                    width: 75,
                                    height: 75,
                                    borderRadius: 10,
                                    tintColor: '#3bbb07'
                                }}/>}
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    height: 15,
                }}
            />
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
                    autoCorrect={false}
                    placeholder="Titlu anunt"
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

            <View style={styles.container3}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Categorie anunt:</Text>
            </View>


            <View style={styles.container4}>
                <Picker
                    selectedValue={selectedValue}
                    style={{height: 150, width: '100%'}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="Selectati" value=""/>
                    <Picker.Item label="IT Software" value="it-software"/>
                    <Picker.Item label="IT Hardware" value="it-hardware"/>
                    <Picker.Item label="Cursuri" value="cursuri"/>
                    <Picker.Item label="Servicii Auto - Reparatii" value="auto-reparatii"/>
                    <Picker.Item label="Servicii de curatenie" value="curatenie"/>
                    <Picker.Item label="Servicii Auto - Tractari" value="auto-tractari"/>
                    <Picker.Item label="Reparatii Electronice" value="electronice"/>
                    <Picker.Item label="Contabilitate" value="contabilitate"/>
                    <Picker.Item label="Evenimente" value="evenimente"/>
                    <Picker.Item label="Meseriasi" value="meseriasi"/>
                    <Picker.Item label="Inchirieri - Auto" value="auto-inchirieri"/>
                    <Picker.Item label="Publicitate" value="publicitate"/>
                    <Picker.Item label="Servicii diverse" value="diverse"/>
                </Picker>

                <View
                    style={{
                        height: 15,
                    }}
                />
            </View>

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
                    autoCorrect={false}
                    placeholder="Descriere"
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
                    autoCorrect={false}
                    placeholder="Pret"
                    keyboardType='numeric'
                    style={styles.inputDescriere}
                    onChangeText={text => onChanged(text)}
                    value={number}
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
                    autoCorrect={false}
                    placeholder="Telefon"
                    keyboardType='numeric'
                    style={styles.inputDescriere}
                    onChangeText={text => onChangedPhone(text)}
                    value={phone}
                />
            </View>

            <View
                style={{
                    height: 15,
                }}
            />

            <View style={styles.rowContainer}>
                <Image
                    source={require('/Users/sheep/Desktop/licenta_react/icons/user1.png')}
                    resizeMethod='contain'
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: '#3bbb07',
                        left: 3,
                        margin: 5
                    }}/>
                <TextInput
                    autoCorrect={false}
                    placeholder="Email"
                    style={styles.inputDescriere}
                    value={auth.currentUser?.email}
                    editable={false}
                    selectTextOnFocus={false}
                />
            </View>

            <View
                style={{
                    height: 15,
                }}
            />

            <View style={styles.rowContainer}>
                <Image
                    source={require('/Users/sheep/Desktop/licenta_react/icons/location.png')}
                    resizeMethod='contain'
                    style={{
                        width: 35,
                        height: 35,
                        tintColor: '#3bbb07',
                        left: 3,
                        margin: 5
                    }}/>
                <TextInput
                    autoCorrect={false}
                    placeholder="Adresa"
                    keyboardType='numeric'
                    style={styles.inputDescriere}
                    onChangeText={text => setAddress(text)}
                    value={address}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    checkTextInput();
                    disableButton();

                }}
                                  style={styles.button1}>

                    <Text style={styles.buttonText}>Creeaza</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

export default CreateJobScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingBottom: 60
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
