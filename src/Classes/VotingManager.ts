import Game from './Game';
import Player from './Player';

export default class VotingManager {
  private game: Game;
  private mostVotedPlayers: Player[];
  constructor(game: Game) {
    this.game = game;
    this.mostVotedPlayers = [];
  }

  public clearPlayersVotes() {
    this.game.alivePlayers.forEach((player) => player.clearVotes());
  }

  private updateMostVotedPlayers() {
    let maxVotes = 0;
    this.game.alivePlayers.forEach((player) => {
      if (player.getVotesCount() > maxVotes) {
        maxVotes = player.getVotesCount();
        this.mostVotedPlayers = [player];
      } else if (player.getVotesCount() === maxVotes && maxVotes > 0) {
        this.mostVotedPlayers.push(player);
      }
    });
  }

  //-----------VOTAÇÃO DA VILA---------//

  public removeMostVotedPlayer() {
    this.updateMostVotedPlayers();
    if (this.didVoteTie()) {
      return this.game.news.setNews("A aldeia ficou indecisa!");
    }
    const mostVotedPlayer = this.mostVotedPlayers[0];
    mostVotedPlayer.sendLynchingMessage();
    this.updateAlivePlayers(mostVotedPlayer);
    this.game.deadPlayers.push(mostVotedPlayer);
    this.mostVotedPlayers = [];
    this.clearPlayersVotes();
  }

  private didVoteTie(): boolean {
    return this.mostVotedPlayers.length != 1;
  }

  private updateAlivePlayers(mostVotedPlayer: Player) {
    this.game.alivePlayers = this.game.alivePlayers.filter(
      (player) => player.getID() !== mostVotedPlayer.getID()
    );
  }

  //------------VOTAÇÃO DOS LOBISOMENS-------------//

  public setWerewolfsVictim() {
    this.updateMostVotedPlayers();
    if (this.mostVotedPlayers.length === 0) {
      return;
    }
    this.resolveTieBreak();
    const tauntingPlayer = this.game.alivePlayers.find((player) =>
      player.hasTaunt()
    );
    const mostVotedPlayer = tauntingPlayer? tauntingPlayer : this.mostVotedPlayers[0];
    if (
      mostVotedPlayer.getRoleName() === "Valentão" &&
      !mostVotedPlayer.isProtected()
    ) {
      mostVotedPlayer.dieAfterManyTurns(2);
      mostVotedPlayer.setInevitableDeath(true);
      this.mostVotedPlayers = [];
      return;
    }
    mostVotedPlayer.dieAfterManyTurns(1);
    this.mostVotedPlayers = [];
    this.clearPlayersVotes();
  }

  private resolveTieBreak() {
    if (this.mostVotedPlayers.length > 1) {
      const randomIndex = Math.floor(
        Math.random() * this.mostVotedPlayers.length
      );
      const mostVotedPlayer = this.mostVotedPlayers[randomIndex];
      this.mostVotedPlayers = [mostVotedPlayer];
    }
  }
}
