import React, { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import PlayersButtonList from '../../Components/Buttons/PlayersButtomList';
import SkillButton from '../../Components/Buttons/SkillButton';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import RoleTitle from '../../Components/Texts/RoleTitle';
import prayIcon from '../../Images/pray.png'
import seerImg from '../../Images/seer.png'

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
  width: 250px;
  height: 250px;
`;

export default function Seer({
  setHandleConfirm,
  setPassCondition,
  targetPlayer,
  setTargetPlayer,
}) {

  const { currentGame } = useContext(GameContext);
  const playerList = currentGame.getPlayers();
  const currentPlayer = currentGame.getCurrentPlayer();
  const seer = currentPlayer.getRole();
  const [discoveredPlayer, setDiscoveredPlayer] = useState();
  const [showPlayers, setShowPlayers] = useState(false);
  const [skillWasChosen, setSkillWasChosen] = useState(false);

  function handleRevelar() {
    setDiscoveredPlayer(seer.revelar(targetPlayer));
    setShowPlayers(false);
    setTargetPlayer(null);
    setPassCondition(true);
  }

  function handleShowPlayers() {
    setSkillWasChosen(true);
    setShowPlayers(true);
    setPassCondition(false);
  }

  useEffect(() => {
    setHandleConfirm(() => handleRevelar);
  }, [targetPlayer])

  return (
    <Container>

      <RoleTitle currentPlayer={currentPlayer} />
      <RoleImage source={seerImg} />
      <ConditionalMessage
        showChooseSkill={!skillWasChosen}
        showSelectPlayer={showPlayers}
        selectPlayerMessage='Selecione um jogador para ver sua função'
        showAlert={discoveredPlayer}
        alertMessage={discoveredPlayer}
      />

      {!skillWasChosen &&
        <SkillsContainer>
          <SkillButton
            onPress={() => handleShowPlayers()}
            skillName='Revelar'
            skillDescription='Você pode ver a função de outro jogador.'
            skillIcon={prayIcon}
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
