import _ from "lodash";
import Crusader from "./Crusader";
import Doctor from "./Doctor";
import Hunter from "./Hunter";
import News from "./News";
import Player from "./Player";
import Scientist from "./Scientist";
import Seer from "./Seer";
import Villager from "./Villager";
import { LonelyWerewolf, WereWolf } from "./Werewolf";
import Witch from "./Witch";

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
      new Villager(),
      new Seer(),
      new WereWolf(),
      new Crusader(),
      new Doctor(),
      new Hunter(),
      new LonelyWerewolf(),
      new Scientist(),
      new Witch(),
    ];
  }

  getCurrentTurn() {
    return this.currentTurn;
  }

  advanceTurn() {
    this.currentTurn++;
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
    this.alivePlayers.forEach(player => {
      player.resetAllStates();
    });
  }

  endTurn() {
    this.clearTurnNews();
    this.alivePlayers.forEach((player) => {
      player.resetAllStates();
    });
    this.advanceTurn();
  }

  endNight() {
    this.setMostVotedPlayerByWerewolfs();
    this.removePlayers();
    this.revivePlayers();
    this.resetAllPlayersStates();
  }



  removePlayers() {
    this.alivePlayers.forEach((player) => {
      if (player.isMarkedForDeath() && !player.isProtected()) {
        this.news.addNews(
          `${player.getName()} morreu esta noite. Deve ficar calado até o fim do jogo.`
        );
        player.resetStates();
        this.deadPlayers.push(player);
      }
      if(player.hasProtector() && player.isMarkedForDeath()) {
        const protector = player.getProtector();
        this.news.addNews(
          `${protector.getName()} morreu esta noite. Deve ficar calado até o fim do jogo.`
        );
        protector.resetStates();
        this.deadPlayers.push(protector);
      }
    });

    //atualiza a lista de <players> com os que ficaram vivos
    const alivePlayers = this.alivePlayers.filter(player => !this.deadPlayers.includes(player));
    if (this.alivePlayers.length === alivePlayers.length) {
      this.news.addNews("Noite de paz na vila.");
    }
    this.alivePlayers = alivePlayers;
  }

  //revive os jogadores marcados para reviver
  revivePlayers() {
    this.deadPlayers.forEach((player) => {
      if (player.isMarkedForRess()) {
        const updatedDeadPlayers = this.deadPlayers.filter(
          (p) => p.getID() !== player.getID()
        );
        this.deadPlayers = updatedDeadPlayers;
        const originalIndex = player.getID(); //obtem seu index original na lista de players
        const nextPlayerIndex = this.alivePlayers.findIndex(
          (p) => p.getID() > originalIndex
        ); //procura o index do jogador com Id maior que o do jogador reivivido
        const insertionIndex =
          nextPlayerIndex !== -1 ? nextPlayerIndex : this.alivePlayers.length; //insere antes do jogador mais proximo ou no final da lista se nao houver ninguem a frente
        this.alivePlayers.splice(insertionIndex, 0, player);
        this.news.addNews(`${player.getName()} foi ressuscitado!`);
      }
    });
  }

  setMostVotedPlayers() {
    //define os jogadores mais votados pela vila
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

  //remove o jogador mais votado pela vila
  removeMostVotedPlayer() {
    this.setMostVotedPlayers(); //define o jogador mais votado
    if (this.mostVotedPlayers.length != 1) {   //se houve empate ninguem morre
      return this.news.setNews("A aldeia ficou indecisa!");
    }

    //se não há empate atualiza a lista de jogadores vivos removendo o jogador mais votado
    const mostVotedPlayer = this.mostVotedPlayers[0];
    const alivePlayers = this.alivePlayers.filter(
      (player) => player.getName() !== mostVotedPlayer.getName()
    );
    this.alivePlayers = alivePlayers;
    this.deadPlayers.push(mostVotedPlayer);
    this.news.addNews(
      `${mostVotedPlayer.getName()} foi morto pela aldeia. Deve ficar calado até o fim do jogo.`
    );
    this.mostVotedPlayers = []; //ao final reseta a lista de mais votados
  }

  //remove o jogador mais votado pelos lobisomens
  setMostVotedPlayerByWerewolfs() {
    this.setMostVotedPlayers(); //define os mais votados
    if (this.mostVotedPlayers.length === 0) {
      //faz nada se ninguem foi morto por lobisomens
      return;
    }
    this.resolveTieBreak(); //desempata a votacao, assim não morrerá mais de um jogador por turno devorado por lobisomens
    const mostVotedPlayer = this.mostVotedPlayers[0];
    mostVotedPlayer.setMarkedForDeath(true);
    this.mostVotedPlayers = []; //ao final reseta a lista de mais votados
  }

  //desempata a votaçao dos lobisomens durante a noite
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

  //adiciona os papéis selecionados à lista de <roles> com suas respectivas quantidades
  //esta é uma função auxiliar da função logo abaixo
  setRoles(selectedRoles) {
    this.currentRoles = [];
    selectedRoles.forEach((selectedRole) => {
      const { role, count } = selectedRole;
      for (let i = 0; i < count; i++) {
        this.currentRoles.push(role);
      }
    });
    this.currentRoles = _.shuffle(this.currentRoles); // por fim, embaralha a lista <roles>
  }

  assignRoleToPlayer(selectedRoles) {
    this.setRoles(selectedRoles); //seta a lista <roles>
    this.alivePlayers.forEach((player, i) => {
      //associa cada jogador a um papel
      const roleCopy = _.cloneDeep(this.currentRoles[i]); //cria uma copia da instacia de role do array <roles> para garantir que cada jogador nao esteja manipulando a mesma instancia de role
      roleCopy.setCurrentGame(this);
      player.setRole(roleCopy); //associa o jogador a role
      roleCopy.setPlayer(player); //associa a role ao jogador
    });
  }
}
