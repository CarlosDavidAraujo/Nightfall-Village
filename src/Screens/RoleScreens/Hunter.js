import { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import SkillButton from '../../Components/Buttons/SkillButton';
import PlayersButtonList from '../../Components/Buttons/PlayersButtonList';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import { RoleImage, RoleScreenContainer, SkillsContainer, Title } from '../../Styles';

export default function Hunter({
  passTurn,
  setHandleConfirm,
  setPassCondition,
  targetPlayer,
  setTargetPlayer
}) {

  const { currentGame } = useContext(GameContext);
  const playerList = currentGame.getPlayers();
  const currentPlayer = currentGame.getCurrentPlayer();
  const hunter = currentPlayer.getRole();
  const [showPlayers, setShowPlayers] = useState(false);
  const [skillWasChosen, setSkillWasChosen] = useState(false);
  const [chosenSkill, setChosenSkill] = useState();


  function handleAtirar() {
    hunter.atirar(targetPlayer, currentGame);
    passTurn();
  }

  function handleCapturar() {
    hunter.capturar(targetPlayer);
    passTurn();
  }

  function handleShowPlayers() {
    setSkillWasChosen(true);
    setShowPlayers(true);
    setPassCondition(false);
  }

  useEffect(() => {
    if (chosenSkill === 1) {
      return setHandleConfirm(() => handleAtirar);
    }
    setHandleConfirm(() => handleCapturar);
  }, [targetPlayer]);

  return (
    <RoleScreenContainer>

      <Title>{currentPlayer.getRoleName()}</Title>
      <RoleImage source={hunter.getRoleImg()} />
      <ConditionalMessage
        showChooseSkill={!skillWasChosen}
        showSelectPlayer={showPlayers}
        selectPlayerMessage='Selecione um jogador para eliminar'
      />

      {!skillWasChosen &&
        <SkillsContainer>
          <SkillButton
            onPress={() => {
              setChosenSkill(1);
              handleShowPlayers();
            }}
            skillName={hunter.getFirstSkillName()}
            skillDescription={hunter.getFirstSkillDescription()}
            skillIcon={hunter.getFirstSkillIcon()}
            disabled={hunter.getFirstSkillLocked() || currentPlayer.isSkillsBlocked()}
            skillUsed={hunter.getFirstSkillLocked()}
          />
          <SkillButton
            onPress={() => {
              setChosenSkill(2);
              handleShowPlayers();
            }}
            skillName={hunter.getSecondSkillName()}
            skillDescription={hunter.getSecondSkillDescription()}
            skillIcon={hunter.getSecondSkillIcon()}
            disabled={hunter.getFirstSkillLocked() || currentPlayer.isSkillsBlocked()}
            skillUsed={hunter.getFirstSkillLocked() || currentPlayer.isSkillsBlocked()}
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
