import _ from "lodash";
import Crusader from "./Roles/Crusader";
import Doctor from "./Roles/Doctor";
import Hunter from "./Roles/Hunter";
import News from "./News";
import Player from "./Player";
import Scientist from "./Roles/Scientist";
import Seer from "./Roles/Seer";
import {Villager, OldMan} from "./Roles/Villager";
import { LonelyWerewolf, WereWolf } from "./Roles/Werewolf";
import Witch from "./Roles/Witch";
import Necromancer from "./Roles/Necromancer";
import Undead from "./Roles/Undead";
import DeathManager from "./DeathManager";
import VotingManager from "./VotingManager";
import WinConditionManager from "./WinConditionManager";

export default class Game {
  constructor() {
    this.alivePlayers = [];
    this.deadPlayers = [];
    this.news = new News();
    this.deathManager = new DeathManager(this);
    this.votingManager = new VotingManager(this);
    this.winConditionManager = new WinConditionManager(this);
    this.currentPlayerIndex = 0;
    this.currentTurn = 0; //noites acontecem em turnos pares e dias em turnos ímpares
    this.currentRoles = [];
    this.roleMap = [
      new Villager(),
      new Seer(),
      new WereWolf(),
      new Crusader(),
      new Doctor(),
      new Hunter(),
      new LonelyWerewolf(),
      new Necromancer(),
      new OldMan(),
      new Scientist(),
      new Witch(),
      new Undead(),
    ];
  }

  //--------GETTERS E SETTERS BÁSICOS---------//

  getNews() {
    return this.news;
  }

  getTurnNews() {
    return this.news.getNews();
  }

  clearTurnNews() {
    this.news.clearNews();
  }

  getCurrentTurn() {
    return this.currentTurn;
  }

  advanceTurn() {
    this.currentTurn = this.currentTurn + 1;
  }

  getRoleMap() {
    return this.roleMap;
  }

  getAlivePlayers() {
    return this.alivePlayers;
  }

  setAlivePlayers(players) {
    this.alivePlayers = [];
    players.forEach((player, index) => {
      this.alivePlayers.push(new Player(player, index, this));
    });
  }

  getRandomPlayer() {
    const randomIndex = Math.floor(Math.random() * this.alivePlayers.length);
    return this.alivePlayers[randomIndex];
  }

  getDeadPlayers() {
    return this.deadPlayers;
  }

  getCurrentPlayer() {
    return this.alivePlayers[this.currentPlayerIndex];
  }

  incrementCurrentPlayerIndex() {
    this.currentPlayerIndex++;
  }

  noNextPlayer() {
    let result = false;
    if (this.currentPlayerIndex > this.alivePlayers.length - 1) {
      this.currentPlayerIndex = 0;
      result = true;
    }
    return result;
  }

  //----------FUÇÕES AVANÇADAS DE CONFIGURAÇAO DA CLASSE------------//

  setRoles(selectedRoles) {
    this.currentRoles = [];
    selectedRoles.forEach((selectedRole) => {
      const { role, count } = selectedRole;
      for (let i = 0; i < count; i++) {
        this.currentRoles.push(role);
      }
    });
    this.currentRoles = _.shuffle(this.currentRoles);
  }

  assignRoleToPlayer(selectedRoles) {
    this.setRoles(selectedRoles);
    this.alivePlayers.forEach((player, i) => {
      const roleCopy = _.cloneDeep(this.currentRoles[i]);
      roleCopy.setCurrentGame(this);
      player.setRole(roleCopy);
      roleCopy.setPlayer(player);
    });
  }

  //--------------GERENCIAMENTO DE FIM DE TURNO------------------//

  resetAllPlayersStates() {
    this.alivePlayers.forEach(player => {
      player.resetAllStates();
    });
  }

  endDay() {
    this.votingManager.removeMostVotedPlayer();
    this.votingManager.clearPlayersVotes();
    this.resetAllPlayersStates();
    this.advanceTurn();
  }

  endNight() {
    this.votingManager.removeWerewolfsVictim();
    this.votingManager.clearPlayersVotes();
    this.advanceTurn();
    this.deathManager.removePlayers();
    this.deathManager.revivePlayers();
  }  
}
