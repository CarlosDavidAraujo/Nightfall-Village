import React, { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import { BackgroundImage, DefaultText, SpaceBetweenContainer, SubTitle } from "../Styles";
import AddPlayerButton from "../Components/Buttons/AddPlayerButton";
import bgImg from "../../assets/images/playersUnited.png";
import PlayerCard from "../Components/Cards/PlayerCard";
import { ThemeProvider } from "styled-components/native";
import DefaultButton from "../Components/Buttons/DefaultButton";
import { dark } from "../Themes/Dark";
import { ScrollView } from "react-native";
import { SimpleGrid } from "react-native-super-grid";

export default function DefinePlayers({ navigation }) {
    const { currentGame } = useContext(GameContext);
    const [players, setPlayers] = useState([
        "Jogador 1",
        "Jogador 2",
        "Jogador 3",
        "Jogador 4",
    ]);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePlayerChange = (text, index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = text;
        setPlayers(updatedPlayers);
    };

    const handleAddPlayer = () => {
        setPlayers([...players, `Jogador ${players.length + 1}`]);
    };

    const handleRemovePlayer = (index) => {
        const updatedPlayers = [...players];
        setPlayers(updatedPlayers.filter((_, i) => i !== index));
    };

    function handleDefinePlayers() {
        if (emptyName() && players.length < 4) {
            return setErrorMessage("Dê um nome para cada jogador! É necessário ter pelo menos 4 jogadores!");
        }
        else if (players.length < 4) {
            return setErrorMessage("É necessário ter pelo menos 4 jogadores!");
        }
        else if (emptyName()) {
            return setErrorMessage("Dê um nome para cada jogador!");
        }
        currentGame.setPlayers(players);
        navigation.navigate("DefineRoles", {
            playerList: currentGame.getPlayers()
        });
    }

    const emptyName = () => {
        let result = false;
        players.forEach(player => {
            if (player === '') {
                result = true;
            }
        });
        return result
    }

    return (
        <BackgroundImage source={bgImg}>
            <SpaceBetweenContainer>
                <ThemeProvider theme={dark}>
                    <SubTitle>Adicione jogadores</SubTitle>
                </ThemeProvider>
                <ScrollView style={{ width: '100%' }}>
                    <SimpleGrid
                        itemDimension={90}
                        maxItemsPerRow={3}
                        data={[...players, 'add']}
                        spacing={5}
                        renderItem={({ item, index }) => (
                            item === 'add' ? (
                                <AddPlayerButton onPress={() => handleAddPlayer()} />
                            ) : (
                                <PlayerCard
                                    value={item}
                                    onPress={() => handleRemovePlayer(index)}
                                    onChangeText={(text) => handlePlayerChange(text, index)}
                                />
                            )
                        )}
                    />
                </ScrollView>
                <ThemeProvider theme={dark}>
                    <DefaultText style={{ marginBottom: 10 }}>{errorMessage}</DefaultText>
                </ThemeProvider>
                <DefaultButton title="Confirmar" onPress={() => handleDefinePlayers()} style={{width: '100%'}}/>
            </SpaceBetweenContainer>
        </BackgroundImage >
    );
}
