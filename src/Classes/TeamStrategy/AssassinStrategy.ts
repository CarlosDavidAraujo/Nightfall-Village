import TeamStrategy from "./TeamStrategy";

export default class AssassinStrategy extends TeamStrategy {
    public checkVictory(): boolean {
        const onePlayerAlive = this.game.alivePlayers.length === 1;
        const lastPlayerAlive = this.game.alivePlayers[0];
        return lastPlayerAlive.isAssassin() && onePlayerAlive;
    }

    public getVictoryMessage(): string {
        const lastPlayerAlive = this.game.alivePlayers[0];
        return `${lastPlayerAlive.getName()} venceu!`;
    }
}
