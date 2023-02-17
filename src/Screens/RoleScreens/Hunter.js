import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Hunter({ currentGame, playerList, currentPlayer }) {
  const [skillWasUsed, setSkillWasUsed] = useState(false);
  const [skillWasChosen, setSkillWasChosen] = useState(false);
  const [targetPlayer, setTargetPlayer] = useState();

  function handleAtirar() {
    currentPlayer.getRole().atirar(targetPlayer, currentGame);
    setSkillWasUsed(true);
  }

  function isCurrentPlayer(player) {
    return player.getName() === currentPlayer.getName();
  }

  return (
    <View>
      {!skillWasUsed && (
        <View>
          <Text>
            Clique em atirar, em seguida escolha o jogador que deseja eliminar,
            mas cuidado para não escolher um incocente. Você pode terminar a vez
            se não tiver certeza do seu alvo.
          </Text>
          <TouchableOpacity onPress={() => setSkillWasChosen(true)}>
            <Text>Atirar</Text>
          </TouchableOpacity>
          {playerList.map(
            (player, i) =>
              !isCurrentPlayer(player) && (
                <TouchableOpacity
                  key={i}
                  onPress={() => setTargetPlayer(player)}
                  disabled={isCurrentPlayer(player) || !skillWasChosen}
                  style={
                    targetPlayer === player ? { backgroundColor: "yellow" } : {}
                  }
                >
                  <Text>{player.getName()}</Text>
                </TouchableOpacity>
              )
          )}
          <TouchableOpacity onPress={() => handleAtirar()}>
            <Text>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
