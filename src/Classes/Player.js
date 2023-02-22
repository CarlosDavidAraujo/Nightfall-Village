export default class Player {
  constructor(name) {
    this.name = name; // guarda o nome do jogador
    this.votesCount = 0; // guarda o número de votos que o jogador recebeu
    this.protected = false; // guarda se o jogador está protegido
    this.markedForDeath = false;
    this.role = null; // guarda a role do jogador
    this.blockedSkill = 0 // guarda qual habilidade está bloqueada: 0 para nenhuma/ 1 para a primeira/ 2 para a segunda/ 3 para ambas
    this.permaBlockedSkill = 0 // guarda qual habilidade está permanentemente bloqueada: 0 para nenhuma/ 1 para a primeira/ 2 para a segunda/ 3 para ambas
    this.turnsToBlock = 1000; // as habilidades são bloqueadas se chegar a zero
  }

  getName() { // retorna o nome do jogador
    return this.name;
  }

  setRole(role) { // atribui a role do jogador
    this.role = role;
  }

  getRole() { // retorna a role do jogador
    return this.role;
  }

  getRoleName() { // retorna o nome da role do jogador
    return this.role.getName();
  }

  getVotesCount() { // retorna o número de votos que o jogador recebeu
    return this.votesCount;
  }

  addVote() { // adiciona um voto ao jogador
    this.votesCount += 1;
  }

  clearVotes() { // zera o número de votos que o jogador recebeu
    this.votesCount = 0;
  }

  setProtected(protectedState) { // define se o jogador está protegido ou não
    this.protected = protectedState;
  }

  isProtected() { // retorna se o jogador está protegido ou não
    return this.protected;
  }

  isMarkedForDeath() { //retorna se esta marcado para morrer
    return this.markedForDeath === true;
  }

  setMarkedForDeath(value) { //atribui a marca
    this.markedForDeath = value
  }

  getBlockedSkill() { // retorna qual habilidade está bloqueada
    return this.blockedSkill;
  }

  setBlockedSkill(skill, turns) { // define qual habilidade será bloqueada e por quantos turnos
    this.blockedSkill = skill;
    this.turnsToBlock = turns
  }

  getTurnsToBlock() { // retorna quantos turnos faltam para bloquear as habilidades
    return this.turnsToBlock;
  }

  setTurnsToBlock(value) { // define quantos turnos faltam para bloquear as habilidades
    this.turnsToBlock = value;
  }

  isFirstSkillBlocked() { // retorna se a primeira habilidade está bloqueada ou não
    const isSkill1Blocked = this.blockedSkill === 1 || this.blockedSkill === 3 && this.turnsToBlock === 0; // verifica se a primeira habilidade está temporariamente bloqueada
    const isSkill1PermaBlocked = this.permaBlockedSkill === 1 || this.permaBlockedSkill === 3; // verifica se a primeira habilidade está permanentemente bloqueada
    return isSkill1Blocked || isSkill1PermaBlocked;
  }

  isSecondSkillBlocked() {
    const isSkill2Blocked = this.blockedSkill === 2 || this.blockedSkill === 3 && this.turnsToBlock === 0;
    const isSkill2PermaBlocked = this.permaBlockedSkill === 2 || this.permaBlockedSkill === 3;
    return isSkill2Blocked || isSkill2PermaBlocked;
  }

  getPermaBlockedSkill() {
    return this.permaBlockedSkill;
  }

  setPermaBlockedSkill(skill) {
    this.permaBlockedSkill = skill;
  }
}
