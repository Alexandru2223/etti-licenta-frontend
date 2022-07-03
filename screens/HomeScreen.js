import {useIsFocused, useNavigation} from '@react-navigation/core'
import React, {useEffect, useState} from 'react'
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {auth} from '../firebase'
import RegisterScreen from "./RegisterScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Tabs from "../navigation/tabs";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
    const navigation = useNavigation()
    const base64 = require('base-64');


    const [count, setCount] = useState();

    let [number, updateNumber] = useState([]);
    let [date, updateDate] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getCountJobs()
        }
    }, [isFocused])

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + global.token,
            'Content-Type': 'application/json'
        },
    };


    const getCountJobs = async () => {
        try {
            await fetch(
                'http://localhost:8080/jobs/count', requestOptions)
                .then(response => {
                    response.text()
                        .then(data => {
                            var data1 = JSON.parse(data);
                            for (let key in data1) {
                                updateNumber(oldArray => [...oldArray, data1[key].number]);
                                updateDate(oldArray => [...oldArray, data1[key].date]);
                            }

                        });
                })
        } catch (error) {
            console.error(error);
        }
    }


    /*labels: [count[0].date, count[1].date, count[2].date, count[3].date, count[4].date, count[5].date, count[6].date, count[7].date],
        datasets: [
        {
            data: [
                count[0].number,
                count[1].number,
                count[2].number,
                count[3].number,
                count[4].number,
                count[5].number,
                count[6].number
            ]
        }
    ]*/


    return (
        <>
            <View style={{top: 190}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Anunțuri adăugate saptămâna aceasta</Text>
            </View>
            <View style={{top: 200}}>
                <LineChart
                    data={{
                        labels: [
                            'L',
                            'M',
                            'Mi',
                            'J',
                            'V',
                            'S',
                            'D',
                        ],
                        datasets: [
                            {
                                data: [
                                    number[0] ?number[0] : 0,
                                    number[1] ?number[1] : 0,
                                    number[2] ?number[2] : 0,
                                    number[3] ?number[3] : 0,
                                    number[4] ?number[4] : 0,
                                    number[5] ?number[5] : 0,
                                    number[6] ?number[6] : 0,
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#199606",
                        backgroundGradientFrom: "#00940d",
                        backgroundGradientTo: "#38750b",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#0efa06"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        </>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
