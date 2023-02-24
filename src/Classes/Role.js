export default class Role {
  constructor(name, team, roleImg, objective, firstSkillName, firstSkillDescription, firstSkillIcon, secondSkillName, secondSkillDescription, secondSkillIcon) {
    this.player = null;
    this.name = name;
    this.fakeName = {
      name: this.name,
      duration: 1000
    };
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

  getPlayer() {
    return this.player;
  }

  setPlayer(player) {
    this.player = player;
  }

  getName() {
    return this.name;
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
