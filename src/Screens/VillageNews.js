import React, { useContext } from "react";
import Game from "../Classes/Game";
import { GameContext } from "../Context/GameContext";
import DefaultButton from "../Components/Buttons/DefaultButton";
import { ScreenContainer, SubTitle } from "../Styles";
import { dark, invertTheme } from "../Themes/Dark";

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

  function gatherVillagers() {
    currentGame.clearTurnNews();
    navigation.navigate("Clock", {
      previousScreen: 'VillageNews'
    });
  }

  function nightFall() {
    currentGame.clearTurnNews();
    currentGame.decreaseTurnsToBlockPlayers();
    currentGame.decreaseTurnsWithFakeName();
    navigation.navigate("PassToPlayer", {
      previousScreen: 'VillageNews'
    });
  }

  return (
    <ScreenContainer style={{ backgroundColor: invertTheme(dark).bg }}>
      {currentGame.getNews().map((message, i) => (
        <SubTitle key={i}>{message}</SubTitle>
      ))}
      {winner ? (
        <DefaultButton onPress={() => handleEndGame()} title="Novo jogo" />
      ) : previousScreen === "PlayerAction" ? (
        <DefaultButton onPress={() => gatherVillagers()} title="Reunir a vila" />
      ) : previousScreen === "Votes" ? (
        <DefaultButton onPress={() => nightFall()} title="Adormecer" />
      ) : null}
    </ScreenContainer>
  );
}
