import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import DefaultButton from "../Components/Buttons/DefaultButton";
import { GameContext } from "../Context/GameContext";
import bgImg from '../Images/passTo.png'
import door from '../Images/door.png';
import Title from "../Components/Texts/Title";

const Container = styled.View`
  flex: 1;
`;

const ImageBackground = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  object-fit: cover;
`;

const PassText = styled.Text`
  position: absolute;
  top: 34.5%;
  transform: rotateX(30deg) rotateY(-20deg) rotateZ(-13deg); 
  color: white;
  font-size: 30px;
`;


export default function PassToPlayer({ navigation }) {
  const { currentGame, setScreen } = useContext(GameContext);
  const [ready, setReady] = useState(false);
  const currentPlayerName = currentGame.getCurrentPlayer().getName();

  useEffect(() => {
    setReady(false);
  }, [currentGame.getCurrentPlayer()]);

  return (

    <Container>
      <ImageBackground source={ready ? door : bgImg} resizeMode='cover'>
        {ready ? (
          <>
            <Title style={{color: '#f5deb3'}}>{currentPlayerName}</Title>
            <DefaultButton
              inverted={true}
              title="Mostrar função"
              onPress={() => navigation.navigate("PlayerAction")}
              style={{ position: 'absolute', bottom: '20%' }}
            />
          </>
        ) : (
          <>
            <PassText style={{
              fontFamily: 'NewRocker_400Regular', color: '#f5deb3'
            }}>Passe para {currentPlayerName}</PassText>

            <DefaultButton
            inverted={true}
              title="Clique quando estiver pronto"
              onPress={() => setReady(true)}
              style={{ position: 'absolute', bottom: '20%' }}
            />
          </>
        )}
      </ImageBackground >
    </Container>
  );
}

