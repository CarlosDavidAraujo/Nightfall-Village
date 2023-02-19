import React, { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import SkillButton from '../../Components/Buttons/SkillButton';
import PlayersButtonList from '../../Components/Buttons/PlayersButtomList';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import RoleTitle from '../../Components/Texts/RoleTitle';
import werewolfImg from '../../Images/werewolf.png';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    align-items: center;
`;

const SkillsContainer = styled.View`
    align-items: center;
    height: 35%;
    justify-content: space-evenly;
`;

const RoleImage = styled.Image`
  width: 250;
  height: 250;
`;

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

  function handleShowPlayers() {
    setSkillWasChosen(true);
    setShowPlayers(true);
    setPassCondition(false);
  }

  useEffect(() => {
    setHandleConfirm(() => handleDevorar);
  }, [targetPlayer]);

  return (
    <Container>

      <RoleTitle currentPlayer={currentPlayer} />
      <RoleImage source={werewolfImg} />
      <ConditionalMessage
        showChooseSkill={!skillWasChosen}
        showSelectPlayer={showPlayers}
        selectPlayerMessage='Selecione um jogador para devorar'
      />

      {!skillWasChosen &&
        <SkillsContainer>
          <SkillButton
            onPress={() => handleShowPlayers()}
            skillName='Devorar'
            skillDescription='Você escolhe um jogador para devorar. Ele é eliminado do jogo'
            skillIcon={werewolfImg}
          />
        </SkillsContainer>
      }

      {showPlayers &&
        <PlayersButtonList
          playerList={playerList}
          currentPlayer={currentPlayer}
          numColumns={3}
          targetPlayer={targetPlayer}
          setTargetPlayer={setTargetPlayer}
        />
      }

    </Container>
  );
}
