import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, Text, View, FlatList, Image, TouchableHighlight, TouchableOpacity} from "react-native";
import {SearchBar} from 'react-native-elements';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import Icon from "react-native-vector-icons/RNIMigration";
import firebase from "firebase";
import {auth, db} from '../firebase'


const JobsScreen = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [currentColor, setCurrentColor] = useState([]);
    const [checkPage, setCheckPage] = useState([]);
    const [priceClick, setPriceClick] = useState(false);
    const [abcClick, setAbcClick] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [data, setData] = useState([]);

    let array = [];
    //let currentColor = [];

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };

    const requestOptionsPost = {
        method: 'POST',
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
                            setFilteredDataSource(data);
                            setMasterDataSource(data);
                            setData(data);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }

    const addToFavourites = async (idJob) => {
        try {
            fetch(
                'http://localhost:8080/favourites/add?idJob=' + idJob + '&user=' + auth?.currentUser?.email, requestOptionsPost)
                .then(response => {
                    response.json()
                        .then(data => {
                        });
                })
        } catch (error) {
            console.error(error);
        }

        const arr = [...currentColor];
        arr[idJob] = 'red';
        setCurrentColor(arr);
    }

    const deleteFromFavorites = async (idJob) => {
        try {
            fetch(
                'http://localhost:8080/favorites/delete?idJob=' + idJob + '&user=' + auth?.currentUser?.email, requestOptionsDelete)
                .then(response => {
                    response.json()
                        .then(data => {
                        });
                })
        } catch (error) {
            console.error(error);
        }

        const arr = [...currentColor];
        arr[idJob] = undefined;
        setCurrentColor(arr);
    }

    const getFavoritesForUser = async () => {
        try {
            fetch(
                'http://localhost:8080/favorites/' + auth?.currentUser?.email, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            setFavorites(data);
                        });
                })
        } catch (error) {
            console.error(error);
        }
    }

    const getJobsSorted = async (value) => {
        try {
            fetch(
                'http://localhost:8080/jobs/sort/' + value, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            setFilteredDataSource(data)
                            setMasterDataSource(data)
                        });
                })

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        //console.log(data);
        favorites.forEach(f => {
            const find = data.find(d => d.id === f.jobId);
            if(find.id) {
                currentColor[find.id] = "red";
            }
        });
        /*data.forEach(d => {
            console.log('data ' + d.id);
            favorites.forEach(favorite => {
                console.log('favorite ' + favorite.jobId)
                if (favorite.jobId === d.id) {
                    currentColor[favorite.jobId] = "red";
                } else {
                    currentColor[favorite.jobId] = "green";
                }
            });
        })*/
        console.log(currentColor);
    }, [data, favorites]);

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
                    placeholder="Scrie aici..."
                    onSubmitEditing={() => {
                        getJobs(search);
                        getFavoritesForUser();
                        search === '' ? setCheckPage("1") : setCheckPage("2")
                    }}
                    value={search}
                />
                <View style={{flexDirection: "row"}}>
                    {priceClick === false ?
                        <TouchableOpacity style={{left: 80}} onPress={() => {
                            getJobsSorted('priceasc');
                            setPriceClick(true);
                        }}>
                            <View style={{
                                backgroundColor: 'white',
                                borderColor: "green",
                                borderWidth: 1,
                                height: 30,
                                width: 75,
                                borderRadius: 5
                            }}>
                                <Text style={{color: "green", left: 9, top: 6, fontWeight: "bold"}}>Preț Asc</Text>
                            </View>
                        </TouchableOpacity> : <TouchableOpacity style={{left: 80}} onPress={() => {
                            getJobsSorted('pricedesc');
                            setPriceClick(false);
                        }}>
                            <View style={{
                                backgroundColor: 'white',
                                borderColor: "green",
                                borderWidth: 1,
                                height: 30,
                                width: 75,
                                borderRadius: 5
                            }}>
                                <Text style={{color: "green", left: 4, top: 6, fontWeight: "bold"}}>Preț Desc</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {abcClick === false ? <TouchableOpacity style={{left: 90}} onPress={() => {
                        getJobsSorted('abcasc');
                        setAbcClick(true);
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: "green",
                            borderWidth: 1,
                            height: 30,
                            width: 75,
                            borderRadius: 5
                        }}>
                            <Text style={{color: "green", left: 9, top: 6, fontWeight: "bold"}}>A-Z Asc</Text>
                        </View>
                    </TouchableOpacity> : <TouchableOpacity style={{left: 90}} onPress={() => {
                        getJobsSorted('abcdesc');
                        setAbcClick(false);
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: "green",
                            borderWidth: 1,
                            height: 30,
                            width: 75,
                            borderRadius: 5
                        }}>
                            <Text style={{color: "green", left: 4, top: 6, fontWeight: "bold"}}>A-Z Desc</Text>
                        </View>
                    </TouchableOpacity>}
                    <TouchableOpacity style={{left: 100}} onPress={() => {
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: "green",
                            borderWidth: 1,
                            height: 30,
                            width: 75,
                            borderRadius: 5
                        }}>
                            <Text style={{color: "green", left: 7, top: 6, fontWeight: "bold"}}>Recenzii</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredDataSource}
                    ItemSeparatorComponent={ItemSeparatorView}
                    keyExtriactor={(time, index) => index.toString()}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("JobScreen", {data: item})}
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
                                                source={{uri: item.image1}}/>

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
                                                        onPress={() => {
                                                            if (currentColor[item.id] === "red") {
                                                                deleteFromFavorites(item.id);
                                                            } else {
                                                                addToFavourites(item.id);
                                                            }

                                                        }}
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
