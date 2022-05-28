import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, Text, View, FlatList, Image, TouchableHighlight, TouchableOpacity} from "react-native";
import {SearchBar} from 'react-native-elements';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import Icon from "react-native-vector-icons/RNIMigration";


const JobsScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [currentColor, setCurrentColor] = useState([]);
    const [checkPage, setCheckPage] = useState([]);

    let array = [];



    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log("merge");
        }
    }

    const updateFavourite = (index) => {
        const updatedAreas = [...currentColor];
        if (updatedAreas[index] === "#748c94") {
            updatedAreas[index] = 'red';
        } else {
            updatedAreas[index] = "#748c94";
        }
        setCurrentColor(updatedAreas);
    }


    const getJobs = async (text) => {
        try {
            fetch(
                'http://localhost:8080/jobs/' + text, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            setFilteredDataSource(data)
                            setMasterDataSource(data)
                            setCurrentColor(Array(data.length).fill('#748c94'))
                            console.log(currentColor);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log("Hello");
    }, []);

    /*const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            console.log(search + " " + newData + " " + text);
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };*/

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
                    placeholder="Type Here..."
                    onSubmitEditing={() => {getJobs(search); search === ''? setCheckPage("1") : setCheckPage("2")}}
                    value={search}
                />
                {checkPage == '1' ? <Text>TEST1</Text>:<Text>TEST2</Text>}
                <FlatList
                    data={filteredDataSource}
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
                                                    width: 100, height: 100, borderRadius: 100 / 2,
                                                    overflow: "hidden",
                                                    borderWidth: 1,
                                                    borderColor: "#dadada"
                                                }}
                                                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/licenta-7fd41.appspot.com/o/IDARY.png?alt=media&token=814346ec-242c-4cfa-bb74-b57bdf0ea17d'}}/>

                                        </View>
                                        <View style={{backgroundColor: '#ffffff', flex: 1, margin: 0}}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                backgroundColor: 'white'
                                            }}>
                                                <View style={{flex: 2}}>
                                                    {!!item.title && (
                                                        <Text
                                                            style={{
                                                                paddingVertical: 10,
                                                                fontSize: 25,
                                                                paddingStart: 5,
                                                                paddingEnd: 16,
                                                                color: 'green',
                                                                fontWeight: 'bold',
                                                            }}>
                                                            {item.title}
                                                        </Text>
                                                    )}
                                                </View>
                                                <View style={{flex: 1, margin: 12, left: 50}}>
                                                    <TouchableOpacity
                                                        onPress={() => updateFavourite(item.id)}
                                                    >
                                                        <Image
                                                            source={require('/Users/sheep/Desktop/licenta_react/icons/heart.png')}
                                                            resizeMethod='contain'
                                                            style={{
                                                                width: 25,
                                                                height: 25,
                                                                tintColor: currentColor[item.id],
                                                            }}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            {!!item.description && (
                                                <Text
                                                    style={{
                                                        paddingVertical: 10,
                                                        fontSize: 15,
                                                        paddingStart: 5,
                                                        paddingEnd: 16,
                                                        color: 'black'
                                                    }}>
                                                    {item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    {!!item.price && (
                                        <Text
                                            style={{
                                                paddingVertical: 10,
                                                fontSize: 15,
                                                paddingStart: 5,
                                                paddingEnd: 16,
                                                color: 'black',
                                                margin: 5
                                            }}>
                                            Pret: {item.price} RON
                                        </Text>
                                    )}

                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default JobsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
})
