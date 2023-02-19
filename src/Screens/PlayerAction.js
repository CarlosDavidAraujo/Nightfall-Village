import React, { useContext, useState } from "react";
import Hunter from "./RoleScreens/Hunter";
import Seer from "./RoleScreens/Seer";
import Villager from "./RoleScreens/Villager";
import Werewolf from "./RoleScreens/Werewolf";
import { GameContext } from "../Context/GameContext";
import { View, Text, Button } from "react-native";
import styled from "styled-components/native";
import ActionButtons from "../Components/Buttons/ActionButtons";

const Container = styled.View`
  flex: 1;
  background-color: #f5deb3;
  padding: 50px 20px 20px 20px;
  justify-content: space-between;
  align-items: center; 
`;

export default function PlayerAction({ navigation }) {
  const { currentGame } = useContext(GameContext);
  const currentPlayer = currentGame.getCurrentPlayer();
  const [handleConfirm, setHandleConfirm] = useState();
  const [passCondition, setPassCondition] = useState(true);
  const [targetPlayer, setTargetPlayer] = useState();

  const roleScreens = {
    Aldeão: (
      <Villager
        passTurn={passTurn}
        setHandleConfirm={setHandleConfirm}
        setPassCondition={setPassCondition}
        targetPlayer={targetPlayer}
        setTargetPlayer={setTargetPlayer}
      />
    ),
    Vidente: (
      <Seer
        setHandleConfirm={setHandleConfirm}
        setPassCondition={setPassCondition}
        targetPlayer={targetPlayer}
        setTargetPlayer={setTargetPlayer}
      />),
    Lobisomem: (
      <Werewolf
        passTurn={passTurn}
        setHandleConfirm={setHandleConfirm}
        setPassCondition={setPassCondition}
        targetPlayer={targetPlayer}
        setTargetPlayer={setTargetPlayer}
      />
    ),
    Caçador: (
      <Hunter
      passTurn={passTurn}
      setHandleConfirm={setHandleConfirm}
      setPassCondition={setPassCondition}
      targetPlayer={targetPlayer}
      setTargetPlayer={setTargetPlayer}
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
      navigation.navigate("PassToPlayer", {
        playerList: currentGame.getPlayers()
      });
    }
  }

  return (
    <Container>
      {roleScreens[currentPlayer.getRoleName()]}
      <ActionButtons
        showPass={passCondition}
        passText='Passar a vez'
        onPass={() => passTurn()}
        showConfirm={targetPlayer}
        confirmText='Confirmar'
        onConfirm={() => handleConfirm()}
      />
    </Container>
  );
}
