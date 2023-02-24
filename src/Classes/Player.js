export default class Player {
  constructor(name) {
    this.name = name; // guarda o nome do jogador
    this.votesCount = 0; // guarda o número de votos que o jogador recebeu
    this.blockedVoteDuration = 0; //guarda por quantos turnos o jogador nao pode votar
    this.protected = false; // condiçao de proteçao do jogador
    this.protector = null; // recebe um outro player que protegeu este jogador// so é usado em classes que se scrificam, como o cruzado
    this.markedForDeath = false; //condigçao de morte do jogador
    this.role = null; // guarda a role do jogador
    this.blockedNextTurn = false;
    this.blockedSkills = { //armazena qual habilidade esta bloqueada e por quantos turnos
      skill1: 0,
      skill2: 0,
    }
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

  // retorna o nome da role do jogador
  getRoleName() { 
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

  blockVote(duration) { //bloqueia os votos pela quantidade de turnos determinada
    this.blockedVoteDuration = duration;
  }

  decreaseBlockedVoteDuration() {
    this.blockedVoteDuration--;
  }

  isVoteBlocked() {
    return this.blockedVoteDuration > 0;
  }

  setProtected(protectedState) { // define se o jogador está protegido ou não
    this.protected = protectedState;
  }

  isProtected() { // retorna se o jogador está protegido ou não
    return this.protected;
  }

  //retorna o protetor do jogador, por enquanto somente o cruzado pode ser um protetor
  getProtector() {
    return this.protector;
  }

  //atribui o protetor
  setProtector(player) {
    this.protector = player;
  }

  //Metodo para sacrificar o cruzado
  //sacrifica o jogador removendo protecao e marcando para morte
  sacrifice() {
    this.protected = false;
    this.markedForDeath = true;
  }

  isMarkedForDeath() { //retorna se esta marcado para morrer
    return this.markedForDeath === true;
  }

  setMarkedForDeath(value) { //atribui a marca
    this.markedForDeath = value
  }

  //Metodo para bloquear habilidades
  blockSkill(skill, duration) {
    const { skill1, skill2 } = this.blockedSkills;
    if (skill === 1 && duration > skill1) {   //verifica qual habilidade esta sendo bloqueada e se ja nao existe uma duraçao maior,                                                      
      this.blockedSkills.skill1 = duration;  //evitando sobrescreve-la com uma duração menor do que a que ja esta em andamento
    } else if (skill === 2 && duration > skill2) {
      this.blockedSkills.skill2 = duration;
    }
  }

  //decrementa a duraçao do bloqueio
  decreaseSkillBlockDuration() {
    this.blockedSkills.skill1--
    this.blockedSkills.skill2--
  }

  //verifica se existem habilidades a serem bloqueadas
  thereAreSkillsToBlock() {
    return this.blockedSkills.skill1 > 0 || this.blockedSkills.skill2 > 0;
  }

  //verifica se a habilidade especificada esta bloqueada
  isSkillBlocked(skill) {
    if (skill === 1) {
      return this.blockedSkills.skill1 > 0 && this.blockedNextTurn;
    } else if (skill === 2) {
      return this.blockedSkills.skill2 > 0 && this.blockedNextTurn;
    }
  }

  //verifica se o jogador estava bloqueado este turno
  wasBlockedThisTurn() {
    return this.blockedNextTurn;
  }

  //bloqueia o jogador no proximo turno
  setBlockedNextTurn(value) {
    this.blockedNextTurn = value;
  }
}
