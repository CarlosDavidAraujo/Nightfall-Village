import { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import PlayersButtonList from '../../Components/Buttons/PlayersButtonList';
import SkillButton from '../../Components/Buttons/SkillButton';
import ConditionalMessage from '../../Components/Texts/ConditionalMessage';
import { SkillsContainer, RoleImage, Title, FlexStartContainer, RoleImageContainer } from '../../Styles';

export default function Crusader({
    setHandleConfirm,
    setPassCondition,
    targetPlayer,
    setTargetPlayer,
    passTurn
}) {

    const { currentGame } = useContext(GameContext);
    const playerList = currentGame.getPlayers();
    const currentPlayer = currentGame.getCurrentPlayer();
    const crusader = currentPlayer.getRole();
    const [discoveredPlayer, setDiscoveredPlayer] = useState();
    const [showPlayers, setShowPlayers] = useState(false);
    const [skillWasChosen, setSkillWasChosen] = useState(false);
    const [chosenSkill, setChosenSkill] = useState();

    function handleSacrificar() {
        setDiscoveredPlayer(crusader.sacrificar(targetPlayer));
        setShowPlayers(false);
        setTargetPlayer(null);
        passTurn();
    }

    function handleJulgar() {
        crusader.julgar(targetPlayer, currentGame);
        setTargetPlayer(null);
        passTurn();
    }

    function handleShowPlayers() {
        setSkillWasChosen(true);
        setShowPlayers(true);
        setPassCondition(false);
    }

    useEffect(() => {
        if (chosenSkill === 1) {
            return setHandleConfirm(() => handleSacrificar);
        }
        setHandleConfirm(() => handleJulgar);
    }, [targetPlayer]);

    return (
        <FlexStartContainer>

            <Title>{currentPlayer.getRoleName()}</Title>
            <RoleImageContainer>
                <RoleImage source={crusader.getRoleImg()} />
            </RoleImageContainer>
            <ConditionalMessage
                showChooseSkill={!skillWasChosen}
                showSelectPlayer={showPlayers}
                selectPlayerMessage='Selecione por quem deseja sacrificar-se'
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
                        skillName={crusader.getFirstSkillName()}
                        skillDescription={crusader.getFirstSkillDescription()}
                        skillIcon={crusader.getFirstSkillIcon()}
                        disabled={currentPlayer.isSkillBlocked(1)}
                        skillUsed={currentPlayer.isSkillBlocked(1)}
                    />
                    <SkillButton
                        onPress={() => {
                            handleShowPlayers();
                        }}
                        skillName={crusader.getSecondSkillName()}
                        skillDescription={crusader.getSecondSkillDescription()}
                        skillIcon={crusader.getSecondSkillIcon()}
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
