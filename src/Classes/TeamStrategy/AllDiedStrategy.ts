import TeamStrategy from "./TeamStrategy";

export default class AllDiedStrategy extends TeamStrategy {
    public checkVictory(): boolean {
      return this.game.alivePlayers.length === 0;
    }

    public getVictoryMessage(): string {
        return 'Todos morreram!';
    }
}