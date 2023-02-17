import React, { useContext, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { GameContext } from "../Context/GameContext";
import bgImg from "../Images/playerSelection.png";
import villager from "../Images/villager.png";
import seer from "../Images/seer.png";
import hunter from "../Images/hunter.png";
import werewolf from "../Images/werewolf.png";


export default function DefineRoles({navigation})  {
  const { currentGame, setScreen } = useContext(GameContext);
  const [errorMessage, setErrorMessage] = useState();
  const [selectedRoles, setSelectedRoles] = useState({
    Aldeão: 2,
    Vidente: 1,
    Lobisomem: 1,
  });

  const roleIcons = {
    Aldeão: villager,
    Vidente: seer,
    Lobisomem: werewolf,
    Caçador: hunter,
  };

  const handleAddRoleCount = (roleName) => {
    setSelectedRoles({
      ...selectedRoles,
      [roleName]: selectedRoles[roleName] + 1,
    });
  };

  const handleRemoveRoleCount = (roleName) => {
    setSelectedRoles((prevSelectedRoles) => {
      const newSelectedRoles = { ...prevSelectedRoles };
      if (newSelectedRoles[roleName] > 0) {
        newSelectedRoles[roleName]--;
      }
      if (newSelectedRoles[roleName] === 0) {
        delete newSelectedRoles[roleName];
      }
      return newSelectedRoles;
    });
  };

  const handleAddRole = (roleName) => {
    if (!selectedRoles[roleName]) {
      setSelectedRoles({ ...selectedRoles, [roleName]: 1 });
    }
  };

  const startGame = () => {
    const error = currentGame.playersMatchRoles(selectedRoles);
    if (error) {
      return setErrorMessage(
        "A quantidade de jogadores e papéis devems ser iguais"
      );
    }
    currentGame.assignRoleToPlayer(selectedRoles);
    navigation.navigate("PassToPlayer");
  };

  const returnToPreviousScreen = () => {
    currentGame.clearPlayers();
    navigation.navigate("DefinePlayers");
  };

  return (
    <View>
      {errorMessage && <Text>{errorMessage}</Text>}
      <Text>Funções selecionadas</Text>
      <View>
        {Object.keys(selectedRoles).map((roleName, i) => (
          <View
            key={i}
            roleName={roleName}
            count={selectedRoles[roleName]}
            onPlus={() => handleAddRoleCount(roleName)}
            onMinus={() => handleRemoveRoleCount(roleName)}
            img={roleIcons[roleName]}
            selected={true}
          />
        ))}
      </View>
      <Text>Todas as funções</Text>
      <View>
        {Object.keys(roleIcons).map((roleName, i) => (
          <View
            onPress={() => handleAddRole(roleName)}
            key={i}
            roleName={roleName}
            img={roleIcons[roleName]}
          />
        ))}
      </View>
      <View>
        <Button title="Voltar" onPress={returnToPreviousScreen}/>
        <Button title='Confirmar' onPress={startGame}>Confirmar</Button>
      </View>
    </View>
  );
};

