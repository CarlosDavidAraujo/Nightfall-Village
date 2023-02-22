import _ from "lodash";
import Hunter from "./Hunter";
import News from "./News";
import Player from "./Player";
import Seer from "./Seer";
import Villager from "./Villager";
import Werewolf from "./Werewolf";

export default class Game {
  constructor() {
    this.players = []; //armazena os jogadores vivos
    this.currentPlayerIndex = 0; //index do jogador atual
    this.mostVotedPlayers = []; // guarda os jogadores mais votados
    this.deadPlayers = [] //jogadores que ja foram eliminados
    this.roles = []; //armazena os papéis que foram selecionados
    this.news = new News(); //gerenciador mensagens dos eventos do jogo
    this.roleMap = [ //mapa de todos os papéis do jogo
      new Villager(),
      new Seer(),
      new Werewolf(),
      new Hunter()
    ];
  }

  getRoleMap() {
    return this.roleMap;
  }

  getPlayers() {
    //retorna todos os jogadores vivos
    return this.players;
  }

  setPlayers(players) {

    this.players = [];
    //adiciona todos os jogadores ao array <players>, esses players são definidos na tela <DefinePlayers>
    players.forEach((player) => {
      this.players.push(new Player(player));
    });
  }

  clearPlayers() {
    //limpa o array de <players>
    this.players = [];
  }

  getCurrentPlayer() {
    //retorna o jogador atual da vez
    return this.players[this.currentPlayerIndex];
  }

  setNextPlayer() {
    //avança para o próximo jogador da lista
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

  decreaseTurnsToBlockPlayers() { //diminui a contagem de turnos que faltam para o cada jogador ter suas habilidades bloqueadas
    this.players.forEach(player => {
      const turnsToBlock = player.getTurnsToBlock();
      if (turnsToBlock === 0) { //se ja estiver zerado libera o jogador para usar habilidades
        player.setBlockedSkill(0, 1000);
      } else {                                // se nao diminui a contagem
        player.setTurnsToBlock(turnsToBlock - 1);
      }
    });
  }

  decreaseTurnsWithFakeName() { //diminui a contagem de turnos que faltam para o cada jogador perder um nome falso do seu papel
    this.players.forEach(player => {
      const turnsWithFakeName = player.getRole().getTurnsWithFakeName();
      if (turnsWithFakeName === 0) { //se estiver zerado volta seta o nome falso com o nome verdareiro
        const trueName = player.getRoleName();
        player.getRole().setFakeName(trueName);
      } else {                                // se nao diminui a contagem
        player.getRole().setTurnsWithFakeName(turnsWithFakeName - 1);
      }
    });
  }

  getDeadPlayers() {
    return this.deadPlayers;
  }

  //remove jogadores da partida
  removePlayers() {
    const alivePlayers = this.players.filter(player => !player.isMarkedForDeath() || player.isProtected());
    if (alivePlayers.length === this.players.length) { //se o tamanho se manteve o mesmo quer dizer que nao houveram mortes
      return this.news.setNews("Noite de paz na vila.");
    }

    this.players.forEach(player => {
      if (player.isMarkedForDeath() && player.isProtected()) { //se estava marcado para morrer, foi protegido adiciona noticia de que alguem foi salvo
        this.news.addNews('Preces protegeram morador(es).');
      }
      else if (player.isMarkedForDeath()) { //se estava marcado sem protecao, adiciona a noticia da eliminacao
        this.news.addNews(`${player.getName()} morreu esta noite. Deve ficar calado até o fim do jogo.`);
        this.deadPlayers.push(player); //adiciona a lista de jogadores mortos
      }
    });

    //atualiza a lista de <players> com os que ficaram vivos
    this.players = alivePlayers;
  }

  setMostVotedPlayers() {
    //define os jogadores mais votados pela vila
    let maxVotes = 0;
    this.players.forEach((player) => {
      if (player.getVotesCount() > maxVotes) { //se os votos forem maiores armazena apenas um jogador
        maxVotes = player.getVotesCount();
        this.mostVotedPlayers = [player];
      } else if (player.getVotesCount() === maxVotes && maxVotes > 0) { //quando empatar adiciona mais um jogador a lista de mais votados, 
        this.mostVotedPlayers.push(player);                             //execeto quando maxvotes for igual a zero, pois isso adicionaria todos os jogadores, 
      }                                                                 //mesmo que ninguem tivesse sido votado  
    });
  }

  //remove o jogador mais votado pela vila
  removeMostVotedPlayer() {
    this.setMostVotedPlayers(); //define o jogador mais votado
    if (this.mostVotedPlayers.length != 1) { //se houve empate ninguem morre
      return this.news.setNews("A aldeia ficou indecisa!");
    }

    //se não há empate atualiza a lista de jogadores vivos removendo o jogador mais votado
    const mostVotedPlayer = this.mostVotedPlayers[0];
    const alivePlayers = this.players.filter(player => player.getName() !== mostVotedPlayer.getName());
    this.players = alivePlayers;
    this.news.addNews(`${this.mostVotedPlayers[0].getName()} foi morto pela aldeia. Deve ficar calado até o fim do jogo.`);
    this.mostVotedPlayers = []; //ao final reseta a lista de mais votados
  }

  //remove o jogador mais votado pelos lobisomens
  setMostVotedPlayerByWerewolfs() {
    this.setMostVotedPlayers(); //define os mais votados
    if (this.mostVotedPlayers.length === 0) { //faz nada se ninguem foi morto por lobisomens
      return
    }
    this.resolveTieBreak(); //desempata a votacao, assim não morrerá mais de um jogador por turno devorado por lobisomens 
    const mostVotedPlayer = this.mostVotedPlayers[0];
    mostVotedPlayer.setMarkedForDeath(true);
    this.mostVotedPlayers = []; //ao final reseta a lista de mais votados
  }

  resolveTieBreak() {
    // verifica se a lista <mostVotedPlayers> tem mais de um jogador, ou seja,
    // se houve empate, e escolhe um jogador aleatoriamente a partir dos jogadores
    // com o mesmo número de votos. Importante! essa funçao so deve ser usada para desempatar o voto dos lobisomens durante a etapa em que usam a habilidade devorar
    if (this.mostVotedPlayers.length > 1) {
      const randomIndex = Math.floor(Math.random() * this.mostVotedPlayers.length);
      const mostVotedPlayer = this.mostVotedPlayers[randomIndex];
      this.mostVotedPlayers = [mostVotedPlayer];
    }
  }

  getNews() {
    //retorna todas as notícias disponíveis
    return this.news.getNews();
  }

  clearTurnNews() {
    //limpa todas as notícias
    this.news.clearNews();
  }

  getWinnerTeam() {
    //verifica se há um vencedor e seta a notícia de quem venceu o jogo
    let winner = null;

    const remainingVillagers = this.players.filter(
      (player) => player.getRole().getTeam() === "Aldeões"
    );
    const remainingWerewolves = this.players.filter(
      (player) => player.getRole().getTeam() === "Lobisomens"
    );

    if (remainingVillagers.length === 0) {
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
    // reinicia a lista de roles
    this.roles = [];

    // itera sobre cada objeto de papel único selecionado
    selectedRoles.forEach(selectedRole => {
      const { role, count } = selectedRole;
      // itera sobre a quantidade de cada papel único selecionado
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
      const roleCopy = _.cloneDeep(this.roles[i]);//cria uma copia da instacia de role do array <roles> para garantir que cada jogador nao esteja manipulando a mesma instancia de role
      player.setRole(roleCopy);
    });
  }
}
