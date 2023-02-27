export default class Player {
  constructor(name, ID) {
    this.name = name; //guarda o nome do jogador
    this.ID = ID;
    this.votesCount = 0; //guarda o número de votos que o jogador recebeu
    this.doubleVote = false; //estado de voto com peso 2
    this.blockedVote = {
      duration: 0,
      lastBlockedVoteTurn: 0
    }
    this.confused = false; //estado de voto aleatório
    this.protected = false; //condiçao de proteçao do jogador
    this.markedForDeath = false; //condigçao de morte do jogador
    this.markedForRess = false; //marca um jogador para ser revivido ao final do turno
    this.role = null; //guarda a role do jogador
  }

  getName() {
    return this.name;
  }

  getID() {
    return this.ID;
  }

  setRole(role) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }

  getRoleName() {
    return this.role.getName();
  }

  getVotesCount() { 
    return this.votesCount;
  }

  setDoubleVote(value) {
    this.doubleVote = value;
  }

  hasDoubleVote() {
    return this.doubleVote === true;
  }

  setConfused(value) {
    this.confused = value;
  }

  isConfused() {
    return this.confused === true;
  }

  voteOn(targetPlayer, playerList) {
    let otherPlayer = targetPlayer;
    if (this.isConfused()) {
      const randomIndex = Math.floor(Math.random() * playerList.length);
      otherPlayer = playerList[randomIndex];
    }
    if (this.hasDoubleVote()) {
      return otherPlayer.votesCount += 2;
    }
    otherPlayer.votesCount += 1;
  }

  clearVotes() { 
    this.votesCount = 0;
  }

  blockVote(duration, currentTurn) { //bloqueia os votos pela quantidade de turnos determinada
    this.blockedVote.duration = duration;
    this.blockedVote.lastBlockedVoteTurn = currentTurn;
  }

  hasBlockedVote(currentTurn) {
    const { duration, lastBlockedVoteTurn } = this.blockedVote;
    return (duration + lastBlockedVoteTurn) >= currentTurn + 1; //adiciona 1 para permitir o bloqueio de voto no mesmo turno em que a habildiade de bloqueio for usada
  }

  setProtected(protectedState) { 
    this.protected = protectedState;
  }

  isProtected() { 
    return this.protected;
  }

  isMarkedForDeath() { 
    return this.markedForDeath === true;
  }

  setMarkedForDeath(value) { 
    this.markedForDeath = value
  }

  isMarkedForRess() { 
    return this.markedForRess === true;
  }

  setMarkedForRess(value) {
    this.markedForRess = value
  }

  belongsToWerewolfsTeam() {
    return this.role.getTeam() === 'Lobisomens';
  }

  belongsToVillagersTeam() {
    return this.role.getTeam() === 'Aldeões';
  }

  isHuman() {
    return this.role.getSpecies() === 'Human';
  }

  isWolf() {
    return this.role.getSpecies() === 'Wolf';
  }

  reset() {
    this.votesCount = 0;
    this.blockedVoteDuration = 0;
    this.doubleVote = false;
    this.confused = false;
    this.protected = false;
    this.protector = null;
    this.markedForDeath = false;
    this.markedForRess = false;
    this.blockedNextTurn = false;
    this.blockedSkills = {
      skill1: 0,
      skill2: 0,
    }
  }

}
