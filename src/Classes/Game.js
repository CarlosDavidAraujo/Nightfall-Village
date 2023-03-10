import _ from "lodash";
import Crusader from "./Roles/Crusader";
import Doctor from "./Roles/Doctor";
import Hunter from "./Roles/Hunter";
import News from "./News";
import Player from "./Player";
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

export default class Game {
  constructor() {
    this.allPlayers = []
    this.alivePlayers = [];
    this.deadPlayers = [];
    this.news = new News();
    this.deathManager = new DeathManager(this);
    this.votingManager = new VotingManager(this);
    this.winConditionManager = new WinConditionManager(this);
    this.currentPlayerIndex = 0;
    this.currentTurn = 0; //noites acontecem em turnos pares e dias em turnos ímpares
    this.currentRoles = [];
    this.rolePreset = [
      new Villager(),
      new Seer(),
      new WereWolf(),
    ]
    this.roleMap = [
      {
        team: 'Aldeões',
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
        ]
      },
      {
        team: 'Lobisomens',
        data: [
          new WereWolf(),
          new LonelyWerewolf(),
          new Witch(),
        ]
      },
      {
        team: 'Mortos-vivos',
        data: [
          new Necromancer(),
          new Undead(),
        ]
      },
      {
        team: 'Solo',
        data: [new Assassin(),]
      }
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

  getRolePreset() {
    return this.rolePreset;
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
    return result || this.alivePlayers.length === 0;
  }

  //----------SETTERS DE PLAYERS E ROLES------------//

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
    this.allPlayers = this.alivePlayers;
  }

  //--------------GERENCIAMENTO DE FIM DE TURNO------------------//

  resetAllPlayersStates() {
    this.alivePlayers.forEach((player) => {
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
