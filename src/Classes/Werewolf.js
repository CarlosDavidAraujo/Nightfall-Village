import Role from "./Role";
import werewolfImg from '../../assets/images/werewolf.png';
import firstSkillIcon from '../../assets/images/bite.png';

export default class WereWolf extends Role {
  constructor() {
    super(
      "Lobisomem", //nome
      "Lobisomens", //time
      werewolfImg, //imagem
      'eliminar todos os habitantes da vila', //objetivo
      'Devorar', //nome hab 1
      'Devore um jogador. Ele é eliminado do jogo.', //descricao hab 1
      firstSkillIcon, //icone hab 1
      false, //usou a primeira skill
      'Transmutar', //nome hab 2
      'Assuma forma humana. Os outros jogadores te verão como aldeão neste turno e no seguinte.', //descricao hab 2
      firstSkillIcon //icone hab 2
      );
  }

  devorar(otherPlayer, game) {
    game.addPlayerToRemove(otherPlayer);
  }

  transmutar() {
    this.fakeName = 'Aldeão';
    this.turnsWithFakeName = 1;
  }
}
