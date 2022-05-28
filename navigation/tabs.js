import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import JobsScreen from "../screens/JobsScreen";
import ChatScreen from "../screens/ChatScreen";
import AccountScreen from "../screens/AccountScreen";
import CreateJobScreen from "../screens/CreateJobScreen";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import {Image, Text, View} from "react-native";
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions ={{tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={HomeScreen}  options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image source={require('/Users/sheep/Desktop/licenta_react/icons/home.png')}
                               resizeMethod= 'contain'
                               style={{
                                   width: 25,
                                   height: 25,
                                   tintColor: focused ? '#3bbb07':'#748c94',
                               }}/>

                    </View>
                )
            }}
            />
            <Tab.Screen name="Jobs" component={JobsScreen}
                        options={{
                            headerShown: false,
                            unmountOnBlur: true,
                            tabBarIcon: ({focused}) => (
                                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                    <Image source={require('/Users/sheep/Desktop/licenta_react/icons/search.png')}
                                           resizeMethod= 'contain'
                                           style={{
                                               width: 25,
                                               height: 25,
                                               tintColor: focused ? '#3bbb07':'#748c94',
                                           }}/>

                                </View>
                            )
                        }}
            />
            <Tab.Screen name="CreateJob" component={CreateJobScreen}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => (
                                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                    <Image source={require('/Users/sheep/Desktop/licenta_react/icons/plus.png')}
                                           resizeMethod= 'contain'
                                           style={{
                                               width: 25,
                                               height: 25,
                                               tintColor: focused ? '#3bbb07':'#748c94',
                                           }}/>

                                </View>
                            ),
                            unmountOnBlur: true
                        }}
            />
            <Tab.Screen name="Chat" component={ChatScreen}
                        options={{
                            headerShown: false,
                            unmountOnBlur: true,
                            tabBarIcon: ({focused}) => (
                                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                    <Image source={require('/Users/sheep/Desktop/licenta_react/icons/chat.png')}
                                           resizeMethod= 'contain'
                                           style={{
                                               width: 25,
                                               height: 25,
                                               tintColor: focused ? '#3bbb07':'#748c94',
                                           }}/>

                                </View>
                            )
                        }}
            />
            <Tab.Screen name="Account"  component={AccountScreen}
                        options={{
                            headerShown: false,
                            unmountOnBlur: true,
                            tabBarIcon: ({focused}) => (
                                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                    <Image source={require('/Users/sheep/Desktop/licenta_react/icons/user.png')}
                                           resizeMethod= 'contain'
                                           style={{
                                               width: 25,
                                               height: 25,
                                               tintColor: focused ? '#3bbb07':'#748c94',
                                           }}/>

                                </View>
                            )
                        }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;
