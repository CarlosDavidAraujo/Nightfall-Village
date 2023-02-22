import React, { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import SkillButton from '../../Components/Buttons/SkillButton';
import PlayersButtonList from '../../Components/Buttons/PlayersButtonList';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import { RoleImage, RoleScreenContainer, SkillsContainer, Title } from '../../Styles';

export default function WereWolf({
  passTurn,
  setHandleConfirm,
  setPassCondition,
  targetPlayer,
  setTargetPlayer
}) {

  const { currentGame } = useContext(GameContext);
  const playerList = currentGame.getPlayers();
  const currentPlayer = currentGame.getCurrentPlayer();
  const werewolf = currentPlayer.getRole();
  const [showPlayers, setShowPlayers] = useState(false);
  const [skillWasChosen, setSkillWasChosen] = useState(false);

  function handleDevorar() {
    werewolf.devorar(targetPlayer, currentGame);
    passTurn();
  }

  function handleTransmutar() {
    werewolf.transmutar();
    passTurn();
  }

  function handleShowPlayers() {
    setSkillWasChosen(true);
    setShowPlayers(true);
    setPassCondition(false);
  }

  useEffect(() => {
    setHandleConfirm(() => handleDevorar);
  }, [targetPlayer]);

  return (
    <RoleScreenContainer>

      <Title>{currentPlayer.getRoleName()}</Title>
      <RoleImage source={werewolf.getRoleImg()} />
      <ConditionalMessage
        showChooseSkill={!skillWasChosen}
        showSelectPlayer={showPlayers}
        selectPlayerMessage='Selecione um jogador para devorar'
      />

      {!skillWasChosen &&
        <SkillsContainer>
          <SkillButton
            onPress={() => handleShowPlayers()}
            skillName={werewolf.getFirstSkillName()}
            skillDescription={werewolf.getFirstSkillDescription()}
            skillIcon={werewolf.getFirstSkillIcon()}
            disabled={currentPlayer.isSkillsBlocked()}
            skillUsed={currentPlayer.isSkillsBlocked()}
          />

          <SkillButton
            onPress={() => handleTransmutar()}
            skillName={werewolf.getSecondSkillName()}
            skillDescription={werewolf.getSecondSkillDescription()}
            skillIcon={werewolf.getFirstSkillIcon()}
            disabled={currentPlayer.isSkillsBlocked()}
            skillUsed={currentPlayer.isSkillsBlocked()}
          />
        </SkillsContainer>
      }

      {showPlayers &&
        <PlayersButtonList
          playerList={playerList}
          currentPlayer={currentPlayer}
          targetPlayer={targetPlayer}
          setTargetPlayer={setTargetPlayer}
          inverted={true}
        />
      }

    </RoleScreenContainer>
  );
}
