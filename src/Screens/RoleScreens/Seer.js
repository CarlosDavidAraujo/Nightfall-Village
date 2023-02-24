import { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import PlayersButtonList from '../../Components/Buttons/PlayersButtonList';
import SkillButton from '../../Components/Buttons/SkillButton';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import { SkillsContainer, RoleImage, Title, FlexStartContainer, RoleImageContainer } from '../../Styles';

export default function Seer({
  setHandleConfirm,
  setPassCondition,
  targetPlayer,
  setTargetPlayer,
}) {

  const { currentGame } = useContext(GameContext);
  const playerList = currentGame.getPlayers();
  const deadPlayers = currentGame.getDeadPlayers();
  const currentPlayer = currentGame.getCurrentPlayer();
  const seer = currentPlayer.getRole();
  const [discoveredPlayer, setDiscoveredPlayer] = useState();
  const [showPlayers, setShowPlayers] = useState(false);
  const [showDeadPlayers, setShowDeadPlayers] = useState(false);
  const [skillWasChosen, setSkillWasChosen] = useState(false);
  const [chosenSkill, setChosenSkill] = useState();

  function handleRevelar() {
    setDiscoveredPlayer(seer.revelar(targetPlayer));
    setShowPlayers(false);
    setTargetPlayer(null);
    setPassCondition(true);
  }

  function handleContactar() {
    setDiscoveredPlayer(seer.contactar(targetPlayer));
    setShowDeadPlayers(false);
    setTargetPlayer(null);
    setPassCondition(true);
  }

  function handleShowPlayers() {
    setSkillWasChosen(true);
    setShowPlayers(true);
    setPassCondition(false);
  }

  function handleShowDeadPlayers() {
    setSkillWasChosen(true);
    setShowDeadPlayers(true);
    setPassCondition(false);
  }

  useEffect(() => {
    if (chosenSkill === 1) {
      return setHandleConfirm(() => handleRevelar);
    }
    setHandleConfirm(() => handleContactar);
  }, [targetPlayer]);

  return (
    <FlexStartContainer>

      <Title>{currentPlayer.getRoleName()}</Title>
      <RoleImageContainer>
        <RoleImage source={seer.getRoleImg()} />
      </RoleImageContainer>
      <ConditionalMessage
        showChooseSkill={!skillWasChosen}
        showSelectPlayer={showPlayers || showDeadPlayers}
        selectPlayerMessage='Selecione um jogador para ver sua função'
        showAlert={discoveredPlayer}
        alertMessage={discoveredPlayer}
      />

      {!skillWasChosen &&
        <SkillsContainer>
          <SkillButton
            onPress={() => {
              handleShowPlayers();
              setChosenSkill(1);
            }}
            skillName={seer.getFirstSkillName()}
            skillDescription={seer.getFirstSkillDescription()}
            skillIcon={seer.getFirstSkillIcon()}
            disabled={currentPlayer.isSkillBlocked(1)}
            skillUsed={currentPlayer.isSkillBlocked(1)}
          />

          <SkillButton
            onPress={() => handleShowDeadPlayers()}
            skillName={seer.getSecondSkillName()}
            skillDescription={seer.getSecondSkillDescription()}
            skillIcon={seer.getSecondSkillIcon()}
            disabled={currentPlayer.isSkillBlocked(2) || currentGame.getDeadPlayers().length === 0}
            skillUsed={currentPlayer.isSkillBlocked(2) || currentGame.getDeadPlayers().length === 0}
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

      {showDeadPlayers &&
        <PlayersButtonList
          playerList={deadPlayers}
          currentPlayer={currentPlayer}
          targetPlayer={targetPlayer}
          setTargetPlayer={setTargetPlayer}
          inverted={true}
        />
      }

    </FlexStartContainer>
  );
}
