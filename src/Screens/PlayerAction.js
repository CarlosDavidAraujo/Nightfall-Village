import React, { useContext, useState } from "react";
import Hunter from "./RoleScreens/Hunter";
import Seer from "./RoleScreens/Seer";
import Villager from "./RoleScreens/Villager";
import Werewolf from "./RoleScreens/Werewolf";
import { GameContext } from "../Context/GameContext";
import ActionButtons from "../Components/Buttons/ActionButtons";
import { SpaceAroundContainer } from "../Styles";
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

    if (currentGame.noNextPlayer()) { //nao ha mais nenhum jogador para agir entao:
      currentGame.setMostVotedPlayerByWerewolfs(); //decide a vitima dos lobisomens
      currentGame.removePlayers(); //remove a vitima
      currentGame.clearPlayersVotes(); //limpa os votos
      currentGame.clearPlayersProtection(); //limpa as proteçoes
      currentGame.clearPlayersDeathMarks(); //limpa as marcas de morte
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
    <SpaceAroundContainer style={{backgroundColor: invertTheme(dark).bg}}>
      {roleScreens[currentPlayer.getRoleName()]}
      <ActionButtons
        showPass={passCondition}
        passText='Passar a vez'
        onPass={() => passTurn()}
        showConfirm={targetPlayer}
        confirmText='Confirmar'
        onConfirm={() => handleConfirm()}
      />
    </SpaceAroundContainer>
  );
}
