import React from 'react';
import Tabs from "../navigation/tabs";
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();


const TabsScreen = ({navigation}) => {
    return (
        <Tabs />
    )
}

export default TabsScreen;

