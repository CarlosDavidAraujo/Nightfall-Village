import { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import { BackgroundImage, SpaceAroundContainer, SubTitle, VoteButtonsContainer } from "../Styles";
import DefaultButton from "../Components/Buttons/DefaultButton";
import PlayersButtonList from "../Components/Buttons/PlayersButtonList";
import votationImg from '../../assets/images/votation2.png';
import { ThemeProvider } from "styled-components/native";
import { dark } from "../Themes/Dark";

export default function Votes({ navigation }) {
    const { currentGame } = useContext(GameContext);
    const currentPlayer = currentGame.getCurrentPlayer();
    const [targetPlayer, setTargetPlayer] = useState();
    const playerList = currentGame.getPlayers();

    function handleVote() {
        if (currentPlayer.isConfused()) {
            const randomPlayer = currentGame.getRandomPlayer();
            randomPlayer.addVote();
            currentPlayer.setConfused(false);
        }
        else if (currentPlayer.hasBuffedVote()) {
            targetPlayer.addDoubleVote();
        }
        else {
            targetPlayer.addVote();
        }
        passVotation();
    }

    function passVotation() {
        currentGame.setNextPlayer();

        if (currentGame.noNextPlayer()) {
            currentGame.removeMostVotedPlayer();
            currentGame.clearPlayersVotes();
            return navigation.navigate("VillageNews", { previousScreen: 'Votes' });
        }

        navigation.navigate('PassToPlayer', {
            previousScreen: 'Votes'
        });
    }

    return (
        <BackgroundImage source={votationImg}>
            <SpaceAroundContainer>
                <ThemeProvider theme={dark}>
                    {currentPlayer.isVoteBlocked() ? (
                        <>
                            <SubTitle style={{ marginTop: 160 }}>Seus votos estão bloqueados neste turno</SubTitle>
                            <DefaultButton title="Passar a vez" onPress={() => passVotation()} inverted={true} />
                        </>
                    ) : (
                        <>
                            <SubTitle style={{ marginTop: 160 }}>{currentPlayer.getName()}, escolha seu voto</SubTitle>
                            <PlayersButtonList
                                currentGame={currentGame}
                                playerList={playerList}
                                currentPlayer={currentPlayer}
                                targetPlayer={targetPlayer}
                                setTargetPlayer={setTargetPlayer}
                                inverted={false}
                            />
                            <VoteButtonsContainer>
                                <DefaultButton title="Abster-se" onPress={() => passVotation()} inverted={true} />
                                <DefaultButton title="Confirmar" onPress={() => handleVote()} disabled={!targetPlayer} inverted={true} />
                            </VoteButtonsContainer>
                        </>
                    )}
                </ThemeProvider>
            </SpaceAroundContainer>
        </BackgroundImage >
    );
}
