export default class Player {
    constructor(name) {
      this.name = name;
      this.votesCount = 0;
      this.protected = false;
      this.role = null;
      this.turnsToBlock = 1000; //as habilidades sao bloqueadas se chegar a zero
    }
  
    getName() {
      return this.name;
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
  
    addVote() {
      this.votesCount += 1;
    }
  
    clearVotes() {
      this.votesCount = 0;
    }
  
    setProtected(protectedState) {
      this.protected = protectedState;
    }
  
    isProtected() {
      return this.protected;
    }

    getTurnsToBlock() {
      return this.turnsToBlock;
    }

    setTurnsToBlock(value) {
      this.turnsToBlock = value;
    }

    isSkillsBlocked() {
      return this.turnsToBlock === 0;
    }

  }
  