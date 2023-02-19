import React, { useContext, useState } from "react";
import { View, Button, Text, StyleSheet, FlatList, ImageBackground } from "react-native";
import { GameContext } from "../Context/GameContext";
import bgImg from "../Images/playerSelection.png";
import villager from "../Images/villager.png";
import seer from "../Images/seer.png";
import hunter from "../Images/hunter.png";
import werewolf from "../Images/werewolf.png";
import RoleCard from "../Components/Cards/RoleCard";
import styled from "styled-components/native";
import DefaultButton from "../Components/Buttons/DefaultButton";

const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 40px 10px;
`;

const Content = styled.View`
    flex: 1;
`;

const NavigationButtons = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ErrorText = styled.Text`
    color: white;
    font-size: 18px;
`;

const allRoles = ["Aldeão", "Vidente", "Lobisomem", "Caçador"];

export default function DefineRoles({ route, navigation }) {
  const { currentGame, setScreen } = useContext(GameContext);
  const {playerList} = route.params;
  const [errorMessage, setErrorMessage] = useState();
  const [selectedRoles, setSelectedRoles] = useState([
    { role: "Aldeão", count: 2 },
    { role: "Vidente", count: 1 },
    { role: "Lobisomem", count: 1 }
  ]);

  const roleIcons = {
    Aldeão: villager,
    Vidente: seer,
    Lobisomem: werewolf,
    Caçador: hunter,
  };

  const handleIncreaseRoleCount = (roleIndex) => {
    setSelectedRoles((prevSelectedRoles) => {
      const newSelectedRoles = [...prevSelectedRoles];
      newSelectedRoles[roleIndex] = {
        ...newSelectedRoles[roleIndex],
        count: newSelectedRoles[roleIndex].count + 1,
      };
      return newSelectedRoles;
    });
  };

  const handleDecreaseRoleCount = (roleIndex) => {
    setSelectedRoles((prevSelectedRoles) => {
      const newSelectedRoles = [...prevSelectedRoles];
      if (newSelectedRoles[roleIndex].count > 0) {
        newSelectedRoles[roleIndex] = {
          ...newSelectedRoles[roleIndex],
          count: newSelectedRoles[roleIndex].count - 1,
        };
      }
      if (newSelectedRoles[roleIndex].count === 0) {
        newSelectedRoles.splice(roleIndex, 1);
      }
      return newSelectedRoles;
    });
  };

  const handleAddRole = (roleName) => {
    const index = selectedRoles.findIndex((r) => r.role === roleName);
    if (index === -1) {
      setSelectedRoles([...selectedRoles, { role: roleName, count: 1 }]);
    }
  };

  const startGame = () => {
    let totalRoles = 0;
    selectedRoles.forEach(selectedRole => {
      const { count } = selectedRole;
      totalRoles = totalRoles + count;
    });
    if (totalRoles !== currentGame.getPlayers().length) {
      return setErrorMessage(
        "A quantidade de jogadores e papéis devems ser iguais"
      );
    }
    currentGame.assignRoleToPlayer(selectedRoles);
    navigation.navigate("PassToPlayer", {
      playerList: currentGame.getPlayers()
    });
  };

  const returnToPreviousScreen = () => {
    currentGame.clearPlayers();
    navigation.navigate("DefinePlayers");
  };

  return (
    <ImageBackground source={bgImg} resizeMode='cover' style={{flex: 1}}>
      <Container>
        {errorMessage && <ErrorText style={{ fontFamily: 'NewRocker_400Regular' }}>{errorMessage}</ErrorText>}
        <Text>Funções selecionadas</Text>
        <Content>
          <FlatList
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            data={selectedRoles}
            numColumns={3}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) =>
              <RoleCard
                style={{
                  marginLeft: index % 3 !== 0 ? 5 : 0,
                }}
                roleName={item.role}
                count={item.count}
                onIncrease={() => handleIncreaseRoleCount(index)}
                onDecrease={() => handleDecreaseRoleCount(index)}
                img={roleIcons[item.role]}
                selected={true}
              />
            }
          />
          <Text>Todas as funções</Text>
          <FlatList
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            data={(allRoles)}
            numColumns={3}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) =>
              <RoleCard
                style={{
                  marginLeft: index % 3 !== 0 ? 5 : 0,
                }}
                roleName={item}
                img={roleIcons[item]}
                onPress={() => handleAddRole(item)}
              />
            }
          />
          <NavigationButtons>
            <DefaultButton title="Voltar" onPress={returnToPreviousScreen} />
            <DefaultButton title='Confirmar' onPress={() => startGame()} />
          </NavigationButtons>
        </Content>
      </Container>
    </ImageBackground>
  );
}

