export default class VotingManager {
  constructor(game) {
    this.game = game;
    this.mostVotedPlayers = [];
  }

  clearPlayersVotes() {
    this.game.alivePlayers.forEach((player) => player.clearVotes());
  }

  updateMostVotedPlayers() {
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

  removeMostVotedPlayer() {
    this.updateMostVotedPlayers();
    if (this.didVoteTie()) {
      return this.game.news.setNews("A aldeia ficou indecisa!");
    }
    const mostVotedPlayer = this.mostVotedPlayers[0];
    mostVotedPlayer.sendLynchingMessage();
    this.updateAlivePlayers(mostVotedPlayer);
    this.game.deadPlayers.push(mostVotedPlayer);
    this.mostVotedPlayers = [];
  }

  didVoteTie() {
    return this.mostVotedPlayers.length != 1;
  }

  updateAlivePlayers(mostVotedPlayer) {
    this.game.alivePlayers = this.game.alivePlayers.filter(
      (player) => player.getID() !== mostVotedPlayer.getID()
    );
  }

  //------------VOTAÇÃO DOS LOBISOMENS-------------//

  removeWerewolfsVictim() {
    this.updateMostVotedPlayers();
    if (this.mostVotedPlayers.length === 0) {
      return;
    }
    this.resolveTieBreak();
    const tauntingPlayer = this.game.alivePlayers.find((player) =>
      player.hasTaunt()
    );
    const mostVotedPlayer = tauntingPlayer
      ? tauntingPlayer
      : this.mostVotedPlayers[0];
    if (
      mostVotedPlayer.getRoleName() === "Valentão" &&
      !mostVotedPlayer.isProtected()
    ) {
      mostVotedPlayer.dieAfterManyTurns(2);
      mostVotedPlayer.setInevitableDeath(true);
      return (this.mostVotedPlayers = []);
    }
    mostVotedPlayer.dieAfterManyTurns(1);
    this.mostVotedPlayers = [];
  }

  resolveTieBreak() {
    if (this.mostVotedPlayers.length > 1) {
      const randomIndex = Math.floor(
        Math.random() * this.mostVotedPlayers.length
      );
      const mostVotedPlayer = this.mostVotedPlayers[randomIndex];
      this.mostVotedPlayers = [mostVotedPlayer];
    }
  }
}
