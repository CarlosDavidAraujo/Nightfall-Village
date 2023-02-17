import React, { useContext } from "react";
import Game from "../Classes/Game";
import { GameContext } from "../Context/GameContext";
import { Button, View, Text } from "react-native";

export default function VillageNews({route, navigation}) {
  const { currentGame, setCurrentGame } = useContext(
    GameContext
  );
  const {previousScreen} = route.params

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
    <View>
      {winner ? (
        <Button onPress={() => handleEndGame()} title="Novo jogo" />
      ) : previousScreen === "PlayerAction" ? (
        <Button onPress={() => handleScreenChange()} title="Reunir a vila" />
      ) : previousScreen === "Votes" ? (
        <Button onPress={() => handleScreenChange()} title="Adormecer" />
      ) : null}
      <View>
        {currentGame.getNews().map((message, i) => (
          <Text key={i}>{message}</Text>
        ))}
      </View>
    </View>
  );
}
