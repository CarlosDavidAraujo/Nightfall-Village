import React, { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import SkillButton from '../../Components/Buttons/SkillButton';
import PlayersButtonList from '../../Components/Buttons/PlayersButtonList';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import { FlexStartContainer, RoleImage, RoleImageContainer, SkillsContainer, Title } from '../../Styles';

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
    werewolf.devorar(targetPlayer);
    setTargetPlayer(null);
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
    <FlexStartContainer>

      <Title>{currentPlayer.getRoleName()}</Title>
      <RoleImageContainer>
        <RoleImage source={werewolf.getRoleImg()} />
      </RoleImageContainer>
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
            disabled={currentPlayer.isSkillBlocked(1)}
            skillUsed={currentPlayer.isSkillBlocked(1)}
          />

          <SkillButton
            onPress={() => handleTransmutar()}
            skillName={werewolf.getSecondSkillName()}
            skillDescription={werewolf.getSecondSkillDescription()}
            skillIcon={werewolf.getSecondSkillIcon()}
            disabled={currentPlayer.isSkillBlocked(2)}
            skillUsed={currentPlayer.isSkillBlocked(2)}
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

    </FlexStartContainer>
  );
}
