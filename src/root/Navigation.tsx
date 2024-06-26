import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import GameScreen from '../views/GameScreen';
import LeaderboardScreen from '../views/LearboardScreen';
import QrScreen from '../views/QRScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Score" component={LeaderboardScreen} />
        <Stack.Screen name="qr" component={QrScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;