export default class Role {
  constructor(name, team, roleImg, objective, firstSkillName, firstSkillDescription, firstSkillIcon, secondSkillName, secondSkillDescription, secondSkillIcon) {
    this.name = name;
    this.fakeName = this.name;
    this.turnsWithFakeName = 0;
    this.team = team;
    this.roleImg = roleImg;
    this.objective = objective;
    this.firstSkillName = firstSkillName;
    this.firstSkillIcon = firstSkillIcon;
    this.firstSkillDescription = firstSkillDescription;
    this.secondSkillName = secondSkillName;
    this.secondSkillDescription = secondSkillDescription;
    this.secondSkillIcon = secondSkillIcon;
  }

  getName() {
    return this.name;
  }

  getFakeName() {
    return this.fakeName;
  }

  setFakeName(value) {
    this.fakeName = value;
  }

  getTurnsWithFakeName() {
    return this.turnsWithFakeName;
  }

  setTurnsWithFakeName(value) {
    this.turnsWithFakeName = value;
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
    return this.firstSkillName;
  }

  getFirstSkillDescription() {
    return this.firstSkillDescription;
  }

  getFirstSkillIcon() {
    return this.firstSkillIcon;
  }

  getSecondSkillName() {
    return this.secondSkillName;
  }

  getSecondSkillDescription() {
    return this.secondSkillDescription;
  }

  getSecondSkillIcon() {
    return this.secondSkillIcon;
  }

}
