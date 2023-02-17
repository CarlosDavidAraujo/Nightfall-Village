import React, { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import { View, Button, Text } from "react-native";
import bgImg from "../Images/playerSelection.png";
import PlusIcon from "../Components/PlusIcon";

export default function DefinePlayers({ navigation }) {
    const { currentGame } = useContext(GameContext);
    const [players, setPlayers] = useState([
        "jogador 1",
        "jogador 2",
        "jogador 3",
        "jogador 4",
    ]);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePlayerChange = (e, index) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = e.nativeEvent.text;
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
            navigation.navigate("DefineRoles");
        } else {
            setErrorMessage("É necessário ter pelo menos 4 jogadores.");
        }
    }

    return (
        <View>
            <Button
                title="Confirmar"
                onPress={() => handleDefinePlayers()}
            />
            <View>
                {players.map((player, i) => (
                    <View
                        key={i}
                        player={player}
                        onChange={(e) => handlePlayerChange(e, i)}
                        onClick={() => handleRemovePlayer(i)}
                    />
                ))}
                <View onPress={handleAddPlayer}>
                    <PlusIcon />
                    <Text>Adicionar jogador</Text>
                </View>
            </View>
            <Text>{errorMessage && <p>{errorMessage}</p>}</Text>
        </View>
    );
}
