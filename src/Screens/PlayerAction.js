import React, { useContext, useEffect, useState } from "react";
import SkillButton from "../Components/Buttons/SkillButton";
import PlayersButtonList from "../Components/Buttons/PlayersButtonList";
import { GameContext } from "../Context/GameContext";
import ActionButtons from "../Components/Buttons/ActionButtons";
import ConditionalMessage from "../Components/Texts/ConditionalMessage";
import {
  FlexStartContainer,
  RoleImage,
  RoleImageContainer,
  SkillsContainer,
  SpaceBetweenContainer,
  Title,
} from "../Styles";
import useRoleConfig from "../config/roleConfig";
import { dark } from "../Themes/Dark";

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
  const { isFirstSkillTargetType, isSecondSkillTargetType } =
    role.getSkillType();
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

  function handleUseFirstSkill() {
    methods.useFirstSkill();
  }

  function handleUseSecondSkill() {
    methods.useSecondSkill();
  }

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
    <SpaceBetweenContainer style={{ backgroundColor: dark.color }}>
      <FlexStartContainer style={{ backgroundColor: dark.color }}>
        <Title>{role.getName()}</Title>
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
          <SkillsContainer>
            <SkillButton
              onPress={
                isFirstSkillTargetType
                  ? () => methods.useSkillTarget(1)
                  : handleUseFirstSkill
              }
              skillIcon={role.getFirstSkillIcon()}
              skillName={role.getFirstSkillName()}
              skillDescription={role.getFirstSkillDescription()}
              disabled={role.isSkillDisabled(1)}
              showOpacity={role.isSkillDisabled(1)}
            />
            <SkillButton
              onPress={
                isSecondSkillTargetType
                  ? () => methods.useSkillTarget(2)
                  : handleUseSecondSkill
              }
              skillIcon={role.getSecondSkillIcon()}
              skillName={role.getSecondSkillName()}
              skillDescription={role.getSecondSkillDescription()}
              disabled={
                role.isSkillDisabled(2) ||
                role.cantInteractWithDeadPlayers(currentGame)
              }
              showOpacity={
                role.isSkillDisabled(2) ||
                role.cantInteractWithDeadPlayers(currentGame)
              }
            />
          </SkillsContainer>
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
      </FlexStartContainer>
      <ActionButtons
        showPass={passCondition}
        passText="Passar a vez"
        onPass={() => passTurn()}
        showConfirm={targetPlayer}
        confirmText="Confirmar"
        onConfirm={
          chosenSkill === 1
            ? handleUseFirstSkill
            : chosenSkill === 2 && handleUseSecondSkill
        }
      />
    </SpaceBetweenContainer>
  );
}
