import Game from "../Game";
import Player from "../Player";

export default class Role {
  protected currentGame: Game | null;
  protected player: Player | null;
  protected name: string;
  protected fakeName: { name: string; duration: number; turnItWasFaked: number };
  protected team: string;
  protected species: string;
  protected interactWithDeadPlayers: boolean;
  protected roleImg: string;
  protected objective: string;
  protected skills: {
    1: {
      name: string;
      description: string;
      icon: string;
      enableTurn: number;
      isTargetType: boolean;
      turnItWasDisabled: number;
    };
    2: {
      name: string;
      description: string;
      icon: string;
      enableTurn: number;
      isTargetType: boolean;
      turnItWasDisabled: number;
    };
  };
  constructor(
    name: string,
    team: string,
    species: string,
    interactWithDeadPlayers: boolean,
    roleImg: string,
    objective: string,
    skills: {
      1: {
        name: string;
        description: string;
        icon: string;
        enableTurn: number;
        isTargetType: boolean;
        turnItWasDisabled: number;
      };
      2: {
        name: string;
        description: string;
        icon: string;
        enableTurn: number;
        isTargetType: boolean;
        turnItWasDisabled: number;
      };
    }
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

  public setCurrentGame(currentGame: Game): void {
    this.currentGame = currentGame;
  }

  public getPlayer(): Player {
    return this.player!;
  }

  public setPlayer(player: Player): void {
    this.player = player;
  }

  public getName(): string {
    return this.name;
  }

  public getSpecies(): string {
    return this.species;
  }

  public getTeam(): string {
    return this.team;
  }

  public getRoleImg(): string {
    return this.roleImg;
  }

  public getObjective(): string {
    return this.objective;
  }

  public getSkillName(skill: number): string {
    return this.skills[skill].name;
  }

  public getSkillDescription(skill: number): string {
    return this.skills[skill].description;
  }

  public getSkillIcon(skill: number): string {
    return this.skills[skill].icon;
  }

  public canInteractWithDeadPlayers(): boolean {
    return (
      this.interactWithDeadPlayers === true &&
      this.currentGame!.getDeadPlayers().length > 0
    );
  }

  //----------GERENCIAMENTO DE NOMES FALSOS------------//

  public setFakeName(name: string, duration: number): void {
    this.fakeName.name = name;
    this.fakeName.duration = duration * 2;
    this.fakeName.turnItWasFaked = this.currentGame!.getCurrentTurn();
  }

  public hasFakeName(): boolean {
    const { duration, turnItWasFaked } = this.fakeName;
    return duration + turnItWasFaked >= this.currentGame!.getCurrentTurn();
  }

  public getFakeName(): string {
    if (this.hasFakeName()) {
      return this.fakeName.name;
    }
    return this.name;
  }

  //---------------GERENCIAMENTO DE HABILIDADES--------------------//

  public getSkillType(): {
    isFirstSkillTargetType: boolean;
    isSecondSkillTargetType: boolean;
  } {
    return {
      isFirstSkillTargetType: this.skills[1].isTargetType,
      isSecondSkillTargetType: this.skills[2].isTargetType,
    };
  }

  public disableSkill(skill: number, duration: number): void {
    const currentTurn = this.currentGame!.getCurrentTurn();
    const { enableTurn } = this.skills[skill];
    const newEnableTurn = duration * 2 + currentTurn;
    const longestDurationActive = enableTurn > newEnableTurn;
    this.skills[skill].enableTurn = longestDurationActive
      ? enableTurn
      : newEnableTurn;
    this.skills[skill].turnItWasDisabled = currentTurn;
  }

  public isSkillDisabled(skill: number): boolean {
    const { enableTurn, turnItWasDisabled } = this.skills[skill];
    const currentTurn = this.currentGame!.getCurrentTurn();
    const inDisableRange = enableTurn >= currentTurn;
    return inDisableRange && turnItWasDisabled != currentTurn;
  }

  public skillHasInvalidTargetOn(
    targetPlayer: Player,
    chosenSkill: number
  ): boolean {
    return false;
  }
}
