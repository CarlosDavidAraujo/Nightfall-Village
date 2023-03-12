import React, { useContext } from "react";
import Game from "../Classes/Game";
import { GameContext } from "../Context/GameContext";
import DefaultButton from "../Components/Buttons/DefaultButton";
import {
  DefaultText,
  FlexStartContainer,
  SpaceAroundContainer,
  SubTitle,
} from "../Styles";
import { dark, invertTheme } from "../Themes/Dark";

export default function VillageNews({ route, navigation }) {
  const { currentGame, setCurrentGame } = useContext(GameContext);
  const { previousScreen } = route.params;

  const winner = currentGame.winConditionManager.getWinnerTeam();

  function handleEndGame() {
    setCurrentGame(new Game());
    navigation.navigate("GameMenu");
  }

  function startDayPhase() {
    currentGame.clearTurnNews();
    navigation.navigate("Clock", {
      previousScreen: "VillageNews",
    });
  }

  function startNightPhase() {
    currentGame.clearTurnNews();
    navigation.navigate("PassToPlayer", {
      previousScreen: "VillageNews",
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
        <>
          {currentGame.allPlayers.map((player, i) => (
            <DefaultText
              key={i}
            >{`${player.name}: ${player.role.name}`}</DefaultText>
          ))}
          <DefaultButton onPress={() => handleEndGame()} title="Novo jogo" />
        </>
      ) : previousScreen === "PlayerAction" ? (
        <DefaultButton
          onPress={() => startDayPhase()}
          title="Reunir a vila"
        />
      ) : previousScreen === "Votes" ? (
        <DefaultButton onPress={() => startNightPhase()} title="Adormecer" />
      ) : null}
    </SpaceAroundContainer>
  );
}
