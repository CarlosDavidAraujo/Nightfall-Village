import TeamStrategy from "./TeamStrategy";

export default class AllDiedStrategy extends TeamStrategy {
    checkVictory() {
      return this.game.alivePlayers.length === 0;
    }

    getVictoryMessage() {
        return 'Todos morreram!';
    }
}