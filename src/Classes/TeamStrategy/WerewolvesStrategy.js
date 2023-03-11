import TeamStrategy from "./TeamStrategy";

export class WerewolvesStrategy extends TeamStrategy {
    checkVictory() {
        const onlyWerewolvesAlive = this.game.alivePlayers.every((player) =>
            player.belongsToWerewolvesTeam()
        );
        const solitaryWerewolfStrategy = new SolitaryWerewolfStrategy(this.game);
        const solitaryWerewolfWon = solitaryWerewolfStrategy.checkVictory();
        return onlyWerewolvesAlive && !solitaryWerewolfWon;
    }

    getVictoryMessage() {
        return 'Os lobisomens venceram!';
    }
}


export class SolitaryWerewolfStrategy extends TeamStrategy {
    checkVictory() {
        const onePlayerAlive = this.game.alivePlayers.length === 1;
        const lastPlayerAlive = this.game.alivePlayers[0];
        return onePlayerAlive && lastPlayerAlive.isLonelyWolf();
    }

    getVictoryMessage() {
        const lastPlayerAlive = this.game.alivePlayers[0];
        return `${lastPlayerAlive.name} venceu!`;
    }
}