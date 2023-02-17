import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function Seer({ playerList, currentPlayer }) {
  const [message, setMessage] = useState();
  const [skillWasUsed, setSkillWasUsed] = useState(false);
  const [playersToChoose, setPlayersToChoose] = useState(null);
  const [playerWasChoosen, setPlayerWasChoosen] = useState(false);

  function handleRevelar() {
    setPlayersToChoose(playerList);
    setSkillWasUsed(true);
  }

  function handleChoosePlayer(otherPlayer) {
    setMessage(currentPlayer.getRole().revelar(otherPlayer));
    setPlayerWasChoosen(true);
  }

  function isNotCurrentPlayer(player) {
    return player.getName() !== currentPlayer.getName();
  }

  return (
    <View>
      {!skillWasUsed && (
        <>
          <Button title="Revelação" onPress={handleRevelar} />
        </>
      )}
      {playersToChoose &&
        playersToChoose.map((player, i) =>
          isNotCurrentPlayer(player) &&
          !playerWasChoosen && (
            <Button
              key={i}
              title={player.getName()}
              onPress={() => handleChoosePlayer(player)}
            />
          )
        )}
      {message && <Text>{message}</Text>}
    </View>
  );
}
