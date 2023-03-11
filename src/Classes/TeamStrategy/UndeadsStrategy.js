import TeamStrategy from "./TeamStrategy";

export default class UndeadsStrategy extends TeamStrategy{
    checkVictory() {
      const atLeastOneUndeadAlive = this.game.alivePlayers.some((player) =>
        player.belongsToUndeadsTeam()
      );
      const everyPlayerIsInfected = this.game.alivePlayers.every(
        (player) => player.isInfected() || player.belongsToUndeadsTeam()
      ) 
      return everyPlayerIsInfected && atLeastOneUndeadAlive;
    }

    getVictoryMessage() {
        return 'Os mortos-vivos venceram!';
    }
  }