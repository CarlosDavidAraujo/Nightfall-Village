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
    this.players = []; //armazena os jogadores vivos
    this.deadPlayers = []; //jogadores que ja foram eliminados
    this.mostVotedPlayers = []; // lista temporaria de jogadores mais votados
    this.currentPlayerIndex = 0; //index do jogador atual
    this.currentTurn = 1;
    this.news = new News(); //gerenciador mensagens dos eventos do jogo
    this.roles = []; //armazena os papéis que foram selecionados
    this.roleMap = [
      //mapa de todos os papéis do jogo
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

  //retorna todos os jogadores vivos
  getPlayers() {
    return this.players;
  }

  //adiciona todos os jogadores ao array <players>, esses players são definidos na tela <DefinePlayers>
  setPlayers(players) {
    this.players = [];
    players.forEach((player, index) => {
      this.players.push(new Player(player, index));
    });
  }

  getDeadPlayers() {
    return this.deadPlayers;
  }

  getRevivedPlayers() {
    return this.revivedPlayers;
  }

  //limpa o array de <players>
  clearPlayers() {
    this.players = [];
  }

  //retorna o jogador atual da vez
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  //avança para o próximo jogador da lista
  setNextPlayer() {
    this.currentPlayerIndex++;
  }

  noNextPlayer() {
    //verifica se já passou a vez do último jogador da lista <players> voltando para o primeiro jogador
    let result = false;
    if (this.currentPlayerIndex > this.players.length - 1) {
      this.currentPlayerIndex = 0;
      result = true;
    }
    return result;
  }

  clearPlayersProtection() {
    //reseta o estado de proteção de todos os jogadores
    this.players.forEach((player) => {
      player.setProtected(false);
    });
  }

  clearPlayersVotes() {
    //reseta a quantidade de votos de todos os jogadores
    this.players.forEach((player) => {
      player.clearVotes();
    });
  }

  clearPlayersDeathMarks() {
    //reseta as marcas de morte de todos os jogadores
    this.players.forEach((player) => {
      player.setMarkedForDeath(false);
    });
  }

  //gerencia o fim do turno
  endTurn() {
    this.clearTurnNews();
    this.advanceTurn();
    this.players.forEach((player) => {
      player.setDoubleVote(false);
      player.setConfused(false);
    });
  }

  endNight() {
    this.setMostVotedPlayerByWerewolfs();
    this.removePlayers(); 
    this.revivePlayers(); 
    this.clearPlayersVotes();
    this.clearPlayersProtection(); 
    this.clearPlayersDeathMarks(); 
  }

  //remove jogadores da partida
  removePlayers() {
    this.players.forEach((player) => {
      if (player.isMarkedForDeath() && !player.isProtected()) {
        this.news.addNews(
          `${player.getName()} morreu esta noite. Deve ficar calado até o fim do jogo.`
        );
        player.reset();
        this.deadPlayers.push(player); 
      }
    });

    //atualiza a lista de <players> com os que ficaram vivos
    const alivePlayers = this.players.filter(player => !this.deadPlayers.includes(player));
    if (this.players.length === alivePlayers.length) {
      this.news.addNews("Noite de paz na vila."); 
    }
    this.players = alivePlayers; 
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
        const nextPlayerIndex = this.players.findIndex(
          (p) => p.getID() > originalIndex
        ); //procura o index do jogador com Id maior que o do jogador reivivido
        const insertionIndex =
          nextPlayerIndex !== -1 ? nextPlayerIndex : this.players.length; //insere antes do jogador mais proximo ou no final da lista se nao houver ninguem a frente
        this.players.splice(insertionIndex, 0, player);
        this.news.addNews(`${player.getName()} foi ressuscitado!`);
      }
    });
  }

  setMostVotedPlayers() {
    //define os jogadores mais votados pela vila
    let maxVotes = 0;
    this.players.forEach((player) => {
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
    const alivePlayers = this.players.filter(
      (player) => player.getName() !== mostVotedPlayer.getName()
    );
    this.players = alivePlayers;
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

    const remainingVillagers = this.players.filter((player) =>
      player.belongsToVillagersTeam()
    );
    const remainingWerewolves = this.players.filter(
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
    this.roles = [];
    selectedRoles.forEach((selectedRole) => {
      const { role, count } = selectedRole;
      for (let i = 0; i < count; i++) {
        this.roles.push(role);
      }
    });
    this.roles = _.shuffle(this.roles); // por fim, embaralha a lista <roles>
  }

  assignRoleToPlayer(selectedRoles) {
    this.setRoles(selectedRoles); //seta a lista <roles>
    this.players.forEach((player, i) => {
      //associa cada jogador a um papel
      const roleCopy = _.cloneDeep(this.roles[i]); //cria uma copia da instacia de role do array <roles> para garantir que cada jogador nao esteja manipulando a mesma instancia de role
      player.setRole(roleCopy); //associa o jogador a role
      roleCopy.setPlayer(player); //associa a role ao jogador
    });
  }
}
