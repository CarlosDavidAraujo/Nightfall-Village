export default class Role {
  constructor(
    name,
    team,
    species,
    interactWithDeadPlayers,
    roleImg,
    objective,
    firstSkill,
    secondSkill
  ) {
    this.currentGame = null;
    this.player = null;
    this.name = name;
    this.fakeName = {
      name: this.name, //inicia com nome original
      duration: 0,
      turnItWasFaked: 0,
    };
    this.team = team;
    this.species = species;
    this.interactWithDeadPlayers = interactWithDeadPlayers;
    this.roleImg = roleImg;
    this.objective = objective;
    this.firstSkill = firstSkill;
    this.secondSkill = secondSkill;
    this.disabledSkills = {
      1: {
        enableTurn: -1,
        turnItWasDisabled: -1,
      },
      2: {
        enableTurn: -1,
        turnItWasDisabled: -1,
      },
    };
  }

  //------------GETTERS E SETTERS BÁSICOS--------------//

  setCurrentGame(currentGame) {
    this.currentGame = currentGame;
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

  cantInteractWithDeadPlayers() {
    return (
      this.interactWithDeadPlayers === true &&
      this.currentGame.getDeadPlayers().length === 0
    );
  }

  //----------GERENCIAMENTO DE NOMES FALSOS------------//

  setFakeName(name, duration) {
    this.fakeName.name = name;
    this.fakeName.duration = duration * 2;
    this.fakeName.turnItWasFaked = this.currentGame.getCurrentTurn();
  }

  hasFakeName() {
    const { duration, turnItWasFaked } = this.fakeName;
    return duration + turnItWasFaked >= this.currentGame.getCurrentTurn();
  }

  getFakeName() {
    if (this.hasFakeName()) {
      return this.fakeName.name;
    }
    return this.name;
  }

  //---------------GERENCIAMENTO DE HABILIDADES--------------------//

  getSkillType() {
    return {
      isFirstSkillTargetType: this.firstSkill.isTargetType,
      isSecondSkillTargetType: this.secondSkill.isTargetType,
    };
  }

  disableSkill(skill, duration) {
    const currentTurn = this.currentGame.getCurrentTurn();
    const { enableTurn } = this.disabledSkills[skill];
    const newEnableTurn = duration * 2 + currentTurn;
    const longestDurationActive = enableTurn > newEnableTurn;
    this.disabledSkills[skill].enableTurn = longestDurationActive
      ? enableTurn
      : newEnableTurn;
    this.disabledSkills[skill].turnItWasDisabled = currentTurn;
  }

  isSkillDisabled(skill) {
    const { enableTurn, turnItWasDisabled } = this.disabledSkills[skill];
    const currentTurn = this.currentGame.getCurrentTurn();
    const inDisableRange = enableTurn >= currentTurn;
    return inDisableRange && turnItWasDisabled != currentTurn;
  }

  skillHasInvalidTargetOn(targetPlayer, chosenSkill) {
    return false;
  }
}
