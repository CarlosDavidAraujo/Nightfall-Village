import News from "./News";

export default class Player {
  constructor(name, ID) {
    this.name = name; //guarda o nome do jogador
    this.ID = ID;
    this.votesCount = 0; //guarda o número de votos que o jogador recebeu
    this.blockedVoteDuration = 0; //guarda por quantos turnos o jogador nao pode votar
    this.buffedVote = false; //estado de voto amplificado
    this.confused = false; //estado de voto aleatório
    this.protected = false; //condiçao de proteçao do jogador
    this.protector = null; //recebe um outro player que protegeu este jogador// so é usado em classes que se scrificam, como o cruzado
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

  addDoubleVote() {
    this.votesCount += 2;
  }

  setBuffedVote(value) {
    this.buffedVote = value;
  }

  hasBuffedVote() {
    return this.buffedVote === true;
  }

  setConfused(value) {
    this.confused = value;
  }

  isConfused() {
    return this.confused === true;
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

  isMarkedForRess() { //retorna se esta marcado para morrer
    return this.markedForRess === true;
  }

  setMarkedForRess(value) { //atribui a marca
    this.markedForRess = value
  }

  //usado nso casos em que o jogador é ressuscitar
  reset() {
    this.votesCount = 0;
    this.blockedVoteDuration = 0;
    this.buffedVote = false;
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

}
