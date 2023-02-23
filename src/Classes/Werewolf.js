import Role from "./Role";
import werewolfImg from '../../assets/images/werewolf.png';
import firstSkillIcon from '../../assets/images/bite.png';
import secondtSkillIcon from '../../assets/images/transmute.png';

export default class WereWolf extends Role {
  constructor() {
    super(
      "Lobisomem", //nome
      "Lobisomens", //time
      werewolfImg, //imagem
      'eliminar todos os habitantes da vila', //objetivo
      'Devorar', //nome hab 1
      'Você e outros lobisomens votam em um jogador para elimina-lo do jogo. Em caso de empate, a vítima é aleatória.', //descricao hab 1
      firstSkillIcon, //icone hab 1
      'Transmutar', //nome hab 2
      'Os outros te verão como aldeão neste e no próximo turno. Bloqueia devorar enquanto transmutado.', //descricao hab 2
      secondtSkillIcon //icone hab 2
    );
  }

  devorar(otherPlayer) { //os lobisomens votam durante a noite em quem vao eliminar
    otherPlayer.addVote();
  };

  transmutar(currentPlayer) {
    this.fakeName = 'Aldeão';
    this.turnsWithFakeName = 1;
    currentPlayer.setBlockedSkill(1, 1); //bloqueia devorar por 1 turno
  }
}
