import _ from "lodash";
import Crusader from "./Roles/Crusader";
import Doctor from "./Roles/Doctor";
import Hunter from "./Roles/Hunter";
import News from "./News";
import Player from "./Player";
import Scientist from "./Roles/Scientist";
import Seer from "./Roles/Seer";
import Villager from "./Roles/Villager";
import { LonelyWerewolf, WereWolf } from "./Roles/Werewolf";
import Witch from "./Roles/Witch";
import Necromancer from "./Roles/Necromancer";

export default class Game {
  constructor() {
    this.alivePlayers = [];
    this.deadPlayers = [];
    this.mostVotedPlayers = [];
    this.currentPlayerIndex = 0;
    this.currentTurn = 0;
    this.news = new News();
    this.currentRoles = [];
    this.roleMap = [
      new Villager(this),
      new Seer(this),
      new WereWolf(this),
      new Crusader(this),
      new Doctor(this),
      new Hunter(this),
      new LonelyWerewolf(this),
      new Necromancer(),
      new Scientist(this),
      new Witch(this),
    ];
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

  clearPlayers() {
    this.alivePlayers = [];
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

  resetAllPlayersStates() {
    this.alivePlayers.forEach((player) => {
      player.resetAllStates();
    });
  }

  removeKilledPlayers(player) {
    if (player.canBeRemoved()) {
      this.news.addNews(player.getDeathMessage());
      player.remove();
    }
  }

  removePlayersProtectors(player) {
    if (player.hasAProtectorToRemove()) {
      const protector = player.getProtector();
      this.news.addNews(protector.getDeathMessage());
      protector.remove();
    }
  }

  removeDeadPlayersFromAlivePlayers() {
    const remainingAlivePlayers = this.alivePlayers.filter(
      (player) => !this.deadPlayers.includes(player)
    );
    const noOneDied = this.alivePlayers.length === remainingAlivePlayers.length;
    if (noOneDied) {
      this.news.addNews("Noite de paz na vila.");
    }
    this.alivePlayers = remainingAlivePlayers;
  }

  removePlayers() {
    this.alivePlayers.forEach((player) => {
      this.removeKilledPlayers(player);
      this.removePlayersProtectors(player);
    });
    this.removeDeadPlayersFromAlivePlayers();
  }

  endTurn() {
    this.removeMostVotedPlayer();
    this.resetAllPlayersStates();
    this.advanceTurn();
  }

  endNight() {
    this.setMostVotedPlayerByWerewolfs();
    this.removePlayers();
    this.revivePlayers();
    this.alivePlayers.forEach((player) => player.clearVotes());
  }

  removeResurrectedPlayerFromDeadPlayers() {
    const updatedDeadPlayers = this.deadPlayers.filter(
      (player) => !player.isMarkedForRess()
    );
    this.deadPlayers = updatedDeadPlayers;
  }

  getInsertionPositionOfResurrected(player) {
    const originalPlayerPositionInQueue = player.getID();
    const nearestPlayerPosition = this.alivePlayers.findIndex(
      (p) => p.getID() > originalPlayerPositionInQueue
    );
    const insertionIndex =
      nearestPlayerPosition !== -1
        ? nearestPlayerPosition
        : this.alivePlayers.length;
    return insertionIndex;
  }

  insertPlayerInAlivePlayers(insertionPosition, player) {
    this.alivePlayers.splice(insertionPosition, 0, player);
    this.news.addNews(`${player.getName()} foi ressuscitado!`);
  }

  revivePlayers() {
    this.deadPlayers.forEach((player) => {
      if (player.isMarkedForRess()) {
        const insertionPosition =
          this.getInsertionPositionOfResurrected(player);
        this.insertPlayerInAlivePlayers(insertionPosition, player);
        player.setMarkedForRess(false);
      }
    });
    this.removeResurrectedPlayerFromDeadPlayers();
  }

  setMostVotedPlayers() {
    let maxVotes = 0;
    this.alivePlayers.forEach((player) => {
      if (player.getVotesCount() > maxVotes) {
        maxVotes = player.getVotesCount();
        this.mostVotedPlayers = [player];
      } else if (player.getVotesCount() === maxVotes && maxVotes > 0) {
        this.mostVotedPlayers.push(player);
      }
    });
  }

  didVoteTie() {
    return this.mostVotedPlayers.length != 1;
  }

  updateAlivePlayersWithoutMostVotedPlayer(mostVotedPlayer) {
    const updatedAlivePlayers = this.alivePlayers.filter(
      (player) => player.getName() !== mostVotedPlayer.getName()
    );
    this.alivePlayers = updatedAlivePlayers;
  }

  removeMostVotedPlayer() {
    this.setMostVotedPlayers();
    if (this.didVoteTie()) {
      return this.news.setNews("A aldeia ficou indecisa!");
    }
    const mostVotedPlayer = this.mostVotedPlayers[0];
    this.updateAlivePlayersWithoutMostVotedPlayer(mostVotedPlayer);
    this.deadPlayers.push(mostVotedPlayer);
    this.news.addNews(
      `${mostVotedPlayer.getName()} foi morto pela aldeia. Deve ficar calado até o fim do jogo.`
    );
    this.mostVotedPlayers = [];
  }

  setMostVotedPlayerByWerewolfs() {
    this.setMostVotedPlayers();
    if (this.mostVotedPlayers.length === 0) {
      return;
    }
    this.resolveTieBreak();
    const mostVotedPlayer = this.mostVotedPlayers[0];
    mostVotedPlayer.setMarkedForDeath(true);
    this.mostVotedPlayers = [];
  }

  resolveTieBreak() {
    if (this.mostVotedPlayers.length > 1) {
      const randomIndex = Math.floor(
        Math.random() * this.mostVotedPlayers.length
      );
      const mostVotedPlayer = this.mostVotedPlayers[randomIndex];
      this.mostVotedPlayers = [mostVotedPlayer];
    }
  }

  getNews() {
    return this.news;
  }

  getTurnNews() {
    return this.news.getNews();
  }

  clearTurnNews() {
    this.news.clearNews();
  }

  getWinnerTeam() {
    let winner = null;

    const remainingVillagers = this.alivePlayers.filter((player) =>
      player.belongsToVillagersTeam()
    );
    const remainingWerewolves = this.alivePlayers.filter(
      (player) => player.belongsToWerewolfsTeam() && player.isWolf()
    );

    const isLastWerewolf =
      remainingWerewolves.length === 1 &&
      remainingWerewolves[0].getRole().getName() === "Lobisomem Solitário";

    if (remainingVillagers.length === 0 && isLastWerewolf) {
      this.news.setNews("O lobisomem solitário venceu!");
      winner = true;
    } else if (remainingVillagers.length === 0) {
      this.news.setNews("Os lobisomens venceram!");
      winner = true;
    } else if (remainingWerewolves.length === 0) {
      this.news.setNews("Os aldeões venceram!");
      winner = true;
    }
    return winner;
  }

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
}
