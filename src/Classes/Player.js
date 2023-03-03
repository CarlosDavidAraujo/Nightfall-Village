import Zombie from "./Roles/Zombie";

export default class Player {
  constructor(name, ID, currentGame) {
    this.name = name;
    this.ID = ID;
    this.role = null;
    this.currentGame = currentGame;
    this.votesCount = 0;
    this.disabledVoteDuration = 0;
    this.duplicatedVote = false;
    this.confused = false;
    this.protected = false;
    this.protector = null;
    this.infected = false;
    this.deathTurn = null;
    this.resurrectTurn = null;
  }

  dieAfterManyTurns(turns) {
    const currentTurn = this.currentGame.getCurrentTurn();
    this.deathTurn = turns * 2 + currentTurn - 1;
  }

  sendDeathMessage() {
    const news = this.currentGame.getNews();
    news.addNews(
      `${this.name} morreu esta noite. Deve ficar calado até o fim do jogo.`
    );
  }

  shouldDie() {
    const currentTurn = this.currentGame.getCurrentTurn();
    return currentTurn === this.deathTurn &&!this.isProtected();
  }

  transformInZombie() {
    this.dieAfterManyTurns(2);
    const zombie = new Zombie();
    zombie.setCurrentGame(this.currentGame);
    zombie.setPlayer(this);
    this.setRole(zombie);
  }

  remove() {
    if (this.shouldDie()) {
      this.resetAllStates();
      this.sendDeathMessage();
      const deadPlayers = this.currentGame.getDeadPlayers();
      deadPlayers.push(this);
    }
  }

  resurrectAfterManyTurns(turns) {
    const currentTurn = this.currentGame.getCurrentTurn();
    this.resurrectTurn = turns * 2 + currentTurn - 1;
  }

  sendResurrectMessage() {
    const news = this.currentGame.getNews();
    news.addNews(`${this.name} foi ressuscitado.`);
  }

  shouldResurrect() {
    const currentTurn = this.currentGame.getCurrentTurn();
    return currentTurn === this.resurrectTurn;
  }

  getName() {
    return this.name;
  }

  getID() {
    return this.ID;
  }

  getRole() {
    return this.role;
  }

  setRole(role) {
    this.role = role;
  }

  getRoleName() {
    return this.role.getName();
  }

  getVotesCount() {
    return this.votesCount;
  }

  clearVotes() {
    this.votesCount = 0;
  }

  setDuplicatedVote(value) {
    this.duplicatedVote = value;
  }

  hasDuplicatedVote() {
    return this.duplicatedVote === true;
  }

  setConfused(value) {
    this.confused = value;
  }

  isConfused() {
    return this.confused === true;
  }

  voteOn(targetPlayer) {
    let player = targetPlayer;
    if (this.isConfused()) {
      player = this.currentGame.getRandomPlayer();
    }
    if (this.hasDuplicatedVote()) {
      return (player.votesCount += 2);
    }
    player.votesCount += 1;
  }

  setDisabledVoteDuration(duration) {
    const currentTurn = this.currentGame.getCurrentTurn();
    this.disabledVoteDuration = duration * 2 + currentTurn - 1;
  }

  hasDisabledVote() {
    return this.disabledVoteDuration >= this.currentGame.getCurrentTurn();
  }

  setProtected(value) {
    this.protected = value;
  }

  isProtected() {
    return this.protected === true;
  }

  getProtector() {
    return this.protector;
  }

  setProtector(player) {
    this.protector = player;
  }

  hasProtector() {
    return this.protector !== null;
  }

  setInfected(value) {
    this.setInfected = value;
  }

  isMarkedForRess() {
    return this.markedForRess === true;
  }

  setMarkedForRess(value) {
    this.markedForRess = value;
  }

  belongsToWerewolfsTeam() {
    return this.role.getTeam() === "Lobisomens";
  }

  belongsToVillagersTeam() {
    return this.role.getTeam() === "Aldeões";
  }

  isHuman() {
    return this.role.getSpecies() === "Human";
  }

  isWolf() {
    return this.role.getSpecies() === "Wolf";
  }

  resetAllStates() {
    this.votesCount = 0;
    this.duplicatedVote = false;
    this.confused = false;
    this.protected = false;
    this.protector = null;
  }
}
