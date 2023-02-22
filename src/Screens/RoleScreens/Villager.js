import React, { useContext, useEffect, useState } from 'react';
import SkillButton from '../../Components/Buttons/SkillButton';
import PlayersButtonList from '../../Components/Buttons/PlayersButtonList';
import { GameContext } from '../../Context/GameContext';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import { FlexStartContainer, RoleImage, SkillsContainer, Title } from '../../Styles';

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
    if (!newDiscoveredWereWolf) {
      return passTurn();
    }
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
  }, [targetPlayer]);

  return (
    <FlexStartContainer>
      <Title>{currentPlayer.getRoleName()}</Title>
      <RoleImage source={villager.getRoleImg()} />
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
            skillIcon={villager.getFirstSkillIcon()}
            skillName={villager.getFirstSkillName()}
            skillDescription={villager.getFirstSkillDescription()}
            disabled={currentPlayer.isFirstSkillBlocked()}
            skillUsed={currentPlayer.isFirstSkillBlocked()}
          />
          <SkillButton
            onPress={() => handleShowPlayers()}
            skillIcon={villager.getSecondSkillIcon()}
            skillName={villager.getSecondSkillName()}
            skillDescription={villager.getSecondSkillDescription()}
            disabled={currentPlayer.isSecondSkillBlocked()}
            skillUsed={currentPlayer.isSecondSkillBlocked()}
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

    </FlexStartContainer >
  );
}
