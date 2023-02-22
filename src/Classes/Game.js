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
    this.playersToRemove = []; //jogadores marcados para remover (se estiverem protegidos, nao serâo)
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

  decreaseTurnsToBlockPlayers() { //diminui a contagem de turnos que faltam para o cada jogador ter suas habilidades bloqueadas
    this.players.forEach(player => {
      const turnsToBlock = player.getTurnsToBlock();
      if (turnsToBlock === 0) { //se ja estiver zerado volta a contagem para mil, liberando o jogador para usar habilidades
        player.setTurnsToBlock(1000);
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

  //adiciona jogadores a lista negra <playersToRemove>,
  //mas antes verifica se o jogador ja esta na lista, para evitar adicioná-lo mais de uma vez
  addPlayerToRemove(player) {
    if (!this.playersToRemove.includes(player)) {
      this.playersToRemove.push(player);
    }
  }

  noPlayerDied() {
    //verifica se nenhum jogador foi marcado para morrer
    return this.playersToRemove.length === 0;
  }

  //remove jogadores da partida
  removePlayers() {
    if (this.noPlayerDied()) {
      //se não há ninguém para ser removido, retorna a mensagem do evento
      return this.news.setNews("Noite de paz na vila.");
    }

    //atualiza a lista de <players> vivos com aqueles que não estão na lista <playersToRemove> ou que estão protegidos
    const updatedPlayers = this.players.filter(
      (player) => !this.playersToRemove.includes(player) || player.isProtected()
    );
    this.players = updatedPlayers;

    //adiciona as mensagens de eventos
    this.playersToRemove.forEach(player => {
      if (player.isProtected()) {
        //mensagem se alguém foi protegido
        this.news.addNews("Preces protegeram moradores.");
      } else {
        //mensagem dos que morreram
        this.news.addNews(`${player.getName()} morreu esta noite!`);
        this.deadPlayers.push(player); //adiciona os jogadoes eliminados a lista de deadPlayers
      }
    });

    //ao final de tudo limpa a lista <playersToRemove> para que não haja inconsistências
    //em verificações da função <noPlayerDied()> nas rodadas futuras
    this.playersToRemove = [];
  }

  mostVotedPlayer() {
    //retorna o jogador mais votado pela vila
    let maxVotes = 0;
    let mostVotedPlayers = [];

    this.players.forEach((player) => {
      if (player.getVotesCount() > maxVotes) {
        maxVotes = player.getVotesCount();
        mostVotedPlayers = [player];
      } else if (player.getVotesCount() === maxVotes) {
        mostVotedPlayers.push(player);
      }
    });

    //verifica se a lista <mostVotedPlayers> tem mais de um jogador, ou seja,
    //se houve empate, e retorna null, assim ninguém é eliminado em caso de empate na votação
    if (mostVotedPlayers.length > 1) {
      return null;
    }

    //se não houve empate retorna o jogador mais votado
    return mostVotedPlayers[0];
  }

  //funciona semelhante a função removePlayers, mas com algumas mudanças
  removeMostVotedPlayer() {
    const mostVotedPlayer = this.mostVotedPlayer(); //verifica o jogador mais votado

    if (!mostVotedPlayer) {
      //se não há, retorna a noticia de que a aldeia ficou indecisa na votação
      return this.news.setNews("A aldeia ficou indecisa!");
    }

    //se há, atualiza a lista de <players> e seta a noticia de quem foi escolhido
    const updatedPlayers = this.players.filter(
      (player) => player.getName() !== mostVotedPlayer.getName()
    );
    this.players = updatedPlayers;
    this.news.setNews(`${mostVotedPlayer.getName()} foi morto pela aldeia`);
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
