import React, { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import { ImageBackground } from "react-native";
import AddPlayerButton from "../Components/Buttons/AddPlayerButton";
import bgImg from "../Images/playerSelection.png";
import PlayerCard from "../Components/Cards/PlayerCard";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import DefaultButton from "../Components/Buttons/DefaultButton";

const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: #C2BB93;
`;

const Background = styled.ImageBackground`
    flex: 1;
    align-items: center;
    padding: 40px 10px;
`;

const Content = styled.View`
    flex: 1;
    margin-top: 10%;
`;

const ErrorText = styled.Text`
    color: white;
    font-size: 18px;
`;

export default function DefinePlayers({ navigation }) {
    const { currentGame } = useContext(GameContext);
    const [players, setPlayers] = useState([
        "jogador 1",
        "jogador 2",
        "jogador 3",
        "jogador 4",
    ]);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePlayerChange = (text, index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = text;
        setPlayers(updatedPlayers);
    };

    const handleAddPlayer = () => {
        setPlayers([...players, `jogador ${players.length + 1}`]);
    };

    const handleRemovePlayer = (index) => {
        const updatedPlayers = [...players];
        setPlayers(updatedPlayers.filter((_, i) => i !== index));
    };

    function handleDefinePlayers() {
        if (players.length >= 4) {
            currentGame.setPlayers(players);
            navigation.navigate("DefineRoles", {
                playerList: currentGame.getPlayers()
            });
        } else {
            setErrorMessage("É necessário ter pelo menos 4 jogadores.");
        }
    }

    return (

        <Container>
            <Background source={bgImg} resizeMode={'cover'}>
                <DefaultButton title="Confirmar" onPress={() => handleDefinePlayers()}style={{alignSelf: 'flex-end'}}/>
                <Content>
                    <FlatList
                        data={[...players, 'add']}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            item === 'add' ? (
                                <AddPlayerButton onPress={() => handleAddPlayer()} />
                            ) : (
                                <PlayerCard
                                    value={item}
                                    onPress={() => handleRemovePlayer(index)}
                                    onChangeText={(text) => handlePlayerChange(text, index)}
                                />
                            )
                        }
                    />
                </Content>
                {errorMessage && <ErrorText style={{ fontFamily: 'NewRocker_400Regular' }}>{errorMessage}</ErrorText>}
            </Background>
        </Container >

    );
}
