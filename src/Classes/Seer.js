import Role from "./Role";
import seerImg from '../../assets/images/seer.png';
import firstSkillIcon from '../../assets/images/seerEye.png';

export default class Seer extends Role {
  constructor() {
    super(
      "Vidente",
      "Aldeões",
      seerImg,
      'descobrir quem são os lobisomens e ajudar os aldeões a vencerem o jogo',
      'Revelar',
      'Você pode ver a função de outro jogador.',
      firstSkillIcon,
      false,
      'Vislumbrar',
      'Você pode ver a função de alguém que ja morreu.',
      firstSkillIcon
    );
  }

  revelar(otherPlayer) {
    return `A verdade foi revelada! O papel de ${otherPlayer.getName()} é ${otherPlayer.getRole().getFakeName()}. Fique atento à sua jogada!`;
  }

  vislumbrar(otherPlayer) {
    return `A verdade foi revelada! O papel de ${otherPlayer.getName()} era ${otherPlayer.getRoleName()}.`;
  }

}
