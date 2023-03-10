import React, { useContext, useState } from "react";
import { GameContext } from "../Context/GameContext";
import {
  BackgroundImage,
  DefaultText,
  SpaceBetweenContainer,
  SubTitle,
} from "../Styles";
import AddPlayerButton from "../Components/Buttons/AddPlayerButton";
import bgImg from "../../assets/images/playersUnited.png";
import PlayerCard from "../Components/Cards/PlayerCard";
import { ThemeProvider } from "styled-components/native";
import DefaultButton from "../Components/Buttons/DefaultButton";
import { dark, invertTheme } from "../Themes/Dark";
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

  const addPlayer = () => {
    setPlayers([...players, `Jogador ${players.length + 1}`]);
  };

  const removePlayer = (index) => {
    const updatedPlayers = [...players];
    setPlayers(updatedPlayers.filter((_, i) => i !== index));
  };

  const emptyName = () => {
    return players.some((player) => player === "");
  };

  const validatePlayers = () => {
    if (emptyName()) {
      return "Dê um nome para cada jogador!";
    }
    if (players.length < 4) {
      return "É necessário ter pelo menos 4 jogadores!";
    }
    return "";
  };

  const handlePlayerNameChange = (text, index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = text;
    setPlayers(updatedPlayers);
  };

  const handleDefinePlayers = () => {
    const error = validatePlayers();
    if (error) {
      return setErrorMessage(error);
    }
    currentGame.setAlivePlayers(players);
    navigation.navigate("DefineRoles");
  };

  return (
    <ThemeProvider theme={invertTheme(dark)}>
      <BackgroundImage source={bgImg}>
        <SpaceBetweenContainer>
          <ScrollView style={{ width: "100%" }}>
            <SimpleGrid
              itemDimension={90}
              maxItemsPerRow={3}
              data={[...players, "add"]}
              spacing={5}
              renderItem={({ item, index }) =>
                item === "add" ? (
                  <AddPlayerButton onPress={() => addPlayer()} />
                ) : (
                  <PlayerCard
                    value={item}
                    onPress={() => removePlayer(index)}
                    onChangeText={(text) => handlePlayerNameChange(text, index)}
                  />
                )
              }
            />
          </ScrollView>
          <ThemeProvider theme={dark}>
            <DefaultText style={{ marginBottom: 10 }}>
              {errorMessage}
            </DefaultText>
          </ThemeProvider>
          <DefaultButton
            title="Confirmar"
            onPress={() => handleDefinePlayers()}
            style={{ width: "100%" }}
          />
        </SpaceBetweenContainer>
      </BackgroundImage>
    </ThemeProvider>
  );
}
