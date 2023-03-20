import React, { useContext } from "react";
import Game from "../Classes/Game";
import { GameContext } from "../Context/GameContext";
import Column from "../Styles/elements/Column";
import Text from "../Styles/elements/Text";
import Button from "../Styles/elements/Button";

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
    <Column modifiers={['grow', 'spaceAround', 'primary']}>
      <Column modifiers='start'>
        {currentGame.getTurnNews().map((message, i) => (
          <Text modifiers='medium' key={i}>{message}</Text>
        ))}
      </Column>
      {winner ? (
        <>
          {currentGame.allPlayers.map((player, i) => (
            <Text key={i}>{`${player.name}: ${player.role.name}`}</Text>
          ))}
          <Button onPress={() => handleEndGame()}>
            <Button.Text>Novo jogo</Button.Text>
          </Button>
        </>
      ) : previousScreen === "PlayerAction" ? (
        <Button onPress={() => startDayPhase()}>
          <Button.Text>Reunir vila</Button.Text>
        </Button>
      ) : previousScreen === "Votes" ? (
        <Button onPress={() => startNightPhase()}>
          <Button.Text>Adormecer</Button.Text>
        </Button>
      ) : null}
    </Column>
  );
}
