import React, { useContext } from "react";
import Game from "../Classes/Game";
import { GameContext } from "../Context/GameContext";
import { Button, View, Text } from "react-native";
import DefaultButton from "../Components/Buttons/DefaultButton";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: space-around;

`;

export default function VillageNews({ route, navigation }) {
  const { currentGame, setCurrentGame } = useContext(
    GameContext
  );
  const { previousScreen } = route.params

  const winner = currentGame.getWinnerTeam();

  function handleEndGame() {
    setCurrentGame(new Game());
    navigation.navigate("GameMenu");
  }

  function handleScreenChange() {
    currentGame.clearTurnNews();
    navigation.navigate(previousScreen === "Votes" ? "PassToPlayer" : "Clock");
  }

  return (
    <Container>
      <View>
        {currentGame.getNews().map((message, i) => (
          <Text key={i}>{message}</Text>
        ))}
      </View>
      {winner ? (
        <DefaultButton onPress={() => handleEndGame()} title="Novo jogo" />
      ) : previousScreen === "PlayerAction" ? (
        <DefaultButton onPress={() => handleScreenChange()} title="Reunir a vila" />
      ) : previousScreen === "Votes" ? (
        <DefaultButton onPress={() => handleScreenChange()} title="Adormecer" />
      ) : null}
    </Container>
  );
}
