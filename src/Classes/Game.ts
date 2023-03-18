import _ from "lodash";
import Crusader from "./Roles/Crusader";
import Doctor from "./Roles/Doctor";
import Hunter from "./Roles/Hunter";
import News from "./News";
import Player from "./Player";
import Role from "../Classes/Roles/Role";
import Scientist from "./Roles/Scientist";
import Seer from "./Roles/Seer";
import { Villager, OldMan } from "./Roles/Villager";
import { LonelyWerewolf, WereWolf } from "./Roles/Werewolf";
import Witch from "./Roles/Witch";
import Necromancer from "./Roles/Necromancer";
import Undead from "./Roles/Undead";
import Assassin from "./Roles/Assassin";
import DeathManager from "./DeathManager";
import VotingManager from "./VotingManager";
import WinConditionManager from "./WinConditionManager";
import Priest from "./Roles/Priest";
import ToughGuy from "./Roles/ToughGuy";
import Gunslinger from "./Roles/Gunslinger";

interface RoleData {
  team: string;
  data: Role[];
}

interface SelectedRole {
  role: Role;
  count: number;
}

export default class Game {
  public allPlayers: Player[];
  public alivePlayers: Player[];
  public deadPlayers: Player[];
  public news: News;
  public deathManager: DeathManager;
  public votingManager: VotingManager;
  public winConditionManager: WinConditionManager;
  private currentPlayerIndex: number;
  private currentTurn: number;
  public currentRoles: Role[];
  public rolePreset: Role[];
  public roleMap: RoleData[];
  constructor() {
    this.allPlayers = [];
    this.alivePlayers = [];
    this.deadPlayers = [];
    this.news = new News();
    this.deathManager = new DeathManager(this);
    this.votingManager = new VotingManager(this);
    this.winConditionManager = new WinConditionManager(this);
    this.currentPlayerIndex = 0;
    this.currentTurn = 0; //noites acontecem em turnos pares e dias em turnos ímpares
    this.currentRoles = [];
    this.rolePreset = [new Villager(), new Seer(), new WereWolf()];
    this.roleMap = [
      {
        team: "Aldeões",
        data: [
          new Villager(),
          new Seer(),
          new Doctor(),
          new Crusader(),
          new Gunslinger(),
          new Hunter(),
          new OldMan(),
          new Priest(),
          new Scientist(),
          new ToughGuy(),
        ],
      },
      {
        team: "Lobisomens",
        data: [new WereWolf(), new LonelyWerewolf(), new Witch()],
      },
      {
        team: "Mortos-vivos",
        data: [new Necromancer(), new Undead()],
      },
      {
        team: "Solo",
        data: [new Assassin()],
      },
    ];
  }

  //--------GETTERS E SETTERS BÁSICOS---------//

  public getNews(): News {
    return this.news;
  }

  public getTurnNews(): string[] {
    return this.news.getNews();
  }

  public clearTurnNews(): void {
    this.news.clearNews();
  }

  public getCurrentTurn(): number {
    return this.currentTurn;
  }

  public advanceTurn() {
    this.currentTurn = this.currentTurn + 1;
  }

  public getRoleMap(): RoleData[] {
    return this.roleMap;
  }

  public getRolePreset(): Role[] {
    return this.rolePreset;
  }

  public getAlivePlayers(): Player[] {
    return this.alivePlayers;
  }

  public setAlivePlayers(players: string[]) {
    this.alivePlayers = [];
    players.forEach((player: string, index) => {
      this.alivePlayers.push(new Player(player, index, this));
    });
  }

  public getRandomPlayer(): Player {
    const randomIndex = Math.floor(Math.random() * this.alivePlayers.length);
    return this.alivePlayers[randomIndex];
  }

  public getDeadPlayers(): Player[] {
    return this.deadPlayers;
  }

  public getCurrentPlayer(): Player {
    return this.alivePlayers[this.currentPlayerIndex];
  }

  public incrementCurrentPlayerIndex() {
    this.currentPlayerIndex++;
  }

  public noNextPlayer(): boolean {
    let result = false;
    if (this.currentPlayerIndex > this.alivePlayers.length - 1) {
      this.currentPlayerIndex = 0;
      result = true;
    }
    return result || this.alivePlayers.length === 0;
  }

  //----------SETTERS DE PLAYERS E ROLES------------//

  public setRoles(selectedRoles: SelectedRole[]) {
    this.currentRoles = [];
    selectedRoles.forEach((selectedRole) => {
      const { role, count } = selectedRole;
      for (let i = 0; i < count; i++) {
        this.currentRoles.push(role);
      }
    });
    this.currentRoles = _.shuffle(this.currentRoles);
  }

  public assignRoleToPlayer(selectedRoles: SelectedRole[]) {
    this.setRoles(selectedRoles);
    this.alivePlayers.forEach((player, i) => {
      const roleCopy = _.cloneDeep(this.currentRoles[i]);
      roleCopy.setCurrentGame(this);
      player.setRole(roleCopy);
      roleCopy.setPlayer(player);
    });
    this.allPlayers = this.alivePlayers;
  }

  //--------------GERENCIAMENTO DE FIM DE TURNO------------------//

  public resetAllPlayersStates() {
    this.alivePlayers.forEach((player) => {
      player.resetAllStates();
    });
  }

  public endDay() {
    this.votingManager.removeMostVotedPlayer();
    this.resetAllPlayersStates();
    this.advanceTurn();
  }

  public endNight() {
    this.votingManager.setWerewolfsVictim();
    this.advanceTurn();
    this.deathManager.removePlayers();
    this.deathManager.revivePlayers();
  }
}
