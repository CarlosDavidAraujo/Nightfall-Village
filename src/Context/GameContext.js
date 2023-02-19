import React, { createContext, useState } from "react";
import Game from "../Classes/Game";
import { useFonts, NewRocker_400Regular } from '@expo-google-fonts/new-rocker';
import AppLoading from 'expo-app-loading';

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(new Game());
  return (
    <GameContext.Provider
      value={{
        currentGame,
        setCurrentGame,
        playerList: currentGame.getPlayers(),
        currentPlayer: currentGame.getCurrentPlayer()
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

