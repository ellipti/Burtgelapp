import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import FlexboxScreen from './src/screens/FlexboxScreen';
import FlatlistScreen from './src/screens/FlatlistScreen';
import CustomListScreen from './src/screens/CustomListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Flexbox" component={FlexboxScreen} />
          <Stack.Screen name="Flatlist" component={FlatlistScreen} />
          <Stack.Screen name="CustomList" component={CustomListScreen} />
        </Stack.Navigator>
        </NavigationContainer>
      );
    }
    
