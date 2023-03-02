export default class Role {
  constructor(
    currentGame,
    name,
    team,
    species,
    interactWithDeadPlayers,
    roleImg,
    objective,
    firstSkill,
    secondSkill
  ) {
    this.currentGame = currentGame;
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
        duration: 0,
        turnItWasDisabled: -1,
      },
      2: {
        duration: 0,
        turnItWasDisabled: -1,
      },
    };
  }

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

  cantInteractWithDeadPlayers() {
    return (
      this.interactWithDeadPlayers === true &&
      this.currentGame.getDeadPlayers().length === 0
    );
  }

  setFakeName(name, duration) {
    this.fakeName.name = name;
    this.fakeName.duration = duration;
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

  getSkillType() {
    return {
      isFirstSkillTargetType: this.firstSkill.isTargetType,
      isSecondSkillTargetType: this.secondSkill.isTargetType,
    };
  }

  disableSkill(skill, duration) {
    this.disabledSkills[skill].duration = duration;
    this.disabledSkills[skill].turnItWasDisabled =
      this.currentGame.getCurrentTurn();
  }

  isSkillDisabled(skill) {
    const { duration, turnItWasDisabled } = this.disabledSkills[skill];
    const currentTurn = this.currentGame.getCurrentTurn();
    const hasNotBeenBlockedThisTurn = turnItWasDisabled < currentTurn;
    const isInTheBlockRange = currentTurn <= turnItWasDisabled + duration;
    return hasNotBeenBlockedThisTurn && isInTheBlockRange;
  }

  skillHasInvalidTargetOn(targetPlayer, chosenSkill) {
    return false;
  }
}
