import React, { useContext } from "react";
import Game from "../Classes/Game";
import { GameContext } from "../Context/GameContext";
import DefaultButton from "../Components/Buttons/DefaultButton";
import { FlexStartContainer, SpaceAroundContainer, SubTitle } from "../Styles";
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
    currentGame.endTurn();
    navigation.navigate("PassToPlayer", {
      previousScreen: 'VillageNews'
    });
  }

  return (
    <SpaceAroundContainer style={{ backgroundColor: invertTheme(dark).bg }}>
      <FlexStartContainer>
        {currentGame.getTurnNews().map((message, i) => (
          <SubTitle key={i}>{message}</SubTitle>
        ))}
      </FlexStartContainer>
      {winner ? (
        <DefaultButton onPress={() => handleEndGame()} title="Novo jogo" />
      ) : previousScreen === "PlayerAction" ? (
        <DefaultButton onPress={() => gatherVillagers()} title="Reunir a vila" />
      ) : previousScreen === "Votes" ? (
        <DefaultButton onPress={() => nightFall()} title="Adormecer" />
      ) : null}
    </SpaceAroundContainer>
  );
}
