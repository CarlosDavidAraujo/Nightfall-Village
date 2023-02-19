import React, { useContext } from "react";
import styled from 'styled-components/native';
import { ImageBackground, Text } from "react-native";
import bgImg from '../Images/menuImage.png';
import DefaultButton from "../Components/Buttons/DefaultButton";
import Title from "../Components/Texts/Title";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-around;
`;



export default function GameMenu({ navigation }) {
    return (
        <ImageBackground source={bgImg} resizeMode={'cover'} style={{flex: 1}}>
            <Container>
                <Title>Nightfall Village</Title>
                <DefaultButton
                    onPress={() => navigation.navigate('DefinePlayers')}
                    title="Iniciar Novo Jogo"
                    
                />
            </Container>
        </ImageBackground>
    );
}