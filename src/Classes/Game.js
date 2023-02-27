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
    this.roleMap = [ //mapa de todos os papéis do jogo
      new Villager(),
      new Seer(),
      new WereWolf(),
      new Crusader(),
      new Doctor(),
      new Hunter(),
      new LonelyWerewolf(),
      new Scientist(),
      new Witch()
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

  getPlayers() {
    //retorna todos os jogadores vivos
    return this.players;
  }

  getDeadPlayers() {
    return this.deadPlayers;
  }

  getRevivedPlayers() {
    return this.revivedPlayers;
  }

  //retorna um jogador aleatório da lista de players vivos
  getRandomPlayer() {
    const randomIndex = Math.floor(Math.random() * this.players.length);
    console.log(this.players[randomIndex])
    return this.players[randomIndex];
  }

  setPlayers(players) {
    this.players = [];
    //adiciona todos os jogadores ao array <players>, esses players são definidos na tela <DefinePlayers>
    players.forEach((player, index) => {
      this.players.push(new Player(player, index));
    });
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

  //gerencia a duracaod e bloqueio dos votos
  manageBlockedVotes(player) {
    if (player.isVoteBlocked()) {
      player.decreaseBlockedVoteDuration();
    }
  }

  //gerencia votos duplos
  manageBuffedVotes(player) {
    player.setBuffedVote(false);
  }

  //gerencia a duraçao dos nome falsos
  manageFakeNames(player) {
    const role = player.getRole();
    if (role.hasFakeName()) {
      role.decreaseFakeNameDuration();
    }
  }

  //gerencia o fim do turno
  endTurn() {
    this.clearTurnNews();
    this.advanceTurn();
    this.players.forEach(player => {
      this.manageBlockedVotes(player);
      this.manageBuffedVotes(player);
      this.manageFakeNames(player);
    });
  }

  endNight() {
    this.setMostVotedPlayerByWerewolfs(); //decide a vitima dos lobisomens
    this.removePlayers(); //remove a vitima
    this.revivePlayers(); //revive jogadores
    this.clearPlayersVotes(); //limpa os votos
    this.clearPlayersProtection(); //limpa as proteçoes
    this.clearPlayersDeathMarks(); //limpa as marcas de morte
  }

  //remove jogadores da partida
  removePlayers() {
    //verificacoes para remover o jogadores
    this.players.forEach(player => {
      if (player.isMarkedForDeath() && player.isProtected()) { //se estava marcado para morrer mas foi protegido adiciona noticia de que alguem foi salvo
        const protector = player.getProtector(); //se foi protegido por um cruzado
        if (protector) {
          this.deadPlayers.push(protector); //sacrifica o cruzado
          this.news.addNews(`${protector.getName()} morreu esta noite. Deve ficar calado até o fim do jogo.`);
        }
      }
      else if (player.isMarkedForDeath()) { //se estava marcado sem protecao, adiciona a noticia da eliminacao
        this.news.addNews(`${player.getName()} morreu esta noite. Deve ficar calado até o fim do jogo.`);
        player.reset() //reseta os estados do jogador antes de adiciona-lo a lista de mortos
        this.deadPlayers.push(player); //adiciona o jogador morto a lista de jogadores mortos
      }
    });

    //atualiza a lista de <players> com os que ficaram vivos
    const alivePlayers = this.players.filter(player => !this.deadPlayers.includes(player));
    if (this.players.length === alivePlayers.length) { //verifica se a lista players atual tem o mesmo tamnho de alive players, isso significa que ninguem morreu
      this.news.addNews('Noite de paz na vila.'); //entao atribui a noiticia de paz
    }
    this.players = alivePlayers; //finalmente atualiza a lista de players
  }

  //revive os jogadores marcados para reviver
  revivePlayers() {
    this.deadPlayers.forEach(player => {
      if (player.isMarkedForRess()) {
        const updatedDeadPlayers = this.deadPlayers.filter(p => p.getID() !== player.getID());
        this.deadPlayers = updatedDeadPlayers;
        const originalIndex = player.getID(); //obtem seu index original na lista de players
        const nextPlayerIndex = this.players.findIndex(p => p.getID() > originalIndex); //procura o index do jogador com Id maior que o do jogador reivivido
        const insertionIndex = nextPlayerIndex !== -1 ? nextPlayerIndex : this.players.length; //insere antes do jogador mais proximo ou no final da lista se nao houver ninguem a frente
        this.players.splice(insertionIndex, 0, player);
        this.news.addNews(`${player.getName()} foi ressuscitado!`);
      }
    });
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
    this.deadPlayers.push(mostVotedPlayer);
    this.news.addNews(`${mostVotedPlayer.getName()} foi morto pela aldeia. Deve ficar calado até o fim do jogo.`);
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
    return this.news;
  }

  getTurnNews() {
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

    const remainingVillagers = this.players.filter(player => player.belongsToVillagersTeam());
    const remainingWerewolves = this.players.filter(player => player.belongsToWerewolfsTeam());

    const isLastWerewolf = remainingWerewolves.length === 1 && remainingWerewolves[0].getRole().getName() === "Lobisomem solitário";

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
      player.setRole(roleCopy);//associa o jogador a role
      roleCopy.setPlayer(player); //associa a role ao jogador
    });
  }
}
