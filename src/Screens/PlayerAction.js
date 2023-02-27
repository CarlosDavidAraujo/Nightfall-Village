import React, { useContext, useEffect, useState } from 'react';
import SkillButton from '../Components/Buttons/SkillButton';
import PlayersButtonList from '../Components/Buttons/PlayersButtonList';
import { GameContext } from '../Context/GameContext';
import ActionButtons from '../Components/Buttons/ActionButtons';
import ConditionalMessage from '../Components/Texts/ConditionalMessage';
import { FlexStartContainer, RoleImage, RoleImageContainer, SkillsContainer, SpaceBetweenContainer, Title } from '../Styles';
import useRoleConfig from '../config/roleConfig';
import { dark } from '../Themes/Dark';

export default function PlayerAction({ navigation }) {
    const { currentGame } = useContext(GameContext);
    const currentTurn = currentGame.getCurrentTurn();
    const playerList = currentGame.getPlayers();
    const deadPlayers = currentGame.getDeadPlayers();
    const currentPlayer = currentGame.getCurrentPlayer();
    const role = currentPlayer.getRole();
    const roleName = role.getName();
    const { skill1IsTarget, skill2IsTarget } = role.getSkillTarget();
    const [passCondition, setPassCondition] = useState(true);
    const [targetPlayer, setTargetPlayer] = useState();
    const [discoveredPlayer, setDiscoveredPlayer] = useState();
    const [showPlayers, setShowPlayers] = useState(false);
    const [showDeadPlayers, setShowDeadPlayers] = useState(false);
    const [chosenSkill, setChosenSkill] = useState();
    const [potion, setPotion] = useState();
    const roleConfig = useRoleConfig(
        currentGame,
        currentTurn,
        playerList,
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
        currentGame.setNextPlayer();

        if (currentGame.noNextPlayer()) { //nao ha mais nenhum jogador para agir entao:
            currentGame.endNight();
            navigation.navigate("VillageNews", {
                previousScreen: 'PlayerAction'
            });
        } else {
            navigation.navigate("PassToPlayer", {
                playerList: currentGame.getPlayers()
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

                <ConditionalMessage //renderiza condicionalmente mensagens
                    showChooseSkill={!chosenSkill} //se deve mostrar a mensagem de selecinar habilidade
                    showSelectPlayer={showPlayers} //se deve mostrar a mensagem de selecionar um jogador alvo
                    selectPlayerMessage={chosenSkill === 1 ? messages.firstSkill : chosenSkill === 2 ? messages.secondSkill : messages.alert && messages.alert}
                    showAlert={discoveredPlayer} //alertas como revelar a funcao de outro jogador
                    alertMessage={discoveredPlayer}
                />

                {!chosenSkill &&
                    <SkillsContainer>
                        <SkillButton
                            onPress={skill1IsTarget ? () => methods.useSkillTarget(1, role) : handleUseFirstSkill} //se a skill é de alvo chama o metodo que mostra os alvos
                            skillIcon={role.getFirstSkillIcon()}                                  //se nao, executa diretamente o metodo da habilidade
                            skillName={role.getFirstSkillName()}
                            skillDescription={role.getFirstSkillDescription()}
                            disabled={role.isSkillBlocked(1, currentTurn)}
                            skillUsed={role.isSkillBlocked(1, currentTurn)}
                        />
                        <SkillButton
                            onPress={skill2IsTarget ? () => methods.useSkillTarget(2, role) : handleUseSecondSkill}
                            skillIcon={role.getSecondSkillIcon()}
                            skillName={role.getSecondSkillName()}
                            skillDescription={role.getSecondSkillDescription()}
                            disabled={role.isSkillBlocked(2, currentTurn) || role.cantInteractWithDeadPlayers(currentGame)}
                            skillUsed={role.isSkillBlocked(2, currentTurn) || role.cantInteractWithDeadPlayers(currentGame)}
                        />
                    </SkillsContainer>
                }

                {showPlayers &&
                    <PlayersButtonList //renderiza a lista de alvos
                        currentGame={currentGame}
                        playerList={playerList}
                        currentPlayer={currentPlayer}
                        targetPlayer={targetPlayer}
                        setTargetPlayer={setTargetPlayer}
                        chosenSkill={chosenSkill}
                        inverted={true}
                    />
                }

                {showDeadPlayers &&
                    <PlayersButtonList
                        currentGame={currentGame}
                        playerList={deadPlayers} s
                        currentPlayer={currentPlayer}
                        targetPlayer={targetPlayer}
                        setTargetPlayer={setTargetPlayer}
                        chosenSkill={chosenSkill}
                        inverted={true}
                    />
                }

            </FlexStartContainer >
            <ActionButtons  //rederiza 2 botoes, passar a vez ou confirmar, dependendo das condiçoes inseridas em showPass e showConfirm
                showPass={passCondition}
                passText='Passar a vez'
                onPass={() => passTurn()}
                showConfirm={targetPlayer} //confirmar é usado apenas em habilidades que precisam de um alvo
                confirmText='Confirmar'
                onConfirm={chosenSkill === 1 ? handleUseFirstSkill : chosenSkill === 2 && handleUseSecondSkill} //executa o metodo da habilidade escolhida 
            />
        </SpaceBetweenContainer>
    );
}
