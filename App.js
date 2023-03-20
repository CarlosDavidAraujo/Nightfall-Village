import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BackHandler, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameProvider } from './src/Context/GameContext';
import { useFonts, NewRocker_400Regular } from '@expo-google-fonts/new-rocker';
import { Balthazar_400Regular } from '@expo-google-fonts/balthazar';
import { GermaniaOne_400Regular } from '@expo-google-fonts/germania-one';
import AppLoading from 'expo-app-loading';
import GameMenu from './src/Screens/GameMenu';
import DefineRoles from './src/Screens/DefineRoles';
import DefinePlayers from './src/Screens/DefinePlayers';
import PassToPlayer from './src/Screens/PassToPlayer';
import PlayerAction from './src/Screens/PlayerAction';
import VillageNews from './src/Screens/VillageNews';
import Clock from './src/Screens/Clock';
import Votes from './src/Screens/Votes';
import HomeButton from './src/Components/Buttons/HomeButton';
import { theme } from './src/Styles/Theme';
import BackButton from './src/Components/Buttons/BackButton';
import { ThemeProvider } from 'styled-components/native';

const Stack = createNativeStackNavigator();

function getHeaderLeft(route) {
  if (route.name === "DefinePlayers" || route.name === "DefineRoles") {
    return <BackButton />;
  } else {
    return <HomeButton />;
  }
}

export default function App() {
  let [fontsLoaded] = useFonts({
    NewRocker_400Regular,
    Balthazar_400Regular,
    GermaniaOne_400Regular
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => BackHandler.removeEventListener('hardwareBackPress', () => true)
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <GameProvider>
          <StatusBar backgroundColor={theme.bg} />
          <NavigationContainer >
            <Stack.Navigator
              initialRouteName='GameMenu'
              screenOptions={({ route }) => ({
                animation: 'none',
                title: "",
                headerStyle: { backgroundColor: theme.colors.secondary },
                headerRightContainerStyle: { backgroundColor: theme.bg },
                headerLeft: () => getHeaderLeft(route),
                headerBackVisible: false,
              })}
            >
              <Stack.Screen name='GameMenu' component={GameMenu} options={{ headerShown: false }} />
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
      </ThemeProvider>
    );
  }
}

