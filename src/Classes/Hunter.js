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

  atirar(otherPlayer, currentPlayer) {
      otherPlayer.setMarkedForDeath(true);
      currentPlayer.setPermaBlockedSkill(1); //bloqueia atirar ate o final do jogo
  }

  capturar(otherPlayer, currentPlayer) {
    otherPlayer.setBlockedSkill(3, 1); //o jogador tera as habilidades bloqueadas no proximo turno
    currentPlayer.setBlockedSkill(2 ,1);// o caçador fica um turno sem poder usar capturar novamente
  }
}
