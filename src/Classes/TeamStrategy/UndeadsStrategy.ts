import TeamStrategy from "./TeamStrategy";

export default class UndeadsStrategy extends TeamStrategy{
   public checkVictory(): boolean {
      const atLeastOneUndeadAlive = this.game.alivePlayers.some((player) =>
        player.belongsToUndeadsTeam()
      );
      const everyPlayerIsInfected = this.game.alivePlayers.every(
        (player) => player.isInfected() || player.belongsToUndeadsTeam()
      ) 
      return everyPlayerIsInfected && atLeastOneUndeadAlive;
    }

    public getVictoryMessage(): string {
        return 'Os mortos-vivos venceram!';
    }
  }