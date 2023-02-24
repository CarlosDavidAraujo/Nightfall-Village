import Role from "./Role";
import hunterImg from '../../assets/images/hunter.png';
import firstSkillIcon from '../../assets/images/target.png';
import secondSkillIcon from '../../assets/images/trap.png';

export default class Hunter extends Role {
  constructor() {
    super(
      "Caçador",
      "Aldeões",
      hunterImg,
      'eliminar os lobisomens e ajudar os aldões a vencerem o jogo',
      'Atirar',
      'Uma vez por jogo você escolhe um jogador. Ele é eliminado.',
      firstSkillIcon,
      'Capturar',
      'Impede um jogador de usar habilidades na próxima rodada. Recarrega após um turno.',
      secondSkillIcon
    );
  }

  atirar(otherPlayer) {
      otherPlayer.setMarkedForDeath(true);
      this.player.blockSkill(1, 1000); //bloqueia atirar ate o final do jogo
  }

  capturar(otherPlayer) {
    otherPlayer.blockSkill(1, 1);
    otherPlayer.blockSkill(2, 1); //bloqueia as duas habilidades do alvo por 1 turno
    this.player.blockSkill(2, 1); //bloqueia a propria habilidade por 1 turno
  }
}
