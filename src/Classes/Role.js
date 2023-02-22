export default class Role {
  constructor(name, team, roleImg, objective, firstSkillName, firstSkillDescription, firstSkillIcon, firstSkillLocked, secondSkillName, secondSkillDescription, secondSkillIcon) {
    this.name = name;
    this.fakeName = this.name;
    this.turnsWithFakeName = 0;
    this.team = team;
    this.roleImg = roleImg;
    this.objective = objective;
    this.firstSkillName = firstSkillName;
    this.firstSkillIcon = firstSkillIcon;
    this.firstSkillDescription = firstSkillDescription;
    this.firstSkillLocked = firstSkillLocked;
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

  getFirstSkillLocked() {
    return this.firstSkillLocked;
  }

  setFirstSkillLocked(value) {
    this.firstSkillLocked = value;
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
