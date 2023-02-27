export default class Role {
  constructor(name, team, species, interactWithDeadPlayers, roleImg, objective, firstSkill, secondSkill) { //firstSkill e secondSkill devem ser dicionarios
    this.player = null;
    this.name = name;
    this.fakeName = {
      name: this.name,
      duration: 1000
    };
    this.team = team;
    this.species = species;
    this.interactWithDeadPlayers = interactWithDeadPlayers;
    this.roleImg = roleImg;
    this.objective = objective;
    this.firstSkill = firstSkill;
    this.secondSkill = secondSkill;
    this.blockedSkills = {
      1: {
        duration: 0,
        lastBlockedTurn: -1
      },
      2: {
        duration: 0,
        lastBlockedTurn: -1
      }
    }
  }

  getPlayer() {
    return this.player;
  }

  setPlayer(player) {
    this.player = player;
  }

  getName() {
    return this.name;
  }

  getSpecies() {
    return this.species;
  }

  cantInteractWithDeadPlayers(currentGame) {
    return this.interactWithDeadPlayers === true && currentGame.getDeadPlayers().length === 0;
  }

  //retorna uma nome falso para a role
  getFakeName() {
    return this.fakeName.name;
  }

  //atribui um nome falso à role e por quanto tempo durará
  setFakeName(value, duration) {
    this.fakeName.name = value;
    this.fakeName.duration = duration;
  }

  //verifica se está com um nome falso
  hasFakeName() {
    return this.fakeName.name !== this.name;
  }

  //auto explicativo hehe
  decreaseFakeNameDuration() {
    if (this.fakeName.duration <= 0) { //quando a duraçao acabar devolve o nome original
      this.fakeName.name = this.name;
      this.fakeName.duration = 1000;
    }

    this.fakeName.duration--;
  }

  getTeam() {
    return this.team;
  }

  getRoleImg() {
    return this.roleImg;
  }

  getObjective() {
    return this.objective;
  }

  getFirstSkillName() {
    return this.firstSkill.name;
  }

  getFirstSkillDescription() {
    return this.firstSkill.description;
  }

  getFirstSkillIcon() {
    return this.firstSkill.icon;
  }

  getSecondSkillName() {
    return this.secondSkill.name;
  }

  getSecondSkillDescription() {
    return this.secondSkill.description;
  }

  getSecondSkillIcon() {
    return this.secondSkill.icon;
  }

  getSkillTarget() {
    return {
      skill1IsTarget: this.firstSkill.target,
      skill2IsTarget: this.secondSkill.target,
    }
  }

  blockSkill(skill, duration, lastBlockedTurn) {
    this.blockedSkills[skill].duration = duration;
    this.blockedSkills[skill].lastBlockedTurn = lastBlockedTurn;
  }

  isSkillBlocked(skill, currentTurn) {
    const { duration, lastBlockedTurn } = this.blockedSkills[skill];
    return lastBlockedTurn < currentTurn && currentTurn <= lastBlockedTurn + duration;
  }
}
