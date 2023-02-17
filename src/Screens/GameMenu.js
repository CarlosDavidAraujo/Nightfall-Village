import React, { useContext } from "react";
import styled from 'styled-components/native';
import { StyleSheet, Text } from "react-native";
import bgImg from '../Images/menuImage.png';
import { DefaultButton } from "../Components/Button";
import AppLoading from 'expo-app-loading';
import { useFonts, NewRocker_400Regular } from '@expo-google-fonts/new-rocker';


const Container = styled.View`
    position: relative;
    flex: 1;
    background-color: white;
`;

const Background = styled.ImageBackground`
    flex: 1;
`;

const StartButton = styled(DefaultButton)`
    position: absolute;
    bottom: 20%;
    width: 50%;
    align-self: center;
    align-items: center;
`;

const DefaultText = styled.Text`
    color: white;
    font-size: 20px;
    font-family: 'New Rocker', cursive;
`;

export default function GameMenu({ navigation }) {
    let [fontsLoaded] = useFonts({
        NewRocker_400Regular,
    });

    let fontSize = 24;
    let paddingVertical = 6;

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <Container>
                <Background source={bgImg} resizeMode={'cover'}>
                    <Text>Nightfall Village</Text>
                    <StartButton
                        onPress={() => navigation.navigate('DefinePlayers')}
                    >
                        <Text style={{
                            fontSize,
                            paddingVertical,
                            // Note the quoting of the value for `fontFamily` here; it expects a string!
                            fontFamily: 'NewRocker_400Regular',
                        }}>Iniciar novo jogo</Text>
                    </StartButton>
                </Background>
            </Container>
        );
    }
}