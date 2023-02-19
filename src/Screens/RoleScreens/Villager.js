import React, { useContext, useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import villagerImg from '../../Images/villager.png';
import prayIcon from '../../Images/pray.png';
import keyHole from '../../Images/keyhole.png';
import styled from 'styled-components/native';
import SkillButton from '../../Components/Buttons/SkillButton';
import PlayersButtonList from '../../Components/Buttons/PlayersButtomList';
import { GameContext } from '../../Context/GameContext';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import RoleTitle from '../../Components/Texts/RoleTitle';


const Container = styled.View`
    flex: 1;
    align-items: center;
`;

const SkillsContainer = styled.View`
    align-items: center;
    height: 35%;
    justify-content: space-evenly;
`;

export default function Villager({
  setHandleConfirm,
  setPassCondition,
  targetPlayer,
  setTargetPlayer,
  passTurn }) {

  const { currentGame } = useContext(GameContext);
  const playerList = currentGame.getPlayers();
  const currentPlayer = currentGame.getCurrentPlayer();
  const villager = currentPlayer.getRole();
  const [discoveredWereWolf, setDiscoveredWereWolf] = useState();
  const [showPlayers, setShowPlayers] = useState(false);
  const [skillWasChosen, setSkillWasChosen] = useState(false);

  function handleEspiar() {
    const newDiscoveredWereWolf = villager.espiar(playerList, currentGame);
    setDiscoveredWereWolf(newDiscoveredWereWolf);
    setSkillWasChosen(true);
  }

  function handleRezar() {
    currentPlayer.getRole().orar(targetPlayer);
    passTurn();
  }

  function handleShowPlayers() {
    setSkillWasChosen(true);
    setShowPlayers(true);
    setPassCondition(false);
  }

  useEffect(() => {
    setHandleConfirm(() => handleRezar);
    setPassCondition(!skillWasChosen || discoveredWereWolf);
    console.log(targetPlayer);
  }, [targetPlayer]);

  return (
    <Container>

      <RoleTitle currentPlayer={currentPlayer}/>
      <Image source={villagerImg} style={{ width: 250, height: 250 }} />
      <ConditionalMessage
        showChooseSkill={!skillWasChosen}
        showSelectPlayer={showPlayers}
        selectPlayerMessage='Selecione um jogador para tentar protege-lo'
        showAlert={discoveredWereWolf}
        alertMessage={discoveredWereWolf}
      />

      {!skillWasChosen &&
        <SkillsContainer>
          <SkillButton
            onPress={() => handleEspiar()}
            skillName='Espiar'
            skillIcon={keyHole}
            skillDescription='Há uma pequena chance de você descobrir um lobisomem, mas uma pequena chance de você morrer.'
          />
          <SkillButton
            onPress={() => handleShowPlayers()}
            skillName='Rezar'
            skillIcon={prayIcon}
            skillDescription='Escolha outro jogador. Há uma pequena chance dele ser protegido esta noite.'
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
      
    </Container >
  );
}
