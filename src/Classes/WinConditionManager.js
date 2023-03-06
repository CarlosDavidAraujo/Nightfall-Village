export default class WinConditionManager {
  constructor(game) {
    this.game = game;
  }

  getWinnerTeam() {
    const remainingWerewolves = this.game.alivePlayers.filter((player) =>
      player.isWolf()
    );
    const allEnemysDead = !this.game.alivePlayers.some(
      (player) =>
        player.isWolf() || player.getRoleName() === "Assassino em Série"
    );
    const onlyWerewolvesAlive = this.game.alivePlayers.every((player) =>
      player.belongsToWerewolvesTeam()
    );
    const atLeastOneUndeadAlive = this.game.alivePlayers.some((player) =>
      player.belongsToUndeadsTeam()
    );
    const onlyOnePlayerAlive = this.game.alivePlayers.length === 1;
    const atLeastOnePlayerAlive = this.game.alivePlayers.length >= 1;
    const allNonAssassinPlayersDied = this.game.alivePlayers.every(
      (player) => player.getRoleName() === "Assassino em Série"
    );
    const everyPlayerIsDead = this.game.alivePlayers.length === 0;

    const victoryConditions = {
      villagers: () => allEnemysDead && atLeastOnePlayerAlive,
      werewolves: () => onlyWerewolvesAlive && atLeastOnePlayerAlive,
      solitaryWerewolf: () =>
        remainingWerewolves.length === 1 &&
        remainingWerewolves[0].isLonelyWolf(),
      undeads: () =>
        this.game.alivePlayers.every(
          (player) => player.isInfected() || player.belongsToUndeadsTeam()
        ) && atLeastOneUndeadAlive,
      assassin: () => onlyOnePlayerAlive && allNonAssassinPlayersDied,
      allDied: () => everyPlayerIsDead,
    };

    for (const [team, checkVictoryCondition] of Object.entries(
      victoryConditions
    )) {
      if (checkVictoryCondition()) {
        const victoryMessage = this.getVictoryMessage(team);
        this.game.news.setNews(victoryMessage);
        return team;
      }
    }

    return null;
  }

  getVictoryMessage(team) {
    switch (team) {
      case "villagers":
        return "Os aldeões venceram!";
      case "werewolves":
        return "Os lobisomens venceram!";
      case "solitaryWerewolf":
        return "O lobisomem solitário venceu!";
      case "undeads":
        return "Os mortos-vivos venceram!";
      case "assassin":
        return "O assassino em série venceu!";
      case "allDied":
        return "Todos morreram!";
      default:
        return null;
    }
  }
}
