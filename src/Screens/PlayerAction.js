import React, { useContext, useState } from "react";
import Hunter from "./RoleScreens/Hunter";
import Seer from "./RoleScreens/Seer";
import Villager from "./RoleScreens/Villager";
import Werewolf from "./RoleScreens/Werewolf";
import { GameContext } from "../Context/GameContext";
import ActionButtons from "../Components/Buttons/ActionButtons";
import { ScreenContainer } from "../Styles";
import { dark, invertTheme } from "../Themes/Dark";

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
    currentGame.setNextPlayer();

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
    <ScreenContainer style={{backgroundColor: invertTheme(dark).bg}}>
      {roleScreens[currentPlayer.getRoleName()]}
      <ActionButtons
        showPass={passCondition}
        passText='Passar a vez'
        onPass={() => passTurn()}
        showConfirm={targetPlayer}
        confirmText='Confirmar'
        onConfirm={() => handleConfirm()}
      />
    </ScreenContainer>
  );
}
