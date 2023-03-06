import Undead from "./Roles/Undead";

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
    this.protectionBarrier = false;
    this.infected = false;
    this.deathTurn = null;
    this.resurrectTurn = null;
  }

  //------------GETTERS E SETTERS BÁSICOS----------//

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

  setProtected(value) {
    this.protected = this.isUndead() ? false : value;
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

  hasProtectionBarrier() {
    this.protectionBarrier === true;
  }

  setProtectionBarrier(value) {
    this.protectionBarrier = value;
  }

  setInfected(value) {
    this.infected = value;
  }

  isInfected() {
    return this.infected === true;
  }

  belongsToWerewolvesTeam() {
    return this.role.getTeam() === "Lobisomens";
  }

  belongsToVillagersTeam() {
    return this.role.getTeam() === "Aldeões";
  }

  belongsToUndeadsTeam() {
    return this.role.getTeam() === "Undeads";
  }

  isHuman() {
    return this.role.getSpecies() === "Human";
  }

  isWolf() {
    return this.role.getSpecies() === "Wolf";
  }

  isLonelyWolf() {
    return this.getRoleName() === "Lobisomem Solitário";
  }

  isUndead() {
    return this.role.getSpecies() === "Undead";
  }

  resetAllStates() {
    this.votesCount = 0;
    this.duplicatedVote = false;
    this.confused = false;
    this.protected = false;
    this.protector = null;
  }

  //----------MÉTODOS DE VOTOS------------//

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

  //-----------MÉTODOS DE REMOÇÃO-------------//

  shouldDie() {
    const currentTurn = this.currentGame.getCurrentTurn();
    return (
      currentTurn === this.deathTurn &&
      !this.isProtected() &&
      !this.isInfected()
    );
  }

  dieAfterManyTurns(turns) {
    if (this.getRole().protectionBarrier) {
      return (this.getRole().protectionBarrier = false);
    }
    const currentTurn = this.currentGame.getCurrentTurn();
    const currentDeathTurn = this.deathTurn;
    const newDeathTurn = turns * 2 + currentTurn - 1;
    this.deathTurn =
      newDeathTurn > currentDeathTurn ? newDeathTurn : currentDeathTurn;
  }

  sendDeathMessage() {
    const news = this.currentGame.getNews();
    news.addNews(
      `${this.name} morreu esta noite. Deve ficar calado até o fim do jogo.`
    );
  }

  sendLynchingMessage() {
    const news = this.currentGame.getNews();
    news.addNews(
      `A vila linchou ${this.name}. Deve ficar calado até o fim do jogo.`
    );
  }

  //----------MÉTODOS DE RESSURREIÇÃO------------//

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

  //------------TRANSFORMAÇÃO DE ZUMBIS------------//

  transformInUndead() {
    this.dieAfterManyTurns(2);
    this.disabledVoteDuration = 1000;
    this.infected = true;
    const undead = new Undead();
    undead.setCurrentGame(this.currentGame);
    undead.setPlayer(this);
    this.setRole(undead);
  }

  shouldBecomeUndead() {
    const currentTurn = this.currentGame.getCurrentTurn();
    const isAboutToDie =
      currentTurn + 1 === this.deathTurn && !this.isProtected();
    return isAboutToDie && this.isInfected();
  }
}
