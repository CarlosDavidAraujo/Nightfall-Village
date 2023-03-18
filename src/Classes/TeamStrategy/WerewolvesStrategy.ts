import TeamStrategy from "./TeamStrategy";

export class WerewolvesStrategy extends TeamStrategy {
  public checkVictory(): boolean {
    const onlyWerewolvesAlive = this.game.alivePlayers.every((player) =>
      player.belongsToWerewolvesTeam()
    );
    const solitaryWerewolfStrategy = new SolitaryWerewolfStrategy(this.game);
    const solitaryWerewolfWon = solitaryWerewolfStrategy.checkVictory();
    return onlyWerewolvesAlive && !solitaryWerewolfWon;
  }

  public getVictoryMessage(): string {
    return "Os lobisomens venceram!";
  }
}

export class SolitaryWerewolfStrategy extends TeamStrategy {
  public checkVictory(): boolean {
    const onePlayerAlive = this.game.alivePlayers.length === 1;
    const lastPlayerAlive = this.game.alivePlayers[0];
    return onePlayerAlive && lastPlayerAlive.isLonelyWolf();
  }

  public getVictoryMessage(): string {
    const lastPlayerAlive = this.game.alivePlayers[0];
    return `${lastPlayerAlive.getName()} venceu!`;
  }
}
