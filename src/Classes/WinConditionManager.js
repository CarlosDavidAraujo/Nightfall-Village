export default class WinConditionManager {
    constructor(game) {
        this.game = game;
    }

    getWinnerTeam() {
        const remainingWerewolves = this.game.alivePlayers.filter(player => player.isWolf());

        const victoryConditions = {
            "villagers": () => !this.game.alivePlayers.some(player => !player.belongsToVillagersTeam()),
            "werewolves": () => !this.game.alivePlayers.some(player => !player.belongsToWerewolvesTeam()),
            "solitaryWerewolf": () => remainingWerewolves.length === 1 && remainingWerewolves[0].isLonelyWolf(),
            "undeads": () => this.game.alivePlayers.every(player => player.isInfected() || player.belongsToUndeadsTeam()),
        };

        for (const [team, checkVictoryCondition] of Object.entries(victoryConditions)) {
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
            default:
                return null;
        }
    }

}