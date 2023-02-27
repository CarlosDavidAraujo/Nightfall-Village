import Role from "./Role";
import werewolfImg from '../../assets/images/werewolf.png';
import firstSkillIcon from '../../assets/images/bite.png';
import secondtSkillIcon from '../../assets/images/transmute.png';
import loneWolfImg from '../../assets/images/loneWolf.png';

export class WereWolf extends Role {
  constructor() {
    super(
      "Lobisomem", //nome
      "Lobisomens", //time
      'Wolf',
      false,
      werewolfImg, //imagem
      'eliminar todos os aldões. Haja como se fosse um aldeão.', //objetivo
      {
        name: 'Devorar',
        description: 'Você e outros lobisomens votam em um jogador para elimina-lo do jogo. Em caso de empate, a vítima é aleatória.',
        target: true,
        icon: firstSkillIcon
      },
      {
        name: 'Transmutar',
        description: 'Os outros aldeões te verão como aldeão neste e no próximo turno. Bloqueia devorar enquanto transmutado.',
        target: false,
        icon: secondtSkillIcon
      }
    );
  }

  devorar(otherPlayer) { //os lobisomens votam durante a noite em quem vao eliminar
    otherPlayer.addVote();
  };

  transmutar(currentTurn) {
    this.setFakeName('Aldeão', 1); //muda de nome por 1 turno
    this.blockSkill(1, 1, currentTurn); //bloqueia devorar por 1 turno
  }
}

export class LonelyWerewolf extends WereWolf {
  constructor() {
    super();
    this.name = 'Lobisomem solitário';
    this.objective = 'eliminar todos os aldeões, mas você só vencerá se for o último lobisomem vivo.';
    this.roleImg = loneWolfImg;
  }

  isLastWolfStanding(werewolfPlayers) {
    const aliveWerewolfPlayers = werewolfPlayers.filter(p => p.isAlive() && p.getRole().getName() === 'Lobisomem');
    return aliveWerewolfPlayers.length === 1 && aliveWerewolfPlayers[0] === this.player;
  }
}
