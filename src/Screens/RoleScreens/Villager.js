import React, { useState } from 'react';
import { Image, Text, View, Button } from 'react-native';
import villagerImg from '../../Images/villager.png';
import prayIcon from '../../Images/pray.png';
import keyHole from '../../Images/keyhole.png';


export default function Villager({ currentGame, playerList, currentPlayer }) {
  const [message, setMessage] = useState();
  const [skillWasUsed, setSkillWasUsed] = useState(false);
  const [playersToChoose, setPlayersToChoose] = useState(null);
  const [playerWasChoosed, setPlayerWasChoosed] = useState(false);

  function handleBisbilhotar() {
    const villager = currentPlayer.getRole();
    setMessage(villager.bisbilhotar(playerList, currentGame));
    setSkillWasUsed(true);
  }

  function handleOrar() {
    setPlayersToChoose(playerList);
    setSkillWasUsed(true);
  }

  function handleChoosePlayer(otherPlayer) {
    setMessage(currentPlayer.getRole().orar(otherPlayer));
    setPlayerWasChoosed(true);
  }

  return (
    <View>
      <Text>{currentPlayer.getRoleName()}</Text>
      <Image source={villagerImg} style={{ width: 250, height: 250 }} />
      <Text>Escolha uma habilidade</Text>
      {!skillWasUsed && (
        <View>
          <View>
            <Button
              title="Espiar"
              onClick={() => handleBisbilhotar()}
              icon={keyHole}
            />
            <Text>
              Há uma pequena chance de você descobrir um lobisomem, mas uma pequena chance de você morrer.
            </Text>
          </View>
          <View>
            <Button
              title="Rezar"
              onClick={() => handleOrar()}
            />
            <Text>
              Escolha outro jogador. Há uma pequena chance dele ser protegido esta noite.
            </Text>
          </View>
        </View>
      )}
      {playersToChoose &&
        playersToChoose.map(
          (player, i) =>
            player.getName() !== currentPlayer.getName() &&
            !playerWasChoosed && (
              <Button key={i} title={player.getName()} onPress={() => handleChoosePlayer(player)} />
            )
        )}
      <Text>{message}</Text>
    </View>
  );
}
