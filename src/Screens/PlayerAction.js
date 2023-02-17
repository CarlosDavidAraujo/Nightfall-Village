import React, { useContext } from "react";
import Hunter from "./RoleScreens/Hunter";
import Seer from "./RoleScreens/Seer";
import Villager from "./RoleScreens/Villager";
import Werewolf from "./RoleScreens/Werewolf";
import { GameContext } from "../Context/GameContext";
import { View, Text, Button } from "react-native";

export default function PlayerAction({navigation}) {
  const { currentGame, playerList } = useContext(GameContext);

  const currentPlayer = currentGame.getCurrentPlayer();

  const roleScreens = {
    Aldeão: (
      <Villager
        currentPlayer={currentPlayer}
        playerList={playerList}
        currentGame={currentGame}
      />
    ),
    Vidente: <Seer currentPlayer={currentPlayer} playerList={playerList} />,
    Lobisomem: (
      <Werewolf
        currentPlayer={currentPlayer}
        playerList={playerList}
        currentGame={currentGame}
      />
    ),
    Caçador: (
      <Hunter
        currentPlayer={currentPlayer}
        playerList={playerList}
        currentGame={currentGame}
      />
    )
  };

  function passTurn() {
    currentGame.passToNextPlayer();

    if (currentGame.noNextPlayer()) {
      currentGame.removePlayers();
      currentGame.clearPlayersProtection();
      navigation.navigate("VillageNews", {
        previousScreen: 'PlayerAction'
      });
    } else {
      navigation.navigate("PassToPlayer");
    }
  }

  return (
    <View>
      <Text>{roleScreens[currentPlayer.getRoleName()]}</Text>
      <Button title="Terminar a vez" onPress={() => passTurn()}/>
    </View>
  );
}
