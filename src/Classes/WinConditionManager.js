import AllDiedStrategy from "./TeamStrategy/AllDiedStrategy";
import AssassinStrategy from "./TeamStrategy/AssassinStrategy";
import UndeadsStrategy from "./TeamStrategy/UndeadsStrategy";
import VillagersStrategy from "./TeamStrategy/VillagersStrategy";
import { SolitaryWerewolfStrategy, WerewolvesStrategy } from "./TeamStrategy/WerewolvesStrategy";

export default class WinConditionManager {
  constructor(game) {
    this.game = game;
    this.villagersStrategy = new VillagersStrategy(game);
    this.werewolvesStrategy = new WerewolvesStrategy(game);
    this.solitaryWerewolfStrategy = new SolitaryWerewolfStrategy(game);
    this.undeadsStrategy = new UndeadsStrategy(game);
    this.assassinStratagy = new AssassinStrategy(game);
    this.allDiedStrategy = new AllDiedStrategy(game);

    this.victoryConditions = {
      villagers: {
        winCondition: () => this.villagersStrategy.checkVictory(),
        victoryMessage: () => this.villagersStrategy.getVictoryMessage(),
      },
      werewolves: {
        winCondition: () => this.werewolvesStrategy.checkVictory(),
        victoryMessage: () => this.werewolvesStrategy.getVictoryMessage(),
      },
      solitaryWerewolf: {
        winCondition: () => this.solitaryWerewolfStrategy.checkVictory(),
        victoryMessage: () => this.solitaryWerewolfStrategy.getVictoryMessage(),
      },
      undeads: {
        winCondition: () => this.undeadsStrategy.checkVictory(),
        victoryMessage: () => this.undeadsStrategy.getVictoryMessage(),
      },
      assassin: {
        winCondition: () => this.assassinStratagy.checkVictory(),
        victoryMessage: () => this.assassinStratagy.getVictoryMessage(),
      },
      allDied: {
        winCondition: () => this.allDiedStrategy.checkVictory(),
        victoryMessage: () => this.allDiedStrategy.getVictoryMessage(),
      },
    };
  }

  getWinnerTeam() {
    for (const [team, checkVictoryCondition] of Object.entries(this.victoryConditions)) {
      if (checkVictoryCondition.winCondition()) {
        const victoryMessage = this.getVictoryMessage(team);
        this.game.news.setNews(victoryMessage);
        return team;
      }
    }
    return null;
  }

  getVictoryMessage(team) {
    return this.victoryConditions[team].victoryMessage();
  }
}
