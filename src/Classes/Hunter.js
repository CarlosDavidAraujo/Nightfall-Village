import Role from "./Role";
import hunterImg from '../../assets/images/hunter.png';
import firstSkillIcon from '../../assets/images/target.png';
import secondSkillIcon from '../../assets/images/trap.png';

export default class Hunter extends Role {
  constructor() {
    super(
      "Caçador",
      "Aldeões",
      'Human',
      false,
      hunterImg,
      'eliminar os lobisomens e ajudar os aldeões a vencerem o jogo.',
      {
        name: 'Atirar',
        description: 'Uma vez por jogo você escolhe um jogador. Ele é eliminado.',
        target: true,
        icon: firstSkillIcon
      },
      {
        name: 'Capturar',
        description: 'Impede um jogador de usar habilidades na próxima rodada. Recarrega após um turno.',
        target: true,
        icon: secondSkillIcon
      }
    );
  }

  atirar(otherPlayer, currentTurn) {
    otherPlayer.setMarkedForDeath(true);
    this.blockSkill(1, 1000, currentTurn); //bloqueia atirar ate o final do jogo
  }

  capturar(otherPlayer, currentTurn) {
    const otherPlayerRole = otherPlayer.getRole();
    otherPlayerRole.blockSkill(1, 1, currentTurn); //bloqueia as duas habilidades do alvo por 1 turno
    otherPlayerRole.blockSkill(2, 1, currentTurn); //bloqueia a propria habilidade por 1 turno
    this.blockSkill(2, 1, currentTurn);
  }
}
