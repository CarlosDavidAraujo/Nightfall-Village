import Game from './Game';
import Player from './Player';

export default class DeathManager {
    public game: Game;
    constructor(game: Game) {
        this.game = game;
    }

    //-----REMOÇÃO DE JOGADORES-----//
    
    public removePlayers() {
        this.game.alivePlayers.forEach((player) => {
            if (player.shouldDie() && player.hasProtector()) {
                const protector = player.getProtector();
                this.game.deadPlayers.push(protector);
                protector.resetAllStates();
                protector.sendDeathMessage();
            }
            else if (player.shouldDie()) {
                this.game.deadPlayers.push(player);
                player.resetAllStates();
                player.sendDeathMessage();
            }
        });
        this.updateAlivePlayers();
    }

    public updateAlivePlayers() {
        const remainingAlivePlayers = this.game.alivePlayers.filter(
            (player) => !this.game.deadPlayers.includes(player)
        );
        const noOneDied = this.game.alivePlayers.length === remainingAlivePlayers.length;
        if (noOneDied) {
            this.game.news.addNews("Noite de paz na vila.");
        }
        this.game.alivePlayers = remainingAlivePlayers;
    }

    //-----RESSURREIÇÃO DE JOGADORES-----//
    
    public revivePlayers() {
        this.game.deadPlayers.forEach((player) => {
            if (player.shouldResurrect()) {
                const insertionPosition = this.getInsertionPositionOfResurrected(player);
                this.insertPlayerInAlivePlayers(insertionPosition, player);
                player.resetAllStates();
                player.sendResurrectMessage();
            }
        });
        this.updateDeadPlayers();
    }

    public updateDeadPlayers() {
        this.game.deadPlayers = this.game.deadPlayers.filter(player => !player.shouldResurrect());
    }

    public getInsertionPositionOfResurrected(player: Player): number {
        const originalPlayerPositionInQueue = player.getID();
        const nearestPlayerPosition = this.game.alivePlayers.findIndex(
            (p) => p.getID() > originalPlayerPositionInQueue
        );
        const insertionIndex =
            nearestPlayerPosition !== -1
                ? nearestPlayerPosition
                : this.game.alivePlayers.length;
        return insertionIndex;
    }

    public insertPlayerInAlivePlayers(insertionPosition: number, player: Player) {
        this.game.alivePlayers.splice(insertionPosition, 0, player);
    }
}