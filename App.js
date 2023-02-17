import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameMenu from './src/Screens/GameMenu';
import DefineRoles from './src/Screens/DefineRoles';
import DefinePlayers from './src/Screens/DefinePlayers';
import { GameProvider } from './src/Context/GameContext';
import PassToPlayer from './src/Screens/PassToPlayer';
import PlayerAction from './src/Screens/PlayerAction';
import VillageNews from './src/Screens/VillageNews';
import Clock from './src/Screens/Clock';
import Votes from './src/Screens/Votes';
import Styles from './src/Styles';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='GameMenu' 
        screenOptions={{ 
          animation: 'none',
          headerShown: false,
          title: "" 
        }}
        >
          <Stack.Screen name='GameMenu' component={GameMenu} />
          <Stack.Screen name='DefinePlayers' component={DefinePlayers} />
          <Stack.Screen name='DefineRoles' component={DefineRoles} />
          <Stack.Screen name='PassToPlayer' component={PassToPlayer} />
          <Stack.Screen name='PlayerAction' component={PlayerAction} />
          <Stack.Screen name='VillageNews' component={VillageNews} />
          <Stack.Screen name='Clock' component={Clock} />
          <Stack.Screen name='Votes' component={Votes} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

