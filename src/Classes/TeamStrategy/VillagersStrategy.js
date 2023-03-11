import TeamStrategy from "./TeamStrategy";

export default class VillagersStrategy extends TeamStrategy {
    checkVictory() {
        const allEnemysDead = !this.game.alivePlayers.some(
            (player) => player.isWolf() || player.getRoleName() === "Assassino em Série"
        );
        const villagersStillAlive = this.game.alivePlayers.some(player => player.belongsToVillagersTeam());
        return allEnemysDead && villagersStillAlive;
    }

    getVictoryMessage() {
        return 'Os aldeões venceram';
    }
}