export default class Role {
  constructor(
    name,
    team,
    species,
    interactWithDeadPlayers,
    roleImg,
    objective,
    skills
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
    this.skills = skills;
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

  getSkillName(skill) {
    return this.skills[skill].name;
  }

  getSkillDescription(skill) {
    return this.skills[skill].description;
  }

  getSkillIcon(skill) {
    return this.skills[skill].icon;
  }

  canInteractWithDeadPlayers() {
    return (
      this.interactWithDeadPlayers === true &&
      this.currentGame.getDeadPlayers().length > 0
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
      isFirstSkillTargetType: this.skills[1].isTargetType,
      isSecondSkillTargetType: this.skills[2].isTargetType,
    };
  }

  disableSkill(skill, duration) {
    const currentTurn = this.currentGame.getCurrentTurn();
    const { enableTurn } = this.skills[skill];
    const newEnableTurn = duration * 2 + currentTurn;
    const longestDurationActive = enableTurn > newEnableTurn;
    this.skills[skill].enableTurn = longestDurationActive
      ? enableTurn
      : newEnableTurn;
    this.skills[skill].turnItWasDisabled = currentTurn;
  }

  isSkillDisabled(skill) {
    const { enableTurn, turnItWasDisabled } = this.skills[skill];
    const currentTurn = this.currentGame.getCurrentTurn();
    const inDisableRange = enableTurn >= currentTurn;
    return inDisableRange && turnItWasDisabled != currentTurn;
  }

  skillHasInvalidTargetOn(targetPlayer, chosenSkill) {
    return false;
  }
}
