import Role from "./Role";
import hunterImg from '../../assets/images/hunter.png';
import firstSkillIcon from '../../assets/images/target.png';

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
      false,
      'Capturar',
      'Impede um jogador de usar habilidades na próxima rodada.',
      firstSkillIcon
    );
  }

  atirar(otherPlayer, game) {
    if (!this.firstSkillLocked) {
      game.addPlayerToRemove(otherPlayer);
      this.firstSkillLocked = true;
    }
  }

  capturar(otherPlayer) {
    otherPlayer.setTurnsToBlock(1); //o jogador tera as habilidades bloqueadas no proximo turno
  }
}
