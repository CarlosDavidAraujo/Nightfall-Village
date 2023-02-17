import React, { useContext, useState } from "react";
import { Text, View, Button } from "react-native";
import { GameContext } from "../Context/GameContext";

export default function PassToPlayer({navigation}) {
  const { currentGame, setScreen } = useContext(GameContext);
  const [ready, setReady] = useState(false);
  const currentPlayerName = currentGame.getCurrentPlayer().getName();

  return (
    <View>
      {ready ? (
        <>
          <Text>{currentPlayerName}</Text>
          <Button
            title="Mostrar função"
            onPress={() => navigation.navigate("PlayerAction")}
          />
        </>
      ) : (
        <>
          <Text>Passe para {currentPlayerName}</Text>
          <Button
            title="Clique quando estiver pronto"
            onPress={() => setReady(true)}
          />
        </>
      )}
    </View>
  );
}
