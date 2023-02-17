import React, { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import { View, Text, Button } from "react-native";

export default function Votes({navigation}) {
    const { currentGame, playerList } = useContext(GameContext);
    const [currentPlayer, setCurrentPlayer] = useState(currentGame.getCurrentPlayer());

    function handleVote(player) {
        if (player) {
            player.addVote();
        }

        currentGame.passToNextPlayer();
        setCurrentPlayer(currentGame.getCurrentPlayer());

        if (currentGame.noNextPlayer()) {
            currentGame.removeMostVotedPlayer();
            currentGame.clearPlayersVotes();
            navigation.navigate("VillageNews", {previousScreen: 'Votes'});
        }
    }

    return (
        <View>
            <Text>{currentPlayer.getName()}, escolha seu voto</Text>
            {playerList.map((player, i) => (
                <Button
                    title={player.getName()}
                    key={i}
                    onPress={() => handleVote(player)}
                />
            ))}
            <Button title="Abster-se" onPress={() => handleVote(null)} />
        </View>
    );
}
