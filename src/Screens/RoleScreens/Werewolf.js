import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import werewolfImg from '../../Images/werewolf.png';

export default function WereWolf({ currentGame, playerList, currentPlayer }) {
  const [skillWasUsed, setSkillWasUsed] = useState(false);
  const [skillWasChosen, setSkillWasChosen] = useState(false);
  const [targetPlayer, setTargetPlayer] = useState();

  function handleDevorar() {
    const werewolf = currentPlayer.getRole();
    werewolf.devorar(targetPlayer, currentGame);
    setSkillWasUsed(true);
  }

  function isCurrentPlayer(player) {
    return player.getName() === currentPlayer.getName();
  }

  function isWerewolf(player) {
    return player.getRole().getName() === 'Lobisomem';
  }

  return (
    <View>
      <Text>{currentPlayer.getRoleName()}</Text>
      <Image source={werewolfImg} />
      <Text>Escolha uma habilidade</Text>
      {!skillWasUsed && (
        <View>
          <Text>
            Clique em devorar para escolher o jogador que você quer eliminar esta noite, depois clique em confirmar e termine a vez.
          </Text>
          <Button title="Devorar" onPress={() => setSkillWasChosen(true)} />
          {playerList.map((player, i) => (
            !isCurrentPlayer(player) && (
              <Button
                key={i}
                title={player.getName() + (isWerewolf(player) ? ' (Lobisomem)' : '')}
                onPress={() => setTargetPlayer(player)}
                disabled={isCurrentPlayer(player) || isWerewolf(player) || !skillWasChosen}
                style={targetPlayer === player ? { backgroundColor: 'yellow' } : {}}
              />
            )
          ))}
          <Button title="Confirmar" onPress={() => handleDevorar()} />
        </View>
      )}
    </View>
  );
}
