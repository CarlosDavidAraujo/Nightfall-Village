import React, { useContext } from "react";
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from "react-native";
import bgImg from '../Images/menuImage.png';

const Container = styled.View`
    height: 100vh;
    background-color: black;
`;

export default function GameMenu({ navigation }) {
    return (
        <Container>
                <Text>Nightfall Village</Text>
                <TouchableOpacity
                    title="Iniciar Novo Jogo"
                    onPress={() => navigation.navigate('DefinePlayers')}
                />
        </Container>
    );
}

