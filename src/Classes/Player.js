export default class Player {
  constructor(name, ID, currentGame) {
    this.name = name; 
    this.ID = ID;
    this.role = null;
    this.currentGame = currentGame; 
    this.votesCount = 0; 
    this.duplicatedVote = false; 
    this.disabledVote = {
      duration: -1,
      turnItWasDisabled: -1
    }
    this.confused = false; 
    this.protected = false; 
    this.protector = null;
    this.markedForDeath = false; 
    this.markedForRess = false; 
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
      return player.votesCount += 2;
    }
    player.votesCount += 1;
  }

  disableVote(duration) { 
    this.disabledVote.duration = duration;
    this.disabledVote.turnItWasDisabled = this.currentGame.getCurrentTurn();
  }

  hasDisabledVote() {
    const { duration, turnItWasDisabled } = this.disabledVote; 
    return (duration + turnItWasDisabled) >= this.currentGame.getCurrentTurn(); 
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
    return this.player !== null;
  }

  isMarkedForDeath() { 
    return this.markedForDeath === true;
  }

  setMarkedForDeath(value) { 
    this.markedForDeath = value;
  }

  canBeRemoved() {
    return this.isMarkedForDeath() && !this.isProtected();
  }

  isMarkedForRess() { 
    return this.markedForRess === true;
  }

  setMarkedForRess(value) {
    this.markedForRess = value;
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

  resetAllStates() {
    this.votesCount = 0;
    this.duplicatedVote = false;
    this.confused = false;
    this.protected = false;
    this.protector = null;
    this.markedForDeath = false;
    this.markedForRess = false;
  }

  resetStatesInNightPhase() {
    this.votesCount = 0;
    this.protected = false;
    this.protector = null;
    this.markedForDeath = false;
    this.markedForRess = false;
  }

}
