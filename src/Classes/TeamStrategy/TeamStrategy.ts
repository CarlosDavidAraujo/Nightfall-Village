import Game from '../Game';

export default class TeamStrategy {
    protected game: Game;
    
    constructor(game: Game) {
        this.game = game;
    }

    public checkVictory(): boolean {
        return false;
    }

    public getVictoryMessage(): string {
        return "";
    }
}