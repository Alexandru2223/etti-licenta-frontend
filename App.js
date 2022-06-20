/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Keyboard,
    StyleSheet,
} from 'react-native';

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Tabs from './navigation/tabs'
import TabsScreen from "./screens/TabsScreen";
import Chat from "./screens/Chat";
import ChatScreen from "./screens/ChatScreen";
import UploadAvatar from "./screens/UploadAvatar";
import ActiveJobs from "./screens/ActiveJobs";
import JobScreen from "./screens/JobScreen";
import EditJobScreen from "./screens/EditJobScreen";
import ReviewsScreen from "./screens/ReviewsScreen";
import ReceivedReviewsScreen from "./screens/ReceivedReviewsScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import EditUserScreen from "./screens/EditUserScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
          <Stack.Screen options={{headerShown: false}} name="Tabs" component={TabsScreen} />
          <Stack.Screen options={{headerShown: false}} name="ChatView" component={Chat} />
          <Stack.Screen options={{headerShown: false}} name="Upload" component={UploadAvatar} />
          <Stack.Screen options={{headerShown: false}} name="ActiveJobs" component={ActiveJobs} />
          <Stack.Screen options={{headerShown: false}} name="JobScreen" component={JobScreen} />
          <Stack.Screen options={{headerShown: false}} name="EditJobScreen" component={EditJobScreen} />
          <Stack.Screen options={{headerShown: false}} name="ReviewsScreen" component={ReviewsScreen} />
          <Stack.Screen options={{headerShown: false}} name="ReceivedReviewsScreen" component={ReceivedReviewsScreen} />
          <Stack.Screen options={{headerShown: false}} name="FavoritesScreen" component={FavoritesScreen} />
          <Stack.Screen options={{headerShown: false}} name="EditUserScreen" component={EditUserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
