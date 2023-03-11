import TeamStrategy from "./TeamStrategy";

export default class AssassinStrategy extends TeamStrategy {
    checkVictory() {
        const onePlayerAlive = this.game.alivePlayers.length === 1;
        const lastPlayerAlive = this.game.alivePlayers[0];
        return lastPlayerAlive.isAssassin() && onePlayerAlive;
    }

    getVictoryMessage() {
        const lastPlayerAlive = this.game.alivePlayers[0];
        return `${lastPlayerAlive.name} venceu!`;
    }
}
