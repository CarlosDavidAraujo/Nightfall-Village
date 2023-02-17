import React, { createContext, useState } from "react";
import Game from "../Classes/Game";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(new Game());

  return (
    <GameContext.Provider
      value={{
        currentGame,
        setCurrentGame,
        playerList: currentGame.getPlayers()
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
