import React, { useContext, useState } from "react";
import PlayersButtonList from "../Components/Buttons/PlayersButtonList";
import { GameContext } from "../Context/GameContext";
import ActionButtons from "../Components/Buttons/ActionButtons";
import ConditionalMessage from "../Components/Texts/ConditionalMessage";
import {
  FlexStartContainer,
  RoleImage,
  RoleImageContainer,
  SpaceBetweenContainer,
  Title,
} from "../Styles";
import useRoleConfig from "../config/roleConfig";
import { theme } from "../Styles/Theme";
import SkillsChoiceContainer from "../Components/Buttons/SkillChoiceContainer";
import Column from "../Styles/elements/Column";
import Text from "../Styles/elements/Text";

export default function PlayerAction({ navigation }) {
  const { currentGame } = useContext(GameContext);
  const alivePlayers = currentGame.getAlivePlayers();

  if (alivePlayers.length === 0) {
    navigation.replace("VillageNews", { previousScreen: "PlayerAction" });
    return null;
  }
  const deadPlayers = currentGame.getDeadPlayers();
  const currentPlayer = currentGame.getCurrentPlayer();
  const role = currentPlayer.getRole();
  const roleName = role.getName();
  const [passCondition, setPassCondition] = useState(true);
  const [targetPlayer, setTargetPlayer] = useState();
  const [discoveredPlayer, setDiscoveredPlayer] = useState();
  const [showPlayers, setShowPlayers] = useState(false);
  const [showDeadPlayers, setShowDeadPlayers] = useState(false);
  const [chosenSkill, setChosenSkill] = useState();
  const [potion, setPotion] = useState();
  const roleConfig = useRoleConfig(
    role,
    targetPlayer,
    setTargetPlayer,
    passTurn,
    setPassCondition,
    setChosenSkill,
    discoveredPlayer,
    setDiscoveredPlayer,
    setShowPlayers,
    setShowDeadPlayers,
    handleShowPlayers,
    handleShowDeadPlayers,
    potion,
    setPotion
  );
  const methods = roleConfig[roleName].methods;
  const messages = roleConfig[roleName].messages;

  function handleShowPlayers() {
    setShowPlayers(true);
    setPassCondition(false);
  }

  function handleShowDeadPlayers() {
    setShowDeadPlayers(true);
    setPassCondition(false);
  }

  function passTurn() {
    currentGame.incrementCurrentPlayerIndex();

    if (currentGame.noNextPlayer()) {
      currentGame.endNight();
      navigation.navigate("VillageNews", {
        previousScreen: "PlayerAction",
      });
    } else {
      navigation.navigate("PassToPlayer", {
        previousScreen: "PlayerAction",
      });
    }
  }

  return (
    <Column modifiers={['spaceBetween', 'grow', 'primary']} style={{paddingHorizontal: 10}}>
      <Column modifiers='start'>
        <Text modifiers='large'>{role.getName()}</Text>
        <RoleImageContainer>
          <RoleImage source={role.getRoleImg()} />
        </RoleImageContainer>

        <ConditionalMessage
          showChooseSkill={!chosenSkill}
          showSelectPlayer={showPlayers}
          selectPlayerMessage={
            chosenSkill === 1
              ? messages.firstSkill
              : chosenSkill === 2
              ? messages.secondSkill
              : messages.alert && messages.alert
          }
          showAlert={discoveredPlayer}
          alertMessage={discoveredPlayer}
        />

        {!chosenSkill && (
          <SkillsChoiceContainer role={role} methods={methods} />
        )}

        {showPlayers && (
          <PlayersButtonList
            playerList={alivePlayers}
            currentPlayer={currentPlayer}
            targetPlayer={targetPlayer}
            setTargetPlayer={setTargetPlayer}
            chosenSkill={chosenSkill}
            inverted={true}
          />
        )}

        {showDeadPlayers && (
          <PlayersButtonList
            playerList={deadPlayers}
            currentPlayer={currentPlayer}
            targetPlayer={targetPlayer}
            setTargetPlayer={setTargetPlayer}
            chosenSkill={chosenSkill}
            inverted={true}
          />
        )}
      </Column>
      <ActionButtons
        showPass={passCondition}
        onPass={() => passTurn()}
        showConfirm={targetPlayer}
        onConfirm={
          chosenSkill === 1
            ? methods.useFirstSkill
            : chosenSkill === 2 && methods.useSecondSkill
        }
      />
    </Column>
  );
}
